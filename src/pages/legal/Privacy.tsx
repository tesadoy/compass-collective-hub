import Seo from "@/components/Seo";

const Privacy = () => (
  <section className="container-tight py-20">
    <Seo
      title="Privacy Policy"
      description="How TESADOY DYNAMICS collects, uses and protects your personal information."
      path="/legal/privacy"
    />
    <div className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Legal</p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">Privacy Policy</h1>
      <p className="mt-3 text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

      <div className="prose prose-neutral mt-10 max-w-none text-foreground">
        <h2 className="font-display text-xl font-semibold mt-10">1. Introduction</h2>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          TESADOY DYNAMICS ("we", "us", "our") respects your privacy. This policy explains what
          information we collect through our website and client portal, how we use it, and the
          choices you have.
        </p>

        <h2 className="font-display text-xl font-semibold mt-8">2. Information We Collect</h2>
        <ul className="mt-3 space-y-2 text-muted-foreground leading-relaxed list-disc pl-5">
          <li><strong>Contact information</strong> you submit via forms (name, email, company, message).</li>
          <li><strong>Account information</strong> for the client portal (email, authentication tokens).</li>
          <li><strong>Project documents</strong> you upload or that we share with you.</li>
          <li><strong>Usage data</strong> (pages visited, device, browser) collected via privacy-friendly analytics.</li>
        </ul>

        <h2 className="font-display text-xl font-semibold mt-8">3. How We Use It</h2>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          We use your data to respond to inquiries, deliver contracted services, manage the client
          portal, comply with legal obligations, and improve our website.
        </p>

        <h2 className="font-display text-xl font-semibold mt-8">4. Sharing</h2>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          We do not sell personal data. We share information only with vetted service providers
          (hosting, authentication, email delivery) who process it on our behalf, or where required
          by law.
        </p>

        <h2 className="font-display text-xl font-semibold mt-8">5. Security</h2>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          We apply technical and organizational measures including encryption in transit, role-based
          access controls and row-level security on our database.
        </p>

        <h2 className="font-display text-xl font-semibold mt-8">6. Your Rights</h2>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          You may request access, correction or deletion of your data, or withdraw consent, by
          emailing <a href="mailto:hello@tesadoy.com" className="underline">hello@tesadoy.com</a>.
        </p>

        <h2 className="font-display text-xl font-semibold mt-8">7. Contact</h2>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          Questions about this policy? Reach us at{" "}
          <a href="mailto:hello@tesadoy.com" className="underline">hello@tesadoy.com</a>.
        </p>
      </div>
    </div>
  </section>
);

export default Privacy;
