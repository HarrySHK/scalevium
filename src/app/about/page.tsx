import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import CTASection from "@/components/CTASection";
import RevealHeading from "@/components/RevealHeading";
import StepItem from "@/components/StepItem";

export const metadata: Metadata = {
  title: "About Scalevium | AI Engineering Team",
  description:
    "Scalevium builds AI systems and the software around them for hospitality, healthcare, fitness, logistics, public safety, and SaaS — with production discipline after launch.",
  alternates: {
    canonical: "https://scalevium.com/about",
  },
  openGraph: {
    title: "About Scalevium | AI Engineering Team",
    description:
      "Scalevium builds AI systems and the software around them for hospitality, healthcare, fitness, logistics, public safety, and SaaS — with production discipline after launch.",
    url: "https://scalevium.com/about",
    siteName: "Scalevium",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "About Scalevium" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Scalevium | AI Engineering Team",
    description:
      "Scalevium builds AI systems and the software around them for hospitality, healthcare, fitness, logistics, public safety, and SaaS — with production discipline after launch.",
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
  { num: "01", title: "What we do", desc: "Scalevium Technologies Inc. builds AI agents, voice AI, and custom software that work inside the systems your business already uses." },
  { num: "02", title: "Who we serve", desc: "Hospitality, healthcare, fitness, logistics, public safety, and SaaS teams — 11 shipped projects across 10 industries, including HIPAA-conscious AI for healthcare clients." },
  { num: "03", title: "How we deliver", desc: "We start from the business problem, connect AI to real CRM, booking, and practice software, and stay with you after launch with monitoring, tuning, and support." },
];

const VALUES = [
  { num: "01", title: "Business-first", description: "We start from the business problem and judge the work by what it changes for you." },
  { num: "02", title: "AI plus full-stack", description: "Voice AI, agents, web, mobile, backend, and integrations from one team." },
  { num: "03", title: "Production discipline", description: "Review, CI, and integration checks on every build." },
  { num: "04", title: "Long-term partnership", description: "Monitoring, support, and improvement after launch — not a handoff and disappear." },
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
          <h1 className="sr-only">An AI Engineering Team That Stays With You After Launch.</h1>
          <RevealHeading tag="span" aria-hidden="true" className="hero-title" style={{ maxWidth: "60rem", fontSize: "clamp(2.6rem, 6vw, 5.5rem)", marginBottom: 0 }} text="An AI Engineering Team" />
          <RevealHeading tag="span" aria-hidden="true" className="hero-title" style={{ maxWidth: "60rem", fontSize: "clamp(2.6rem, 6vw, 5.5rem)", color: "var(--accent-light)" }} delay={0.22} text="That Stays After Launch." />

          <div style={{ marginTop: "3.75rem" }} className="grid-responsive-2">
            <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "1.75rem" }}>
              <span className="eyebrow-minimal">WHAT WE BUILD</span>
              <p style={{ fontSize: "1.125rem", lineHeight: 1.6, fontWeight: 500, color: "var(--text-primary)" }}>
                AI agents, voice AI, and custom software connected to the CRM, booking, and practice systems you already run.
              </p>
            </div>
            <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "1.75rem" }}>
              <span className="eyebrow-minimal">HOW WE WORK</span>
              <p style={{ fontSize: "1.125rem", lineHeight: 1.6, fontWeight: 500, color: "var(--text-primary)" }}>
                We start from the business problem, build with production discipline, and keep improving the system after it goes live.
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

      <CTASection heading="Tell Us What You Want AI To Handle." description="Book a free consultation — we reply within one business day." primaryLabel="Book a free AI consultation" primaryHref="/contact" />

      <style>{`
        @media (max-width: 768px) {
          .story-row { flex-direction: column !important; gap: 0.75rem !important; }
          .role-row { flex-direction: column !important; gap: 0.375rem !important; }
        }
      `}</style>
    </div>
  );
}
