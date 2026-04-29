import { useEffect, useState } from "react";
import { Megaphone } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Msg { id: string; title: string; body: string; audience: string; created_at: string; }

const PortalMessages = () => {
  const [items, setItems] = useState<Msg[]>([]);
  useEffect(() => {
    supabase.from("messages").select("*").order("created_at", { ascending: false })
      .then(({ data }) => setItems(data ?? []));
  }, []);

  return (
    <section>
      <h1 className="font-display text-2xl font-semibold">Messages</h1>
      <p className="mt-1 text-sm text-muted-foreground">Announcements and updates from the TESADOY team.</p>

      {items.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-border p-10 text-center">
          <p className="text-sm text-muted-foreground">No messages yet.</p>
        </div>
      ) : (
        <ul className="mt-6 space-y-3">
          {items.map((m) => (
            <li key={m.id} className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-start gap-3">
                <Megaphone className="h-5 w-5 text-primary mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <h3 className="font-display font-semibold">{m.title}</h3>
                    <span className="text-xs text-muted-foreground">{new Date(m.created_at).toLocaleDateString()}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground whitespace-pre-wrap">{m.body}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default PortalMessages;
