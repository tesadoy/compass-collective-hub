import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Briefcase, Globe2, GraduationCap, HeartHandshake, MapPin, Sparkles, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Seo from "@/components/Seo";
import { supabase } from "@/integrations/supabase/client";

type Job = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
};

const values = [
  { icon: TrendingUp, title: "Ownership mindset", desc: "We hire people who treat the work like it's theirs — because it is." },
  { icon: HeartHandshake, title: "Integrity, always", desc: "We do what we said we would do, and we tell the truth when it's hard." },
  { icon: Sparkles, title: "Quality is non-negotiable", desc: "Good enough isn't. We finish the last 10% that most teams skip." },
  { icon: Globe2, title: "Cross-sector exposure", desc: "Build a career across construction, agriculture, finance and consulting." },
];

const benefits = [
  "Competitive compensation benchmarked annually",
  "Performance-linked bonuses and long-term incentives",
  "Comprehensive medical cover for you and dependents",
  "Generous paid leave and parental leave",
  "Structured learning budget and certifications support",
  "Mentorship from senior division leadership",
  "Cross-divisional rotation opportunities",
  "Modern offices and field equipment",
];

const Careers = () => {
  const [activeDivision, setActiveDivision] = useState<string>("All");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("jobs")
        .select("id, title, department, location, type, description, requirements")
        .eq("status", "open")
        .order("created_at", { ascending: false });
      if (!error) setJobs(data ?? []);
      setLoading(false);
    };
    fetchJobs();
  }, []);

  const divisions = ["All", ...Array.from(new Set(jobs.map((j) => j.department)))];
  const filtered = activeDivision === "All" ? jobs : jobs.filter((j) => j.department === activeDivision);

  return (
    <div>
      <Seo title="Careers" description="Build a career at TESADOY DYNAMICS. Open roles across construction, procurement, logistics, agriculture, design, consulting and private equity." path="/careers" />
      {/* Hero */}
      <section className="border-b border-border bg-gradient-hero text-primary-foreground">
        <div className="container-tight py-20 lg:py-28">
          <Badge variant="secondary" className="mb-5 bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/15">
            Careers
          </Badge>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05] max-w-4xl">
            Build something that lasts. Across sectors, with operators who care.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-primary-foreground/80 leading-relaxed">
            We hire ambitious people who want exposure to real delivery — projects, capital and operations — not just slide decks.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              <a href="#openings">See open roles</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/about">About TESADOY</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why work here */}
      <section className="container-tight py-16 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-primary uppercase tracking-wider">Why TESADOY</p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-semibold tracking-tight">
            A rare combination: institutional rigor and operator pace.
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <Card key={v.title} className="border-border/70">
              <CardContent className="p-6">
                <div className="grid h-11 w-11 place-items-center rounded-md bg-primary/10 text-primary mb-4">
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-base font-semibold text-foreground">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="border-y border-border bg-surface">
        <div className="container-tight py-16 lg:py-24 grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <p className="text-sm font-medium text-primary uppercase tracking-wider">Benefits</p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-semibold tracking-tight">
              We invest in the people who build with us.
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Compensation, growth and well-being are reviewed continuously. We want this to be the most defining chapter of your career.
            </p>
            <div className="mt-8 flex items-center gap-3 text-sm text-muted-foreground">
              <GraduationCap className="h-5 w-5 text-primary" />
              <span>Annual learning budget · external certifications supported</span>
            </div>
          </div>
          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm text-foreground">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Openings */}
      <section id="openings" className="container-tight py-16 lg:py-24 scroll-mt-24">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div>
            <p className="text-sm font-medium text-primary uppercase tracking-wider">Open roles</p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-semibold tracking-tight">
              Find your next role.
            </h2>
          </div>
          {!loading && jobs.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {divisions.map((d) => (
                <button
                  key={d}
                  onClick={() => setActiveDivision(d)}
                  className={`px-3.5 py-1.5 text-sm font-medium rounded-full border transition-colors ${
                    activeDivision === d
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-muted-foreground border-border hover:text-foreground hover:border-foreground/40"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          )}
        </div>

        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        ) : jobs.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-surface/50 p-10 text-center">
            <h3 className="font-display text-xl font-semibold">No current openings</h3>
            <p className="mt-2 max-w-xl mx-auto text-sm text-muted-foreground">
              We are not actively hiring for any roles right now. Please check back soon, or send us your profile for future opportunities.
            </p>
            <Button asChild className="mt-6">
              <Link to="/contact">Submit a general application</Link>
            </Button>
          </div>
        ) : (
          <div className="divide-y divide-border border-y border-border">
            {filtered.map((o) => (
              <div key={o.id} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-6">
                <div className="flex items-start gap-4">
                  <div className="grid h-11 w-11 place-items-center rounded-md bg-primary/10 text-primary shrink-0">
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground">{o.title}</h3>
                    <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                      <span>{o.department}</span>
                      <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{o.location}</span>
                      <Badge variant="outline" className="text-xs">{o.type}</Badge>
                    </div>
                  </div>
                </div>
                <Button asChild variant="outline" size="sm" className="self-start md:self-center">
                  <Link to="/contact" state={{ subject: `Application: ${o.title}` }}>
                    Apply <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        )}

        {jobs.length > 0 && (
          <div className="mt-12 rounded-lg border border-dashed border-border p-8 text-center">
            <h3 className="font-display text-xl font-semibold">Don't see your role?</h3>
            <p className="mt-2 max-w-xl mx-auto text-sm text-muted-foreground">
              We're always interested in meeting exceptional operators, builders and analysts. Send us your profile.
            </p>
            <Button asChild className="mt-6">
              <Link to="/contact">Submit a general application</Link>
            </Button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Careers;
