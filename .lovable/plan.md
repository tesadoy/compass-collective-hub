# Static GitHub Pages build — proposed file changes

Nothing backend is deleted. All Supabase files, migrations, auth, admin and portal pages stay exactly where they are and keep working; they are simply loaded only on `/auth`, `/portal` and `/admin`.

## Files to modify

**src/App.tsx**
- Move `AuthProvider` so it wraps only `/auth`, `/portal`, `/admin` (public routes render without touching auth).
- Lazy-load (`React.lazy` + `Suspense`) `Auth`, portal and admin pages so the Supabase client is never bundled into the public first load.
- Add `basename={import.meta.env.BASE_URL}` to `BrowserRouter` for GitHub Pages subpath hosting.

**src/pages/Careers.tsx**
- Remove the Supabase import and the `jobs` fetch; replace with a local empty `jobs` array (typed the same way).
- Keep the hero, values, benefits, division filter UI and CTAs unchanged; the existing "No current openings" state renders.
- Admin job management (`AdminJobs.tsx`) and the `jobs` table stay untouched.

**src/pages/Contact.tsx**
- Remove the Supabase insert; submit the same fields (name, email, company, phone, division, message) to `https://api.web3forms.com/submit` with the Web3Forms access key, `subject` and a reply-to email.
- Keep all Zod validation, styling, loading state, toasts and reset behaviour identical.
- No SMTP or password anywhere; only the public Web3Forms access key.
- `AdminContacts.tsx` and the `contact_submissions` table stay untouched.

**vite.config.ts**
- Add `base: process.env.VITE_BASE_PATH ?? "/"` so a repo-subpath build works (`VITE_BASE_PATH=/repo-name/ npm run build`) while the Lovable preview stays at `/`.

**index.html**
- No structural change; only the canonical/og:url note if you later give a GitHub Pages URL (I'll leave as-is unless you want it changed now).

## Files to add

**public/404.html**
- SPA redirect shim so deep links like `/about` work on GitHub Pages (GitHub serves 404.html for unknown paths).

**index.html** (small inline script)
- Companion snippet that restores the original path from the 404 redirect before React Router mounts.

**public/.nojekyll**
- Prevents GitHub Pages from stripping Vite's `_`-prefixed asset files.

**.github/workflows/deploy.yml** (optional — say if you want it)
- Build and publish `dist` to GitHub Pages on push to main.

## What I need from you
1. The Web3Forms access key.
2. The GitHub repo name (for the base path), or confirm it will be served at a root domain.

## Not touched
`supabase/`, `src/integrations/supabase/`, `src/hooks/useAuth.tsx`, `Auth.tsx`, all admin/portal pages and layouts, database schema, types, dependencies.
