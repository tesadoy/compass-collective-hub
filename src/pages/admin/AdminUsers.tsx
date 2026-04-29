import { useEffect, useState } from "react";
import { ShieldCheck, ShieldOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface RoleRow { id: string; user_id: string; role: string; created_at: string; }

const AdminUsers = () => {
  const { toast } = useToast();
  const [rows, setRows] = useState<RoleRow[]>([]);

  const load = () =>
    supabase.from("user_roles").select("*").order("created_at", { ascending: false })
      .then(({ data }) => setRows(data ?? []));

  useEffect(() => { load(); }, []);

  const grouped = rows.reduce<Record<string, string[]>>((acc, r) => {
    acc[r.user_id] = acc[r.user_id] ?? [];
    acc[r.user_id].push(r.role);
    return acc;
  }, {});

  const toggleAdmin = async (userId: string, isAdmin: boolean) => {
    if (isAdmin) {
      const { error } = await supabase.from("user_roles").delete().eq("user_id", userId).eq("role", "admin");
      if (error) return toast({ title: "Failed", description: error.message, variant: "destructive" });
      toast({ title: "Admin role removed" });
    } else {
      const { error } = await supabase.from("user_roles").insert({ user_id: userId, role: "admin" });
      if (error) return toast({ title: "Failed", description: error.message, variant: "destructive" });
      toast({ title: "Admin role granted" });
    }
    load();
  };

  return (
    <section>
      <h1 className="font-display text-2xl font-semibold">Users & roles</h1>
      <p className="mt-1 text-sm text-muted-foreground">Promote clients to admin or revoke admin access. New signups receive the client role automatically.</p>

      <div className="mt-6 rounded-xl border border-border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr><th className="px-4 py-3">User ID</th><th className="px-4 py-3">Roles</th><th className="px-4 py-3 text-right">Action</th></tr>
          </thead>
          <tbody className="divide-y divide-border">
            {Object.entries(grouped).map(([uid, roles]) => {
              const isAdmin = roles.includes("admin");
              return (
                <tr key={uid}>
                  <td className="px-4 py-3 font-mono text-xs">{uid.slice(0, 8)}…</td>
                  <td className="px-4 py-3 space-x-1">
                    {roles.map((r) => <Badge key={r} variant={r === "admin" ? "default" : "secondary"}>{r}</Badge>)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button size="sm" variant={isAdmin ? "outline" : "default"} onClick={() => toggleAdmin(uid, isAdmin)}>
                      {isAdmin ? <><ShieldOff className="h-4 w-4" />Revoke admin</> : <><ShieldCheck className="h-4 w-4" />Make admin</>}
                    </Button>
                  </td>
                </tr>
              );
            })}
            {rows.length === 0 && (
              <tr><td colSpan={3} className="px-4 py-10 text-center text-muted-foreground">No users yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminUsers;
