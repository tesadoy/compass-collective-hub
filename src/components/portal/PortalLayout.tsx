import { NavLink, Navigate, Outlet, Link } from "react-router-dom";
import { LayoutDashboard, FileText, MessageSquare, Megaphone, ShieldCheck, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const items = [
  { to: "/portal", label: "Projects", icon: LayoutDashboard, end: true },
  { to: "/portal/documents", label: "Documents", icon: FileText },
  { to: "/portal/requests", label: "Service requests", icon: MessageSquare },
  { to: "/portal/messages", label: "Messages", icon: Megaphone },
];

const PortalLayout = () => {
  const { session, loading, signOut, isAdmin, user } = useAuth();
  if (loading) return <div className="container-tight py-20 text-muted-foreground">Loading…</div>;
  if (!session) return <Navigate to="/auth" replace />;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background">
        <div className="container-tight flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-md bg-gradient-accent text-primary-foreground font-display font-bold">T</span>
            <span className="font-display text-base font-semibold">TESADOY <span className="text-muted-foreground">Portal</span></span>
          </Link>
          <div className="flex items-center gap-2">
            {isAdmin && (
              <Button asChild variant="outline" size="sm">
                <Link to="/admin"><ShieldCheck className="h-4 w-4" />Admin</Link>
              </Button>
            )}
            <span className="hidden sm:inline text-xs text-muted-foreground">{user?.email}</span>
            <Button variant="ghost" size="sm" onClick={signOut}><LogOut className="h-4 w-4" />Sign out</Button>
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

export default PortalLayout;
