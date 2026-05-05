import { Link } from "react-router-dom";
import { ArrowUp, Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";

const footerSections = [
  {
    title: "Company",
    links: [
      { to: "/about", label: "About us" },
      { to: "/divisions", label: "Divisions" },
      { to: "/projects", label: "Projects" },
      { to: "/careers", label: "Careers" },
    ],
  },
  {
    title: "Divisions",
    links: [
      { to: "/divisions#procurement", label: "Procurement & Supply" },
      { to: "/divisions#construction", label: "Development & Construction" },
      { to: "/divisions#interiors", label: "Interior Design & Finishing" },
      { to: "/divisions#logistics", label: "Logistics" },
      { to: "/divisions#equity", label: "Private Equity" },
      { to: "/divisions#agriculture", label: "Farms & Agro-processing" },
      { to: "/divisions#consulting", label: "Consulting Services" },
    ],
  },
  {
    title: "Resources",
    links: [
      { to: "/insights", label: "Insights" },
      { to: "/contact", label: "Contact" },
      { to: "/portal", label: "Client Portal" },
      { to: "/legal/privacy", label: "Privacy" },
      { to: "/legal/terms", label: "Terms" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="container-tight py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link to="/" className="inline-flex items-center" aria-label="TESADOY DYNAMICS home">
              <img src={logo} alt="TESADOY DYNAMICS" className="h-12 w-auto" />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              An integrated contracting group delivering procurement, construction, logistics,
              agriculture and advisory services with institutional rigor.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-primary" />
                <span>Headquarters address — to be provided</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:hello@tesadoy.com" className="hover:text-foreground">
                  hello@tesadoy.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>+000 000 0000</span>
              </li>
            </ul>
          </div>

          {footerSections.map((section) => (
            <div key={section.title} className="lg:col-span-3 sm:col-span-1">
              <h4 className="text-sm font-semibold text-foreground">{section.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.to + link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-8 right-6 z-50 group flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 ring-1 ring-primary/20 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-1"
        >
          <ArrowUp className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" strokeWidth={2.5} />
        </button>

        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-border pt-6 pr-0 sm:pr-20">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} TESADOY DYNAMICS. All rights reserved.
          </p>
          <p className="text-sm italic text-foreground">
            Crafting excellence in every project.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
