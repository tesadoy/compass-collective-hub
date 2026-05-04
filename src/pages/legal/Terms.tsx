import Seo from "@/components/Seo";

const Terms = () => (
  <section className="container-tight py-20">
    <Seo
      title="Terms of Service"
      description="Terms governing the use of the TESADOY DYNAMICS website and client portal."
      path="/legal/terms"
    />
    <div className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Legal</p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">Terms of Service</h1>
      <p className="mt-3 text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

      <div className="prose prose-neutral mt-10 max-w-none text-foreground">
        <h2 className="font-display text-xl font-semibold mt-10">1. Acceptance</h2>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          By accessing this website or our client portal, you agree to these terms. If you do not
          agree, please discontinue use.
        </p>

        <h2 className="font-display text-xl font-semibold mt-8">2. Services</h2>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          TESADOY DYNAMICS provides procurement, construction, interior design, logistics, private
          equity, agriculture and consulting services. Specific scope, deliverables and fees are
          governed by a separate written agreement.
        </p>

        <h2 className="font-display text-xl font-semibold mt-8">3. Use of the Portal</h2>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          You are responsible for safeguarding your account credentials. Do not share access. Notify
          us immediately of any unauthorized use.
        </p>

        <h2 className="font-display text-xl font-semibold mt-8">4. Intellectual Property</h2>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          All content on this site — text, imagery, logos, and code — is owned by TESADOY DYNAMICS
          or its licensors and may not be reproduced without written permission.
        </p>

        <h2 className="font-display text-xl font-semibold mt-8">5. Disclaimer</h2>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          The website is provided "as is" without warranties of any kind. We are not liable for
          indirect, incidental, or consequential damages arising from its use.
        </p>

        <h2 className="font-display text-xl font-semibold mt-8">6. Governing Law</h2>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          These terms are governed by the laws of the jurisdiction where TESADOY DYNAMICS is
          headquartered, without regard to conflict-of-law principles.
        </p>

        <h2 className="font-display text-xl font-semibold mt-8">7. Contact</h2>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          For questions, write to{" "}
          <a href="mailto:hello@tesadoy.com" className="underline">hello@tesadoy.com</a>.
        </p>
      </div>
    </div>
  </section>
);

export default Terms;
