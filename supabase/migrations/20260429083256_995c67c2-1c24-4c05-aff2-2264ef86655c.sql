-- Roles enum + table
create type public.app_role as enum ('admin', 'client');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create policy "Users view own roles" on public.user_roles
  for select to authenticated using (user_id = auth.uid() or public.has_role(auth.uid(), 'admin'));
create policy "Admins manage roles" on public.user_roles
  for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- Auto-assign 'client' role on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.user_roles (user_id, role) values (new.id, 'client') on conflict do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- updated_at helper
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

-- Projects
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  division text not null,
  status text not null default 'planning',
  progress int not null default 0,
  client_id uuid references auth.users(id) on delete set null,
  start_date date,
  end_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.projects enable row level security;
create trigger projects_updated before update on public.projects for each row execute function public.set_updated_at();

create policy "Clients view own projects" on public.projects for select to authenticated
  using (client_id = auth.uid() or public.has_role(auth.uid(), 'admin'));
create policy "Admins manage projects" on public.projects for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- Service requests
create table public.service_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  subject text not null,
  message text not null,
  division text not null,
  priority text not null default 'normal',
  status text not null default 'open',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.service_requests enable row level security;
create trigger sr_updated before update on public.service_requests for each row execute function public.set_updated_at();

create policy "Users view own requests" on public.service_requests for select to authenticated
  using (user_id = auth.uid() or public.has_role(auth.uid(), 'admin'));
create policy "Users create own requests" on public.service_requests for insert to authenticated
  with check (user_id = auth.uid());
create policy "Admins update requests" on public.service_requests for update to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- Documents
create table public.documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  file_path text not null,
  doc_type text not null default 'general',
  project_id uuid references public.projects(id) on delete set null,
  client_id uuid references auth.users(id) on delete cascade,
  uploaded_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);
alter table public.documents enable row level security;
create policy "Clients view own documents" on public.documents for select to authenticated
  using (client_id = auth.uid() or public.has_role(auth.uid(), 'admin'));
create policy "Admins manage documents" on public.documents for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- Messages / announcements
create table public.messages (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  audience text not null default 'broadcast', -- broadcast | client
  client_id uuid references auth.users(id) on delete cascade,
  sent_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);
alter table public.messages enable row level security;
create policy "Clients view their messages" on public.messages for select to authenticated
  using (audience = 'broadcast' or client_id = auth.uid() or public.has_role(auth.uid(), 'admin'));
create policy "Admins manage messages" on public.messages for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- Contact submissions
create table public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  division text,
  message text not null,
  status text not null default 'new',
  created_at timestamptz not null default now()
);
alter table public.contact_submissions enable row level security;
create policy "Anyone can submit" on public.contact_submissions for insert to anon, authenticated with check (true);
create policy "Admins read submissions" on public.contact_submissions for select to authenticated
  using (public.has_role(auth.uid(), 'admin'));
create policy "Admins update submissions" on public.contact_submissions for update to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- Storage bucket (private)
insert into storage.buckets (id, name, public) values ('client-documents', 'client-documents', false);

create policy "Clients read own files" on storage.objects for select to authenticated
  using (bucket_id = 'client-documents' and (auth.uid()::text = (storage.foldername(name))[1] or public.has_role(auth.uid(), 'admin')));
create policy "Admins upload files" on storage.objects for insert to authenticated
  with check (bucket_id = 'client-documents' and public.has_role(auth.uid(), 'admin'));
create policy "Admins update files" on storage.objects for update to authenticated
  using (bucket_id = 'client-documents' and public.has_role(auth.uid(), 'admin'));
create policy "Admins delete files" on storage.objects for delete to authenticated
  using (bucket_id = 'client-documents' and public.has_role(auth.uid(), 'admin'));