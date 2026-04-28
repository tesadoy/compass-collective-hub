import { Link } from "react-router-dom";
import {
  ArrowRight,
  Building2,
  Hammer,
  Leaf,
  LineChart,
  PaintRoller,
  ShieldCheck,
  Sprout,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const divisions = [
  {
    icon: Building2,
    title: "Procurement & Supply",
    description:
      "End-to-end sourcing, vendor qualification and supply chain execution for institutional buyers.",
    href: "/divisions#procurement",
  },
  {
    icon: Hammer,
    title: "Development & Construction",
    description:
      "Civil works, commercial and residential development delivered to international standards.",
    href: "/divisions#construction",
  },
  {
    icon: PaintRoller,
    title: "Interior Design & Finishing",
    description:
      "Bespoke interiors, fit-out and finishing for offices, hospitality and luxury residences.",
    href: "/divisions#interiors",
  },
  {
    icon: Truck,
    title: "Logistics",
    description:
      "Freight, warehousing, customs and last-mile coordination across regional corridors.",
    href: "/divisions#logistics",
  },
  {
    icon: LineChart,
    title: "Private Equity",
    description:
      "Disciplined capital deployment into operating businesses with long-horizon value creation.",
    href: "/divisions#equity",
  },
  {
    icon: Sprout,
    title: "Farms & Agro-processing",
    description:
      "Integrated farming, primary processing and offtake for staple and high-value crops.",
    href: "/divisions#agriculture",
  },
  {
    icon: Leaf,
    title: "Consulting Services",
    description:
      "Advisory across strategy, operations, infrastructure and capital projects.",
    href: "/divisions#consulting",
  },
  {
    icon: ShieldCheck,
    title: "Governance & Compliance",
    description:
      "Institutional-grade controls, reporting and stakeholder transparency across every mandate.",
    href: "/about",
  },
];

const stats = [
  { value: "7+", label: "Operating divisions" },
  { value: "100%", label: "In-house delivery" },
  { value: "24/7", label: "Client coordination" },
  { value: "0", label: "Compromise on standards" },
];

const Home = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
        <div className="absolute inset-0 opacity-20 [background:radial-gradient(circle_at_30%_20%,hsl(var(--accent))_0%,transparent_45%),radial-gradient(circle_at_80%_70%,hsl(var(--primary-glow))_0%,transparent_50%)]" />
        <div className="container-tight relative py-24 sm:py-32 lg:py-40">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-white/80">
            Multi-sector contracting group
          </p>
          <h1 className="mt-6 max-w-4xl font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Building, sourcing and capitalizing the
            <span className="text-white/70"> infrastructure of ambitious organizations.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-white/75">
            TESADOY DYNAMICS is an integrated contracting group operating across procurement,
            development, interiors, logistics, private equity, agriculture and advisory —
            delivered with institutional discipline.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
              <Link to="/divisions">
                Explore our divisions <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              <Link to="/contact">Start a conversation</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border bg-surface">
        <div className="container-tight grid grid-cols-2 gap-8 py-12 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-display text-3xl font-semibold text-primary sm:text-4xl">
                {s.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Divisions */}
      <section className="py-20 sm:py-28">
        <div className="container-tight">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                What we do
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
                Eight disciplines, one operating standard.
              </h2>
              <p className="mt-4 text-muted-foreground">
                Each division operates independently and integrates seamlessly — so a single
                client engagement can move from sourcing to construction to fit-out to logistics
                without changing partners.
              </p>
            </div>
            <Button asChild variant="outline">
              <Link to="/divisions">
                See all divisions <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {divisions.map(({ icon: Icon, title, description, href }) => (
              <Link
                key={title}
                to={href}
                className="group rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md-soft hover:border-accent/40"
              >
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-muted text-primary group-hover:bg-gradient-accent group-hover:text-primary-foreground transition-colors">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
                  Learn more <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 sm:pb-28">
        <div className="container-tight">
          <div className="overflow-hidden rounded-2xl bg-gradient-hero p-10 sm:p-14 text-primary-foreground shadow-elegant">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="font-display text-3xl font-semibold leading-tight sm:text-4xl">
                  Have a project in mind?
                </h2>
                <p className="mt-4 max-w-xl text-white/75">
                  Whether you need a single division or end-to-end delivery, our team will
                  scope, structure and execute with the rigor your project deserves.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row lg:justify-end gap-3">
                <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                  <Link to="/contact">Request a proposal</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
                >
                  <Link to="/about">About TESADOY</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
