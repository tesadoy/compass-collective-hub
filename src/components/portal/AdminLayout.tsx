import { NavLink, Navigate, Outlet, Link } from "react-router-dom";
import { Users, Briefcase, Inbox, Megaphone, ArrowLeft, LogOut, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const items = [
  { to: "/admin", label: "Users & roles", icon: Users, end: true },
  { to: "/admin/projects", label: "Projects", icon: Briefcase },
  { to: "/admin/jobs", label: "Jobs", icon: UserPlus },
  { to: "/admin/contacts", label: "Contact leads", icon: Inbox },
  { to: "/admin/messages", label: "Announcements", icon: Megaphone },
];

const AdminLayout = () => {
  const { session, loading, isAdmin, signOut, user } = useAuth();
  if (loading) return <div className="container-tight py-20 text-muted-foreground">Loading…</div>;
  if (!session) return <Navigate to="/auth" replace />;
  if (!isAdmin) return <Navigate to="/portal" replace />;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-primary text-primary-foreground">
        <div className="container-tight flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-md bg-white/10 font-display font-bold">T</span>
            <span className="font-display text-base font-semibold">TESADOY <span className="opacity-70">Admin</span></span>
          </Link>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm" className="text-primary-foreground hover:bg-white/10 hover:text-primary-foreground">
              <Link to="/portal"><ArrowLeft className="h-4 w-4" />Portal</Link>
            </Button>
            <span className="hidden sm:inline text-xs opacity-70">{user?.email}</span>
            <Button variant="ghost" size="sm" onClick={signOut} className="text-primary-foreground hover:bg-white/10 hover:text-primary-foreground">
              <LogOut className="h-4 w-4" />Sign out
            </Button>
          </div>
        </div>
      </header>

      <div className="container-tight grid gap-8 py-8 lg:grid-cols-[220px_1fr]">
        <aside>
          <nav className="flex lg:flex-col gap-1 overflow-x-auto">
            {items.map((it) => (
              <NavLink
                key={it.to}
                to={it.to}
                end={it.end}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium whitespace-nowrap",
                    isActive ? "bg-muted text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted",
                  )
                }
              >
                <it.icon className="h-4 w-4" />
                {it.label}
              </NavLink>
            ))}
          </nav>
        </aside>
        <main className="min-w-0"><Outlet /></main>
      </div>
    </div>
  );
};

export default AdminLayout;
