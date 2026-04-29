import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface Project {
  id: string;
  title: string;
  description: string | null;
  division: string;
  status: string;
  progress: number;
  start_date: string | null;
  end_date: string | null;
}

const statusVariant: Record<string, string> = {
  planning: "bg-muted text-foreground",
  active: "bg-primary/10 text-primary",
  completed: "bg-emerald-500/10 text-emerald-700",
  on_hold: "bg-amber-500/10 text-amber-700",
};

const PortalProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setProjects(data ?? []);
        setLoading(false);
      });
  }, []);

  return (
    <section>
      <h1 className="font-display text-2xl font-semibold">My projects</h1>
      <p className="mt-1 text-sm text-muted-foreground">Track status and progress of your engagements with TESADOY DYNAMICS.</p>

      {loading ? (
        <p className="mt-8 text-sm text-muted-foreground">Loading projects…</p>
      ) : projects.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-border p-10 text-center">
          <p className="text-sm text-muted-foreground">No projects assigned yet. Your account manager will publish projects here.</p>
        </div>
      ) : (
        <div className="mt-6 grid gap-4">
          {projects.map((p) => (
            <article key={p.id} className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{p.division}</p>
                  <h2 className="mt-1 font-display text-lg font-semibold">{p.title}</h2>
                </div>
                <Badge className={statusVariant[p.status] ?? "bg-muted"}>{p.status}</Badge>
              </div>
              {p.description && <p className="mt-3 text-sm text-muted-foreground">{p.description}</p>}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-muted-foreground"><span>Progress</span><span>{p.progress}%</span></div>
                <Progress value={p.progress} className="mt-1.5 h-2" />
              </div>
              {(p.start_date || p.end_date) && (
                <p className="mt-3 text-xs text-muted-foreground">
                  {p.start_date && <>Start: {p.start_date}</>}{p.start_date && p.end_date && " · "}{p.end_date && <>Target: {p.end_date}</>}
                </p>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default PortalProjects;
