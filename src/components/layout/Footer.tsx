import { Link } from "react-router-dom";
import { Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
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
      { to: "/divisions#interiors", label: "Renovation & Interior Finishing" },
      { to: "/divisions#logistics", label: "Logistics" },
      { to: "/divisions#equity", label: "Private Equity" },
      { to: "/divisions#agriculture", label: "Farms & Agro-processing" },
      { to: "/divisions#consulting", label: "Consulting Services" },
      { to: "/divisions#tech", label: "Tech & Digital Solutions" },
    ],
  },
  {
    title: "Resources",
    links: [
      { to: "/contact", label: "Contact" },
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
                <span>Gwagwalada, FCT-Abuja, Nigeria</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:Contact@tesadoy.com" className="hover:text-foreground">
                  Contact@tesadoy.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>+234-811-463-6222</span>
              </li>
            </ul>

            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://www.instagram.com/tesadoy_group?stkn=MWUzOHFvcnZkaXA2bg=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TESADOY DYNAMICS on Instagram"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://wa.me/2348114636222?text=Hello%20TESADOY%20DYNAMICS"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with TESADOY DYNAMICS on WhatsApp"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.358-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.13 1.588 5.931L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.006c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
              <span className="text-xs text-muted-foreground">LinkedIn link ready — paste the URL when you have it.</span>
            </div>
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
          onClick={() => {
            const start = window.scrollY;
            const duration = Math.min(1200, Math.max(500, start * 0.6));
            const startTime = performance.now();
            const easeInOutCubic = (t: number) =>
              t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
            const step = (now: number) => {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              window.scrollTo(0, start * (1 - easeInOutCubic(progress)));
              if (progress < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
          }}
          aria-label="Back to top"
          className="fixed bottom-8 right-6 z-50 group flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 ring-1 ring-primary/20 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-1"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5"
            aria-hidden="true"
          >
            <path
              d="M12 5 L20.5 18 Q21 19 19.5 19 L4.5 19 Q3 19 3.5 18 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
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
