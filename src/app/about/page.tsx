import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import CTASection from "@/components/CTASection";
import RevealHeading from "@/components/RevealHeading";
import StepItem from "@/components/StepItem";

export const metadata: Metadata = {
  title: "About Scalevium | Senior Tech Talent & Managed Engineering Pods",
  description:
    "Scalevium gives technology leaders senior engineering capacity without the risk, delay, or legal liability of domestic hiring — through vetting and managed pods.",
  alternates: {
    canonical: "https://scalevium.com/about",
  },
  openGraph: {
    title: "About Scalevium | Senior Tech Talent & Managed Engineering Pods",
    description:
      "Scalevium gives technology leaders senior engineering capacity without the risk, delay, or legal liability of domestic hiring — through vetting and managed pods.",
    url: "https://scalevium.com/about",
    siteName: "Scalevium",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "About Scalevium" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Scalevium | Senior Tech Talent & Managed Engineering Pods",
    description:
      "Scalevium gives technology leaders senior engineering capacity without the risk, delay, or legal liability of domestic hiring — through vetting and managed pods.",
    images: ["/og-image.jpg"],
  },
};

const aboutSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://scalevium.com" },
        { "@type": "ListItem", position: 2, name: "About", item: "https://scalevium.com/about" },
      ],
    },
    {
      "@type": "AboutPage",
      name: "About Scalevium",
      description:
        "Scalevium connects ambitious enterprises with senior technology talent and builds custom AI, cloud, and full-stack software solutions with uncompromised precision.",
      url: "https://scalevium.com/about",
    },
  ],
};

const STORY = [
  { num: "01", title: "The problem", desc: "Hiring senior engineers domestically is slow and expensive; hiring offshore without a system is risky. Most companies pick one bad trade-off or the other." },
  { num: "02", title: "The model", desc: "We built two tracks instead of one: staff augmentation for teams that just need capacity, and a fully managed pod — led by a Fractional CTO — for teams that need the outcome, not the management burden." },
  { num: "03", title: "Today", desc: "A five-stage vetting funnel, a documented delivery playbook, and a contract and compliance stack reviewed by counsel — running both tracks side by side." },
];

const VALUES = [
  { num: "01", title: "We win on vetting, not price", description: "If a deal is only winnable by being the cheapest option, we walk away — a below-floor engagement costs the same management time as a profitable one." },
  { num: "02", title: "Numbers tell you where to look", description: "Telemetry starts a conversation about performance. It never, on its own, ends someone's engagement — that takes a documented conversation." },
  { num: "03", title: "A clean exit is a sales asset", description: "Full source, credentials, documentation, and a knowledge-transfer session on every closure. Clients who leave well come back, and they refer." },
  { num: "04", title: "The pay-date guarantee is sacred", description: "Engineers are paid on the 5th of every month regardless of whether a client has paid us yet. We have never treated this as optional." },
];

const ROLES = [
  { title: "Founder / CEO", desc: "Strategy, final pricing authority, key client relationships, and the only person who may approve a below-floor engagement." },
  { title: "Fractional CTO", desc: "Sets the technical bar, leads every managed pod as the client's single conduit, and owns architecture and the delivery roadmap." },
  { title: "Delivery Manager", desc: "Owns staff-augmentation placements end to end — kickoff, overlap agreements, pulse checks, replacements, and renewals." },
  { title: "Talent Acquisition", desc: "Runs the five-stage vetting funnel, sourcing, and bench management. Owns time-to-placement." },
  { title: "Finance & Operations", desc: "Rate card, invoicing, collections, contractor pay runs, sanctions screening, and the cash reserve that funds the pay-date guarantee." },
];

