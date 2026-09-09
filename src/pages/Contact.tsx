import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Seo from "@/components/Seo";
import contactHero from "@/assets/contact-hero.jpg";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .nonempty({ message: "Please enter your name" })
    .max(100, { message: "Name must be under 100 characters" }),
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email" })
    .max(255, { message: "Email must be under 255 characters" }),
  company: z.string().trim().max(150, { message: "Company must be under 150 characters" }).optional(),
  phone: z.string().trim().max(40, { message: "Phone must be under 40 characters" }).optional(),
  division: z.string().trim().max(100).optional(),
  message: z
    .string()
    .trim()
    .nonempty({ message: "Please enter a message" })
    .max(2000, { message: "Message must be under 2000 characters" }),
});

const divisionOptions = [
  "Procurement & Supply",
  "Development & Construction",
  "Renovation & Interior Finishing",
  "Logistics",
  "Private Equity",
  "Farms & Agro-processing",
  "Consulting Services",
  "General enquiry",
];

const Contact = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    division: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as string;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
      if (!accessKey) throw new Error("Form is not configured yet. Please email Contact@tesadoy.com.");

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `New enquiry from ${parsed.data.name}${parsed.data.division ? ` — ${parsed.data.division}` : ""}`,
          from_name: "TESADOY DYNAMICS Website",
          replyto: parsed.data.email,
          name: parsed.data.name,
          email: parsed.data.email,
          company: parsed.data.company || "—",
          phone: parsed.data.phone || "—",
          division: parsed.data.division || "—",
          message: parsed.data.message,
        }),
      });
      const result = await res.json();
      if (!res.ok || !result.success) throw new Error(result.message || "Submission failed");

      toast({
        title: "Message received",
        description: "Thanks for reaching out — we'll respond within two business days.",
      });
      setForm({ name: "", email: "", company: "", phone: "", division: "", message: "" });
    } catch (err) {
      toast({
        title: "Couldn't send",
        description: err instanceof Error ? err.message : "Please try again shortly.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Seo title="Contact TESADOY DYNAMICS" description="Get in touch to scope a project, request a proposal or partner with our team across construction, procurement, logistics, agriculture and advisory." path="/contact" />
      <section className="relative isolate overflow-hidden bg-primary text-primary-foreground">
        <img
          src={contactHero}
          alt="Welcoming modern corporate headquarters in bright daylight"
          width={1920}
          height={1080}
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/95 via-primary/60 to-primary/5" />
        <div className="container-tight py-20 sm:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/80">
            Contact
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Let's discuss your next project.
          </h1>
          <p className="mt-6 max-w-2xl text-primary-foreground/85 text-lg leading-relaxed">
            Tell us about your scope, timeline and objectives. A senior member of our team will
            respond within two business days.
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="container-tight grid gap-12 lg:grid-cols-12">
          <aside className="lg:col-span-4 space-y-8">
            <div>
              <h2 className="font-display text-xl font-semibold">Group Headquarters</h2>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 mt-0.5 text-primary" />
                  <span>Gwagwalada, FCT-Abuja, Nigeria</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-primary" />
                  <a href="mailto:Contact@tesadoy.com" className="hover:text-foreground">
                    Contact@tesadoy.com
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>+234-811-463-6222</span>
                </li>
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-surface p-6">
              <h3 className="font-display text-base font-semibold">Working hours</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Monday – Friday · 09:00 – 17:00<br />
                Saturday · 10:00 – 15:00
              </p>
            </div>
            <div className="rounded-xl border border-border bg-surface p-6">
              <h3 className="font-display text-base font-semibold">Press & investors</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                For media, partnership or investment enquiries, please email{" "}
                <a href="mailto:Contact@tesadoy.com" className="text-foreground underline">
                  Contact@tesadoy.com
                </a>
                .
              </p>
            </div>
          </aside>

          <form
            onSubmit={handleSubmit}
            className="lg:col-span-8 rounded-2xl border border-border bg-card p-8 sm:p-10 shadow-sm space-y-6"
            noValidate
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full name *</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={update("name")}
                  maxLength={100}
                  required
                  aria-invalid={!!errors.name}
                />
                {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  maxLength={255}
                  required
                  aria-invalid={!!errors.email}
                />
                {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company / Organization</Label>
                <Input
                  id="company"
                  value={form.company}
                  onChange={update("company")}
                  maxLength={150}
                />
                {errors.company && <p className="text-xs text-destructive">{errors.company}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={update("phone")}
                  maxLength={40}
                />
                {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="division">Division of interest</Label>
              <Select
                value={form.division}
                onValueChange={(v) => setForm((f) => ({ ...f, division: v }))}
              >
                <SelectTrigger id="division">
                  <SelectValue placeholder="Select a division" />
                </SelectTrigger>
                <SelectContent>
                  {divisionOptions.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">How can we help? *</Label>
              <Textarea
                id="message"
                rows={6}
                value={form.message}
                onChange={update("message")}
                maxLength={2000}
                required
                aria-invalid={!!errors.message}
              />
              <div className="flex justify-between">
                {errors.message ? (
                  <p className="text-xs text-destructive">{errors.message}</p>
                ) : (
                  <span />
                )}
                <p className="text-xs text-muted-foreground">{form.message.length}/2000</p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 pt-2">
              <p className="text-xs text-muted-foreground">
                We typically respond within two business days.
              </p>
              <Button type="submit" size="lg" disabled={submitting}>
                {submitting ? "Sending…" : (<>Send message <Send className="h-4 w-4" /></>)}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;
