import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface Project {
  id: string; title: string; description: string | null; division: string;
  status: string; progress: number; client_id: string | null;
}

const divisions = ["Procurement","Construction","Interior","Logistics","Private Equity","Agriculture","Consulting"];
const statuses = ["planning","active","on_hold","completed"];

const AdminProjects = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<Project[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", division: "Construction", status: "planning", progress: 0, client_id: "" });

  const load = () => supabase.from("projects").select("*").order("created_at", { ascending: false }).then(({ data }) => setItems(data ?? []));
  useEffect(() => { load(); }, []);

  const create = async () => {
    if (!form.title.trim()) return toast({ title: "Title required", variant: "destructive" });
    const payload = { ...form, client_id: form.client_id.trim() || null };
    const { error } = await supabase.from("projects").insert(payload);
    if (error) return toast({ title: "Failed", description: error.message, variant: "destructive" });
    toast({ title: "Project created" });
    setOpen(false);
    setForm({ title: "", description: "", division: "Construction", status: "planning", progress: 0, client_id: "" });
    load();
  };

  const remove = async (id: string) => {
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) return toast({ title: "Failed", description: error.message, variant: "destructive" });
    load();
  };

  return (
    <section>
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold">Projects</h1>
          <p className="mt-1 text-sm text-muted-foreground">Create projects and assign them to clients by user ID.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button><Plus className="h-4 w-4" />New project</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New project</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2"><Label>Title</Label><Input value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} /></div>
              <div className="space-y-2"><Label>Description</Label><Textarea rows={3} value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Division</Label>
                  <Select value={form.division} onValueChange={(v) => setForm({...form, division: v})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{divisions.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={form.status} onValueChange={(v) => setForm({...form, status: v})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{statuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Progress (%)</Label>
                <Input type="number" min={0} max={100} value={form.progress} onChange={(e) => setForm({...form, progress: Number(e.target.value)})} />
              </div>
              <div className="space-y-2">
                <Label>Assign to client (user ID, optional)</Label>
                <Input placeholder="UUID from Users tab" value={form.client_id} onChange={(e) => setForm({...form, client_id: e.target.value})} />
              </div>
              <Button onClick={create} className="w-full">Create</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mt-6 grid gap-3">
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">No projects yet.</p>
        ) : items.map((p) => (
          <div key={p.id} className="rounded-xl border border-border bg-card p-5 flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-display font-semibold">{p.title}</h3>
                <Badge variant="secondary">{p.division}</Badge>
                <Badge>{p.status}</Badge>
                <span className="text-xs text-muted-foreground">{p.progress}%</span>
              </div>
              {p.description && <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>}
              <p className="mt-2 text-xs font-mono text-muted-foreground">Client: {p.client_id ? p.client_id.slice(0,8) + "…" : "Unassigned"}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => remove(p.id)}><Trash2 className="h-4 w-4" /></Button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AdminProjects;
