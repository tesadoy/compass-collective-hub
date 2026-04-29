import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Mail } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { useAuth } from "@/hooks/useAuth";

const emailSchema = z.string().trim().email({ message: "Enter a valid email" }).max(255);

const Auth = () => {
  const { toast } = useToast();
  const { session, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    document.title = "Sign in · TESADOY DYNAMICS";
  }, []);

  if (!loading && session) return <Navigate to="/portal" replace />;

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      toast({ title: "Invalid email", description: parsed.error.issues[0].message, variant: "destructive" });
      return;
    }
    setSending(true);
    const { error } = await supabase.auth.signInWithOtp({
      email: parsed.data,
      options: { emailRedirectTo: `${window.location.origin}/portal` },
    });
    setSending(false);
    if (error) {
      toast({ title: "Couldn't send link", description: error.message, variant: "destructive" });
      return;
    }
    setSent(true);
    toast({ title: "Check your inbox", description: "We sent a sign-in link to your email." });
  };

  const handleGoogle = async () => {
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: `${window.location.origin}/portal`,
    });
    if (result.error) {
      toast({ title: "Google sign-in failed", description: String(result.error), variant: "destructive" });
    }
  };

  return (
    <section className="min-h-[80vh] flex items-center bg-gradient-hero text-primary-foreground">
      <div className="container-tight grid gap-12 lg:grid-cols-2 py-20">
        <div className="hidden lg:block">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">Client Portal</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight">
            Welcome back to TESADOY DYNAMICS.
          </h1>
          <p className="mt-6 max-w-md text-white/75 leading-relaxed">
            Access your projects, documents, service requests and announcements from one secure place.
          </p>
        </div>

        <div className="rounded-2xl bg-card text-foreground p-8 sm:p-10 shadow-xl border border-border">
          <h2 className="font-display text-2xl font-semibold">Sign in</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Use Google or your email to receive a one-time sign-in link.
          </p>

          <div className="mt-6 space-y-4">
            <Button onClick={handleGoogle} variant="outline" className="w-full" size="lg">
              <svg className="h-4 w-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83C6.71 7.31 9.14 5.38 12 5.38z"/></svg>
              Continue with Google
            </Button>

            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
              <div className="relative flex justify-center text-xs uppercase tracking-wider">
                <span className="bg-card px-2 text-muted-foreground">or</span>
              </div>
            </div>

            <form onSubmit={handleMagicLink} className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  maxLength={255}
                  required
                  disabled={sent}
                />
              </div>
              <Button type="submit" className="w-full" size="lg" disabled={sending || sent}>
                <Mail className="h-4 w-4" />
                {sent ? "Link sent — check your inbox" : sending ? "Sending…" : "Email me a sign-in link"}
              </Button>
            </form>

            <p className="text-xs text-muted-foreground text-center pt-2">
              By signing in you agree to our terms.{" "}
              <Link to="/" className="underline hover:text-foreground">Back to site</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Auth;
