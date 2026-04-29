import { useEffect, useState } from "react";
import { Download, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Doc {
  id: string;
  title: string;
  file_path: string;
  doc_type: string;
  created_at: string;
}

const PortalDocuments = () => {
  const { toast } = useToast();
  const [docs, setDocs] = useState<Doc[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("documents")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setDocs(data ?? []);
        setLoading(false);
      });
  }, []);

  const download = async (path: string, title: string) => {
    const { data, error } = await supabase.storage.from("client-documents").createSignedUrl(path, 60);
    if (error || !data) {
      toast({ title: "Download failed", description: error?.message, variant: "destructive" });
      return;
    }
    const a = document.createElement("a");
    a.href = data.signedUrl;
    a.download = title;
    a.click();
  };

  return (
    <section>
      <h1 className="font-display text-2xl font-semibold">Documents</h1>
      <p className="mt-1 text-sm text-muted-foreground">Contracts, reports and shared files.</p>

      {loading ? (
        <p className="mt-8 text-sm text-muted-foreground">Loading…</p>
      ) : docs.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-border p-10 text-center">
          <p className="text-sm text-muted-foreground">No documents yet. Files shared by your account manager will appear here.</p>
        </div>
      ) : (
        <ul className="mt-6 divide-y divide-border rounded-xl border border-border bg-card">
          {docs.map((d) => (
            <li key={d.id} className="flex items-center justify-between gap-4 p-4">
              <div className="flex items-center gap-3 min-w-0">
                <FileText className="h-5 w-5 text-primary shrink-0" />
                <div className="min-w-0">
                  <p className="font-medium truncate">{d.title}</p>
                  <p className="text-xs text-muted-foreground">{d.doc_type} · {new Date(d.created_at).toLocaleDateString()}</p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => download(d.file_path, d.title)}>
                <Download className="h-4 w-4" />Download
              </Button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default PortalDocuments;
