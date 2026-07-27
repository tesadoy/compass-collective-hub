import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Sub {
  id: string; name: string; email: string; company: string | null; phone: string | null;
  division: string | null; message: string; status: string; created_at: string;
}

const AdminContacts = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<Sub[]>([]);
  const load = () => supabase.from("contact_submissions").select("*").order("created_at", { ascending: false }).then(({ data }) => setItems(data ?? []));
  useEffect(() => { load(); }, []);

  const setStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("contact_submissions").update({ status }).eq("id", id);
    if (error) return toast({ title: "Failed", description: error.message, variant: "destructive" });
    load();
  };

  return (
    <section>
      <h1 className="font-display text-2xl font-semibold">Contact leads</h1>
      <p className="mt-1 text-sm text-muted-foreground">Submissions from the public contact form.</p>

      <div className="mt-6 space-y-3">
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">No submissions yet.</p>
        ) : items.map((s) => (
          <article key={s.id} className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h3 className="font-display font-semibold">{s.name} <span className="font-normal text-muted-foreground">· {s.email}</span></h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {s.company && <>{s.company} · </>}{s.division && <>{s.division} · </>}{new Date(s.created_at).toLocaleString()}
                </p>
              </div>
              <Badge variant={s.status === "new" ? "default" : "secondary"}>{s.status}</Badge>
            </div>
            <p className="mt-3 text-sm text-muted-foreground whitespace-pre-wrap">{s.message}</p>
            <div className="mt-3 flex gap-2">
              <Button asChild variant="outline" size="sm"><a href={`mailto:${s.email}`}>Reply by email</a></Button>
              {s.status !== "contacted" && <Button size="sm" variant="secondary" onClick={() => setStatus(s.id, "contacted")}>Mark contacted</Button>}
              {s.status !== "closed" && <Button size="sm" variant="ghost" onClick={() => setStatus(s.id, "closed")}>Close</Button>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default AdminContacts;
