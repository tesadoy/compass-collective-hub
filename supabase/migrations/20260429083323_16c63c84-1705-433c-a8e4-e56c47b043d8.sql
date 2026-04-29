-- Recreate handle_new_user with explicit search_path (already had, but ensure)
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public, auth as $$
begin
  insert into public.user_roles (user_id, role) values (new.id, 'client') on conflict do nothing;
  return new;
end;
$$;

create or replace function public.set_updated_at()
returns trigger language plpgsql set search_path = public as $$
begin new.updated_at = now(); return new; end;
$$;

-- Restrict execution of SECURITY DEFINER helper to only what's needed via RLS
revoke execute on function public.has_role(uuid, public.app_role) from public, anon;
grant execute on function public.has_role(uuid, public.app_role) to authenticated;

revoke execute on function public.handle_new_user() from public, anon, authenticated;

-- Tighten anonymous contact submissions: must have content
drop policy "Anyone can submit" on public.contact_submissions;
create policy "Anyone can submit valid" on public.contact_submissions for insert to anon, authenticated
  with check (length(name) between 1 and 200 and length(email) between 3 and 255 and length(message) between 1 and 5000);