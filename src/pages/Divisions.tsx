import { Link } from "react-router-dom";
import {
  ArrowRight,
  Building2,
  Hammer,
  Leaf,
  LineChart,
  PaintRoller,
  Sprout,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Seo from "@/components/Seo";
import divisionsHero from "@/assets/divisions-hero.jpg";

const divisions = [
  {
    id: "procurement",
    icon: Building2,
    title: "Procurement & Supply",
    summary:
      "End-to-end sourcing for institutional buyers — from category strategy to vendor execution.",
    services: [
      "Category strategy & sourcing",
      "Vendor qualification & due diligence",
      "Tender management & evaluation",
      "Inventory planning & fulfilment",
      "Equipment, materials and consumables supply",
    ],
  },
  {
    id: "construction",
    icon: Hammer,
    title: "Development & Construction",
    summary:
      "Civil works, commercial and residential development delivered to international standards.",
    services: [
      "Pre-construction & feasibility",
      "Civil and structural works",
      "Commercial, retail and mixed-use",
      "Residential & estate development",
      "Project & construction management",
    ],
  },
  {
    id: "interiors",
    icon: PaintRoller,
    title: "Interior Design & Finishing",
    summary:
      "Bespoke interiors, fit-out and finishing for offices, hospitality and luxury residences.",
    services: [
      "Concept design & space planning",
      "FF&E sourcing and specification",
      "Joinery, stone and bespoke finishes",
      "MEP coordination",
      "Turnkey fit-out delivery",
    ],
  },
  {
    id: "logistics",
    icon: Truck,
    title: "Logistics",
    summary:
      "Freight, warehousing, customs and last-mile coordination across regional corridors.",
    services: [
      "International freight (air, sea, road)",
      "Customs clearing & forwarding",
      "Bonded and ambient warehousing",
      "Distribution & last-mile",
      "Project logistics for heavy cargo",
    ],
  },
  {
    id: "equity",
    icon: LineChart,
    title: "Private Equity",
    summary:
      "Disciplined capital deployment into operating businesses with long-horizon value creation.",
    services: [
      "Direct equity investments",
      "Buy-and-build platforms",
      "Operational value creation",
      "Co-investment partnerships",
      "Exit structuring",
    ],
  },
  {
    id: "agriculture",
    icon: Sprout,
    title: "Farms & Agro-processing",
    summary:
      "Integrated farming, primary processing and offtake for staple and high-value crops.",
    services: [
      "Commercial farm operations",
      "Primary processing & packaging",
      "Cold chain & storage",
      "Offtake and distribution",
      "Outgrower programs",
    ],
  },
  {
    id: "consulting",
    icon: Leaf,
    title: "Consulting Services",
    summary:
      "Advisory across strategy, operations, infrastructure and capital projects.",
    services: [
      "Corporate & growth strategy",
      "Operations and performance improvement",
      "Infrastructure & capital project advisory",
      "Market entry & feasibility",
      "Transaction support",
    ],
  },
];

const Divisions = () => {
  return (
    <>
      <Seo title="Our Divisions" description="Seven operating divisions: procurement, construction, interiors, logistics, private equity, agriculture and consulting." path="/divisions" />
      <section className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
        <img
          src={divisionsHero}
          alt="Aerial view of a commercial development site at dusk"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/85 via-primary/70 to-primary/50" />
        <div className="container-tight relative py-20 sm:py-28">
          <p className="animate-fade-up text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
            Our divisions
          </p>
          <h1 className="animate-fade-up delay-100 mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Seven service lines, one operating standard.
          </h1>
          <p className="animate-fade-up delay-200 mt-6 max-w-2xl text-white/80 text-lg leading-relaxed">
            Engage a single division or commission integrated end-to-end delivery — every line
            of business operates to the same governance, quality and reporting standard.
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-surface">
        <div className="container-tight py-6 flex flex-wrap gap-2">
          {divisions.map((d) => (
            <a
              key={d.id}
              href={`#${d.id}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-accent/40 transition-colors"
            >
              <d.icon className="h-3.5 w-3.5" />
              {d.title}
            </a>
          ))}
        </div>
      </section>

      <div className="container-tight py-20 sm:py-24 space-y-20">
        {divisions.map(({ id, icon: Icon, title, summary, services }, idx) => (
          <section key={id} id={id} className="scroll-mt-24">
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <span className="grid h-12 w-12 place-items-center rounded-lg bg-gradient-accent text-primary-foreground">
                  <Icon className="h-6 w-6" />
                </span>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  Division {String(idx + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
                  {title}
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">{summary}</p>
                <Button asChild className="mt-6">
                  <Link to="/contact">
                    Discuss a project <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="lg:col-span-7">
                <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
                  <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    Capabilities
                  </h3>
                  <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                    {services.map((s) => (
                      <li
                        key={s}
                        className="flex items-start gap-2 text-sm text-foreground"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </>
  );
};

export default Divisions;
