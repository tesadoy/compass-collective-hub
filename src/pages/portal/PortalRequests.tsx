import { useEffect, useState } from "react";
import { z } from "zod";
import { Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

interface Req {
  id: string; subject: string; message: string; division: string;
  priority: string; status: string; created_at: string;
}

const divisions = ["Procurement","Construction","Interior","Logistics","Private Equity","Agriculture","Consulting","General"];

const schema = z.object({
  subject: z.string().trim().min(3).max(200),
  message: z.string().trim().min(10).max(2000),
  division: z.string().min(1),
  priority: z.string().min(1),
});

const PortalRequests = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [items, setItems] = useState<Req[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ subject: "", message: "", division: "General", priority: "normal" });
  const [submitting, setSubmitting] = useState(false);

  const load = () =>
    supabase.from("service_requests").select("*").order("created_at", { ascending: false }).then(({ data }) => setItems(data ?? []));

  useEffect(() => { load(); }, []);

  const submit = async () => {
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast({ title: "Please complete all fields", variant: "destructive" });
      return;
    }
    if (!user) return;
    setSubmitting(true);
    const { error } = await supabase.from("service_requests").insert({ ...parsed.data, user_id: user.id });
    setSubmitting(false);
    if (error) { toast({ title: "Could not submit", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Request submitted", description: "Our team will respond shortly." });
    setOpen(false);
    setForm({ subject: "", message: "", division: "General", priority: "normal" });
    load();
  };

  return (
    <section>
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-2xl font-semibold">Service requests</h1>
          <p className="mt-1 text-sm text-muted-foreground">Submit and track requests across our divisions.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button><Plus className="h-4 w-4" />New request</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New service request</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Subject</Label>
                <Input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} maxLength={200} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Division</Label>
                  <Select value={form.division} onValueChange={(v) => setForm({ ...form, division: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{divisions.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select value={form.priority} onValueChange={(v) => setForm({ ...form, priority: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Message</Label>
                <Textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} maxLength={2000} />
              </div>
              <Button onClick={submit} disabled={submitting} className="w-full">{submitting ? "Submitting…" : "Submit request"}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {items.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-border p-10 text-center">
          <p className="text-sm text-muted-foreground">No requests yet.</p>
        </div>
      ) : (
        <ul className="mt-6 space-y-3">
          {items.map((r) => (
            <li key={r.id} className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h3 className="font-display font-semibold">{r.subject}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{r.division} · {r.priority} · {new Date(r.created_at).toLocaleDateString()}</p>
                </div>
                <Badge variant={r.status === "open" ? "default" : "secondary"}>{r.status}</Badge>
              </div>
              <p className="mt-3 text-sm text-muted-foreground whitespace-pre-wrap">{r.message}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default PortalRequests;
