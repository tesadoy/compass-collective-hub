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
import { useAuth } from "@/hooks/useAuth";

interface Msg { id: string; title: string; body: string; audience: string; client_id: string | null; created_at: string; }

const AdminMessages = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [items, setItems] = useState<Msg[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", body: "", audience: "broadcast", client_id: "" });

  const load = () => supabase.from("messages").select("*").order("created_at", { ascending: false }).then(({ data }) => setItems(data ?? []));
  useEffect(() => { load(); }, []);

  const create = async () => {
    if (!form.title.trim() || !form.body.trim()) return toast({ title: "Title and body required", variant: "destructive" });
    const payload = {
      title: form.title, body: form.body, audience: form.audience,
      client_id: form.audience === "client" ? form.client_id.trim() || null : null,
      sent_by: user?.id ?? null,
    };
    const { error } = await supabase.from("messages").insert(payload);
    if (error) return toast({ title: "Failed", description: error.message, variant: "destructive" });
    toast({ title: "Announcement published" });
    setOpen(false);
    setForm({ title: "", body: "", audience: "broadcast", client_id: "" });
    load();
  };

  const remove = async (id: string) => {
    await supabase.from("messages").delete().eq("id", id);
    load();
  };

  return (
    <section>
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold">Announcements</h1>
          <p className="mt-1 text-sm text-muted-foreground">Broadcast updates to all clients or message a specific client.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button><Plus className="h-4 w-4" />New message</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New announcement</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2"><Label>Title</Label><Input value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} /></div>
              <div className="space-y-2"><Label>Message</Label><Textarea rows={5} value={form.body} onChange={(e) => setForm({...form, body: e.target.value})} /></div>
              <div className="space-y-2">
                <Label>Audience</Label>
                <Select value={form.audience} onValueChange={(v) => setForm({...form, audience: v})}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="broadcast">All clients (broadcast)</SelectItem>
                    <SelectItem value="client">Specific client</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {form.audience === "client" && (
                <div className="space-y-2"><Label>Client user ID</Label><Input value={form.client_id} onChange={(e) => setForm({...form, client_id: e.target.value})} /></div>
              )}
              <Button onClick={create} className="w-full">Publish</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mt-6 space-y-3">
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">No announcements yet.</p>
        ) : items.map((m) => (
          <article key={m.id} className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-display font-semibold">{m.title}</h3>
                  <Badge variant={m.audience === "broadcast" ? "default" : "secondary"}>{m.audience}</Badge>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{new Date(m.created_at).toLocaleString()}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => remove(m.id)}><Trash2 className="h-4 w-4" /></Button>
            </div>
            <p className="mt-3 text-sm text-muted-foreground whitespace-pre-wrap">{m.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default AdminMessages;
