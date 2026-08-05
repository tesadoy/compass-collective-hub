# Plan: Add a manageable job-postings system

## Goal
Make the Careers page display current open roles that can be added, edited and removed from the admin panel without touching code. Until roles are published, the page will show a friendly "no current openings" state.

## What we will build

1. Database table `public.jobs` for job postings
   - `id`, `title`, `department`, `location`, `type` (full-time / contract / internship), `description`, `requirements` (text array), `status` (`open` / `closed`), `created_at`, `updated_at`
   - GRANTs for `authenticated` and `service_role`, RLS enabled
   - Policies: admins can manage all rows; public/anonymous users can only read `open` rows

2. Admin page `AdminJobs` under `/admin/jobs`
   - List all jobs with status filter
   - Add new job with form
   - Edit job details
   - Toggle status between open/closed
   - Delete job

3. Careers page update
   - Fetch `open` jobs from Supabase on load
   - Show existing role cards when jobs exist
   - Show empty-state message when no jobs are open
   - Keep the static benefits and culture sections

## Technical notes
- Reuses existing `has_role` security-definer function and `app_role` enum.
- Follows the same RLS/grant pattern already used for `projects`, `messages`, etc.
- Add route `/admin/jobs` in `App.tsx` inside the admin layout.

## Outcome
The team can publish and unpublish roles from the admin panel. The public Careers page always reflects the current open roles automatically.
