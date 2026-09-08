import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Seo from "@/components/Seo";
import imgMixedUse from "@/assets/proj-mixed-use.jpg";
import imgHqFitout from "@/assets/proj-hq-fitout.jpg";
import imgProcurement from "@/assets/proj-procurement.jpg";
import imgDistribution from "@/assets/proj-distribution.jpg";
import imgAgro from "@/assets/proj-agro.jpg";
import imgEquity from "@/assets/proj-equity.jpg";
import imgAdvisory from "@/assets/proj-advisory.jpg";
import imgResidential from "@/assets/proj-residential.jpg";
import projectsHero from "@/assets/projects-hero.jpg";

type Project = {
  title: string;
  division: string;
  location: string;
  year: string;
  description: string;
  image: string;
};


const projects: Project[] = [
  {
    title: "Mixed-use Commercial Development",
    division: "Development & Construction",
    location: "Project location",
    year: "2024",
    description:
      "Ground-up development of a flagship commercial complex including retail, office and parking.",
    image: imgMixedUse,
  },
  {
    title: "Corporate HQ Fit-out",
    division: "Interior Design & Finishing",
    location: "Project location",
    year: "2024",
    description:
      "Turnkey design and fit-out of a multi-floor corporate headquarters with bespoke joinery.",
    image: imgHqFitout,
  },
  {
    title: "Institutional Procurement Programme",
    division: "Procurement & Supply",
    location: "Project location",
    year: "2023",
    description:
      "Multi-category sourcing programme covering equipment, consumables and specialist services.",
    image: imgProcurement,
  },
  {
    title: "Regional Distribution Network",
    division: "Logistics",
    location: "Project location",
    year: "2023",
    description:
      "Cross-border freight, customs and last-mile distribution for a manufacturing client.",
    image: imgDistribution,
  },
  {
    title: "Agro-processing Facility",
    division: "Farms & Agro-processing",
    location: "Project location",
    year: "2023",
    description:
      "Greenfield primary processing facility with cold chain and packaging integration.",
    image: imgAgro,
  },
  {
    title: "Buy-and-Build Investment",
    division: "Private Equity",
    location: "Project location",
    year: "2022",
    description:
      "Platform investment across a fragmented services category with operational improvements.",
    image: imgEquity,
  },
  {
    title: "Capital Projects Advisory",
    division: "Consulting Services",
    location: "Project location",
    year: "2022",
    description:
      "Independent advisory on a multi-phase infrastructure programme for a public-sector client.",
    image: imgAdvisory,
  },
  {
    title: "Luxury Residential Development",
    division: "Development & Construction",
    location: "Project location",
    year: "2022",
    description:
      "Premium residential development with integrated interior design and concierge fit-out.",
    image: imgResidential,
  },
];

const filters = [
  "All",
  "Procurement & Supply",
  "Development & Construction",
  "Interior Design & Finishing",
  "Logistics",
  "Private Equity",
  "Farms & Agro-processing",
  "Consulting Services",
];

const Projects = () => {
  const [active, setActive] = useState<string>("All");

  const filtered = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.division === active)),
    [active],
  );

  return (
    <>
      <Seo title="Selected Projects" description="A selection of TESADOY DYNAMICS projects across construction, interiors, logistics, agriculture and private equity." path="/projects" />
      <section className="relative isolate overflow-hidden bg-primary text-primary-foreground">
        <img
          src={projectsHero}
          alt="Project team reviewing plans at a commercial development in daylight"
          width={1920}
          height={1080}
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/95 via-primary/65 to-primary/10" />
        <div className="container-tight py-20 sm:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/80">
            Selected projects
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            A portfolio shaped by integrated delivery.
          </h1>
          <p className="mt-6 max-w-2xl text-primary-foreground/85 text-lg leading-relaxed">
            Representative engagements across our divisions. Detailed case studies are available
            on request under appropriate confidentiality.
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-surface">
        <div className="container-tight py-6 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setActive(f)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                active === f
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-muted-foreground hover:text-foreground hover:border-accent/40",
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="container-tight">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p, i) => (
              <article
                key={p.title + i}
                className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md-soft hover:border-accent/40"
              >
                <img src={p.image} alt={p.title} loading="lazy" width={1024} height={768} className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                <div className="p-6 flex flex-1 flex-col">
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                    {p.division}
                  </p>
                  <h3 className="mt-2 font-display text-lg font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground flex-1">
                    {p.description}
                  </p>
                  <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{p.location}</span>
                    <span>{p.year}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-16">
              No projects in this category yet.
            </p>
          )}
        </div>
      </section>

      <section className="pb-20 sm:pb-28">
        <div className="container-tight">
          <div className="rounded-2xl border border-border bg-card p-10 sm:p-14 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h2 className="font-display text-2xl font-semibold sm:text-3xl">
                Request a detailed case study
              </h2>
              <p className="mt-2 text-muted-foreground">
                We can share more on scope, outcomes and references under NDA.
              </p>
            </div>
            <Button asChild size="lg">
              <Link to="/contact">
                Talk to our team <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;