export default function AboutPage() {
  return (
    <div style={{ position: "relative", zIndex: 3 }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <section className="section-pad-hero">
        <div className="container">
          <h1 className="sr-only">Crafted For Velocity. Built For Endurance.</h1>
          <RevealHeading tag="span" aria-hidden="true" className="hero-title" style={{ maxWidth: "60rem", fontSize: "clamp(2.6rem, 6vw, 5.5rem)", marginBottom: 0 }} text="Crafted For Velocity." />
          <RevealHeading tag="span" aria-hidden="true" className="hero-title" style={{ maxWidth: "60rem", fontSize: "clamp(2.6rem, 6vw, 5.5rem)", color: "var(--accent-light)" }} delay={0.22} text="Built For Endurance." />

          <div style={{ marginTop: "3.75rem" }} className="grid-responsive-2">
            <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "1.75rem" }}>
              <span className="eyebrow-minimal">OUR MISSION</span>
              <p style={{ fontSize: "1.125rem", lineHeight: 1.6, fontWeight: 500, color: "var(--text-primary)" }}>
                Give technology leaders senior engineering capacity without the cost, delay, or legal liability of hiring domestically.
              </p>
            </div>
            <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "1.75rem" }}>
              <span className="eyebrow-minimal">HOW WE DO IT</span>
              <p style={{ fontSize: "1.125rem", lineHeight: 1.6, fontWeight: 500, color: "var(--text-primary)" }}>
                Either by placing individually vetted engineers under your management, or by building and running a whole team for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad-standard" style={{ borderTop: "1px solid var(--border-subtle)" }}>
        <div className="container">
          <ScrollReveal>
            <span className="eyebrow-minimal">OUR TRAJECTORY</span>
          </ScrollReveal>
          <RevealHeading tag="h2" className="section-heading-editorial" style={{ marginBottom: "2.5rem" }} text="Our Story" />
          {STORY.map((s) => (
            <div key={s.num} style={{ display: "flex", gap: "2rem", padding: "2rem 0", borderBottom: "1px solid var(--border-subtle)" }} className="story-row">
              <div style={{ fontSize: "2.2rem", fontWeight: 300, color: "var(--text-subtle)", minWidth: "4.375rem" }}>{s.num}</div>
              <div>
                <h3 style={{ fontSize: "1.375rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.5rem" }}>{s.title}</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9375rem", lineHeight: 1.65, maxWidth: "37.5rem" }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-pad-standard" style={{ borderTop: "1px solid var(--border-subtle)" }}>
        <div className="container">
          <ScrollReveal>
            <span className="eyebrow-minimal">GUIDING PRINCIPLES</span>
          </ScrollReveal>
          <RevealHeading tag="h2" className="section-heading-editorial" style={{ marginBottom: "3.125rem" }} text="How We Operate" accentFrom={1} />
          <div className="grid-responsive-2">
            {VALUES.map((v) => (
              <ScrollReveal key={v.num}>
                <StepItem {...v} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad-standard" style={{ borderTop: "1px solid var(--border-subtle)" }}>
        <div className="container">
          <ScrollReveal>
            <span className="eyebrow-minimal">HOW WE'RE ORGANISED</span>
          </ScrollReveal>
          <RevealHeading tag="h2" className="section-heading-editorial" style={{ marginBottom: "2.75rem", maxWidth: "43.75rem" }} text="Five Roles, Clear Ownership." accentFrom={2} />
          <div>
            {ROLES.map((r) => (
              <div key={r.title} style={{ display: "flex", gap: "1.5rem", padding: "1.375rem 0", borderBottom: "1px solid var(--border-subtle)" }} className="role-row">
                <div style={{ minWidth: "12.5rem", fontSize: "0.9375rem", fontWeight: 600, color: "var(--text-primary)" }}>{r.title}</div>
                <div style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.6 }}>{r.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection heading="Build The Future With Scalevium." description="Connect with our technical team to discuss your engineering roadmap." primaryLabel="Start a Conversation" primaryHref="/contact" />

      <style>{`
        @media (max-width: 768px) {
          .story-row { flex-direction: column !important; gap: 0.75rem !important; }
          .role-row { flex-direction: column !important; gap: 0.375rem !important; }
        }
      `}</style>
    </div>
  );
}
