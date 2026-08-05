import { useEffect, useState } from "react";
import { Plus, Trash2, Pencil, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  status: string;
  created_at: string;
}

const divisions = [
  "Procurement & Supply",
  "Development & Construction",
  "Interior Design & Finishing",
  "Logistics",
  "Private Equity",
  "Farms & Agro-processing",
  "Consulting Services",
  "Cross-divisional",
];

const types = ["Full-time", "Contract", "Internship", "Part-time"];
const statuses = ["open", "closed"];

const emptyForm = {
  title: "",
  department: divisions[0],
  location: "",
  type: "Full-time",
  description: "",
  requirements: "",
  status: "open",
};

const AdminJobs = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<Job[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Job | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [filter, setFilter] = useState("all");

  const load = async () => {
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Failed to load jobs", description: error.message, variant: "destructive" });
      return;
    }
    setItems(data ?? []);
  };

  useEffect(() => { load(); }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setEditing(null);
  };

  const startEdit = (job: Job) => {
    setEditing(job);
    setForm({
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      description: job.description,
      requirements: job.requirements.join("\n"),
      status: job.status,
    });
    setOpen(true);
  };

  const startCreate = () => {
    resetForm();
    setOpen(true);
  };

  const save = async () => {
    if (!form.title.trim() || !form.location.trim() || !form.description.trim()) {
      return toast({ title: "Title, location and description are required", variant: "destructive" });
    }
    const payload = {
      title: form.title.trim(),
      department: form.department,
      location: form.location.trim(),
      type: form.type,
      description: form.description.trim(),
      requirements: form.requirements.split("\n").map((r) => r.trim()).filter(Boolean),
      status: form.status,
    };

    if (editing) {
      const { error } = await supabase.from("jobs").update(payload).eq("id", editing.id);
      if (error) return toast({ title: "Failed to update", description: error.message, variant: "destructive" });
      toast({ title: "Job updated" });
    } else {
      const { error } = await supabase.from("jobs").insert(payload);
      if (error) return toast({ title: "Failed to create", description: error.message, variant: "destructive" });
      toast({ title: "Job created" });
    }

    setOpen(false);
    resetForm();
    load();
  };

  const remove = async (id: string) => {
    const { error } = await supabase.from("jobs").delete().eq("id", id);
    if (error) return toast({ title: "Failed to delete", description: error.message, variant: "destructive" });
    toast({ title: "Job deleted" });
    load();
  };

  const filtered = filter === "all" ? items : items.filter((j) => j.status === filter);

  return (
    <section>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold">Jobs</h1>
          <p className="mt-1 text-sm text-muted-foreground">Publish, edit and unpublish careers page roles.</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button onClick={startCreate}><Plus className="h-4 w-4" />New role</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader><DialogTitle>{editing ? "Edit role" : "New role"}</DialogTitle></DialogHeader>
              <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
                <div className="space-y-2"><Label>Title</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Department</Label>
                    <Select value={form.department} onValueChange={(v) => setForm({ ...form, department: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>{divisions.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>{types.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2"><Label>Location</Label><Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} /></div>
                <div className="space-y-2"><Label>Description</Label><Textarea rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
                <div className="space-y-2">
                  <Label>Requirements (one per line)</Label>
                  <Textarea rows={4} value={form.requirements} onChange={(e) => setForm({ ...form, requirements: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{statuses.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <Button onClick={save} className="w-full">{editing ? "Save changes" : "Publish role"}</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="mt-6 grid gap-3">
        {filtered.length === 0 ? (
          <p className="text-sm text-muted-foreground">No roles match this filter.</p>
        ) : filtered.map((job) => (
          <div key={job.id} className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-display font-semibold">{job.title}</h3>
                  <Badge variant="secondary">{job.department}</Badge>
                  <Badge variant={job.status === "open" ? "default" : "outline"}>{job.status}</Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{job.type} · {job.location}</p>
                <p className="mt-2 text-sm text-foreground line-clamp-2">{job.description}</p>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" onClick={() => startEdit(job)}><Pencil className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" onClick={() => remove(job.id)}><Trash2 className="h-4 w-4" /></Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AdminJobs;
