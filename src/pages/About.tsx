import { Link } from "react-router-dom";
import { ArrowRight, Compass, Handshake, Layers, ShieldCheck, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Seo from "@/components/Seo";
import aboutHero from "@/assets/about-hero.jpg";
import tesleemOyedele from "@/assets/tesleem-oyedele.png.asset.json";
import bamideleAdisa from "@/assets/bamidele-adisa.jpeg.asset.json";
import christianCelestine from "@/assets/christian-celestine.png.asset.json";
import lateefAdeyemi from "@/assets/lateef-adeyemi.jpeg.asset.json";

const values = [
  {
    icon: ShieldCheck,
    title: "Institutional rigor",
    description:
      "Every engagement is governed by clear scopes, controls, reporting and stakeholder transparency.",
  },
  {
    icon: Handshake,
    title: "Long-horizon partnerships",
    description:
      "We invest in clients, partners and communities for the long term — not transactionally.",
  },
  {
    icon: Layers,
    title: "Integrated delivery",
    description:
      "Multiple disciplines under one roof remove handoffs, reduce risk and accelerate outcomes.",
  },
  {
    icon: Sparkles,
    title: "Quality without compromise",
    description:
      "We hold an uncompromising standard across procurement, build quality, finishing and service.",
  },
  {
    icon: Compass,
    title: "Disciplined capital",
    description:
      "Capital is allocated to opportunities with structural advantages and durable returns.",
  },
  {
    icon: Users,
    title: "People-first culture",
    description:
      "Our teams are trained, certified and empowered to make decisions on the ground.",
  },
];

const leadership = [
  { name: "Tesleem Oyedele", role: "Group Chairperson", image: tesleemOyedele.url },
  { name: "Bamidele Adisa", role: "Chief Executive Officer", image: bamideleAdisa.url },
  { name: "Christian Celestine", role: "Chief Operating Officer", image: christianCelestine.url },
  { name: "Lateef Adeyemi", role: "Chief Financial Officer", image: lateefAdeyemi.url },
];

const About = () => {
  return (
    <>
      <Seo title="About TESADOY DYNAMICS" description="An integrated contracting group built on institutional rigor, long-horizon partnerships and integrated delivery across eight disciplines." path="/about" />
      <section className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
        <img
          src={aboutHero}
          alt="Modern corporate boardroom overlooking a city skyline at golden hour"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/75 via-primary/55 to-primary/35" />
        <div className="container-tight relative py-20 sm:py-28">
          <p className="animate-fade-up text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
            About TESADOY DYNAMICS
          </p>
          <h1 className="animate-fade-up delay-100 mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            An integrated contracting group built for ambitious mandates.
          </h1>
          <p className="animate-fade-up delay-200 mt-6 max-w-2xl text-white/80 text-lg leading-relaxed">
            We bring together procurement, development, interiors, logistics, capital, agriculture
            and advisory under one operating standard — so our clients can move faster, with less
            risk, on the projects that matter most.
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="container-tight grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Our mission
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
              Build the operating backbone of organizations that shape their markets.
            </h2>
          </div>
          <div className="space-y-5 text-muted-foreground leading-relaxed">
            <p>
              TESADOY DYNAMICS exists to deliver complex, multi-disciplinary projects with the
              discipline of an institutional operator and the agility of a private group. We
              partner with corporates, governments, developers and investors to design, build,
              source, finance and operate the assets that drive their growth.
            </p>
            <p>
              We are sector-diverse by design. Our divisions reinforce each other — a single
              engagement can move from feasibility to procurement to construction to fit-out and
              into operations without ever changing partners.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-surface py-20 sm:py-24">
        <div className="container-tight">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              What we stand for
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
              Six principles that govern how we operate.
            </h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-xl border border-border bg-card p-6 shadow-sm"
              >
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-muted text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="container-tight">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                Leadership
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
                Operators who have built and scaled across sectors.
              </h2>
              <p className="mt-4 text-muted-foreground">
                The leadership team steering TESADOY DYNAMICS across procurement, development,
                capital and operations.
              </p>
            </div>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {leadership.map((person, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-6">
                <div className="aspect-[4/5] w-full overflow-hidden rounded-lg bg-gradient-subtle">
                  {person.image ? (
                    <img
                      src={person.image}
                      alt={`Portrait of ${person.name}`}
                      className="h-full w-full object-cover object-top"
                      loading="lazy"
                    />
                  ) : null}
                </div>
                <p className="mt-4 font-display text-base font-semibold">{person.name}</p>
                <p className="text-sm text-muted-foreground">{person.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 sm:pb-28">
        <div className="container-tight">
          <div className="rounded-2xl border border-border bg-card p-10 sm:p-14 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h2 className="font-display text-2xl font-semibold sm:text-3xl">
                Want to work with us?
              </h2>
              <p className="mt-2 text-muted-foreground">
                Tell us about your project and we'll respond within two business days.
              </p>
            </div>
            <Button asChild size="lg">
              <Link to="/contact">
                Get in touch <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
