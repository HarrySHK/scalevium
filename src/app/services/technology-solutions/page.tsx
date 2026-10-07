import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import CTASection from "@/components/CTASection";
import RevealHeading from "@/components/RevealHeading";
import StepItem from "@/components/StepItem";
import Badge from "@/components/Badge";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Managed Engineering Pods & Fractional CTO Services | Scalevium",
  description:
    "Scalevium deploys dedicated, full-lifecycle engineering pods led by Fractional CTOs on agile two-week cadences with transparent executive reporting.",
  alternates: {
    canonical: "https://scalevium.com/services/technology-solutions",
  },
  openGraph: {
    title: "Managed Engineering Pods & Fractional CTO Services | Scalevium",
    description:
      "Scalevium deploys dedicated, full-lifecycle engineering pods led by Fractional CTOs on agile two-week cadences with transparent executive reporting.",
    url: "https://scalevium.com/services/technology-solutions",
    siteName: "Scalevium",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Scalevium Technology Solutions" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Managed Engineering Pods & Fractional CTO Services | Scalevium",
    description:
      "Scalevium deploys dedicated, full-lifecycle engineering pods led by Fractional CTOs on agile two-week cadences with transparent executive reporting.",
    images: ["/og-image.jpg"],
  },
};

const techSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://scalevium.com" },
        { "@type": "ListItem", position: 2, name: "Services", item: "https://scalevium.com/services" },
        { "@type": "ListItem", position: 3, name: "Technology Solutions", item: "https://scalevium.com/services/technology-solutions" },
      ],
    },
    {
      "@type": "Service",
      name: "Managed Engineering Pods & Fractional CTO Services",
      provider: {
        "@type": "Organization",
        name: "Scalevium",
        url: "https://scalevium.com",
      },
      serviceType: "Managed Software Development",
      description:
        "A complete managed engineering pod led by a Fractional CTO, delivering custom platforms on two-week sprints with executive reporting.",
      url: "https://scalevium.com/services/technology-solutions",
    },
  ],
};

const STAGES = [
  { num: "01", title: "Diagnostic Scoping Phase", description: "A paid 1–2 week phase ($5,000–$15,000, credited to month one) that produces a technical blueprint and roadmap before anything is built." },
  { num: "02", title: "Onboarding & Ramp", description: "Access provisioned, architecture and business alignment led by the Fractional CTO, executive reporting dashboard live." },
  { num: "03", title: "Trial", description: "First productive tickets merged and a risk-free trial window before the engagement is confirmed." },
  { num: "04", title: "Steady-State Delivery", description: "Two-week sprints, a weekly executive summary, and milestone demos — never a ticket board or standup invite for the client." },
  { num: "05", title: "Handover & Closure", description: "Full source, documentation, a knowledge-transfer session, and confirmed IP assignment on final payment." },
];

const INCLUDED = [
  "A Fractional CTO / Technical Product Manager as your single point of contact",
  "An agile retainer, never a fixed-price, fixed-scope build",
  "Weekly executive summaries and milestone demos instead of daily standups",
  "A documented Definition of Ready and Definition of Done on every story",
];

export default function TechnologySolutionsPage() {
  return (
    <div style={{ position: "relative", zIndex: 3 }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(techSchema) }}
      />
      <section className="section-pad-hero">
        <div className="container">
          <h1 className="sr-only">Technology Solutions: From Vision To Production.</h1>
          <span className="eyebrow-minimal" aria-hidden="true">TECHNOLOGY SOLUTIONS</span>
          <RevealHeading tag="span" aria-hidden="true" className="hero-title" style={{ maxWidth: "60rem", fontSize: "clamp(2.6rem, 6vw, 5.5rem)", marginBottom: 0 }} text="From Vision" />
          <RevealHeading tag="span" aria-hidden="true" className="hero-title" style={{ maxWidth: "60rem", fontSize: "clamp(2.6rem, 6vw, 5.5rem)", color: "var(--accent-light)" }} delay={0.22} text="To Production." />
          <p className="section-sub-editorial" style={{ marginTop: "1.75rem", maxWidth: "38.75rem" }}>
            A complete engineering pod we hire and lead — you get a single technical point of contact and a working product, not a headcount problem.
          </p>
        </div>
      </section>

      <section className="section-pad-standard" style={{ borderTop: "1px solid var(--border-subtle)" }}>
        <div className="container">
          <ScrollReveal>
            <span className="eyebrow-minimal">WHAT'S INCLUDED</span>
          </ScrollReveal>
          <RevealHeading tag="h2" className="section-heading-editorial" style={{ marginBottom: "2.25rem", maxWidth: "43.75rem" }} text="The Pod Owns Delivery, Not Just Tickets." accentFrom={3} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            {INCLUDED.map((line) => (
              <div key={line} style={{ display: "flex", gap: "1rem", padding: "1.125rem 0", borderBottom: "1px solid var(--border-subtle)" }}>
                <Check size={16} color="var(--accent-light)" style={{ flexShrink: 0, marginTop: 2 }} />
                <span style={{ fontSize: "0.9375rem", color: "var(--text-primary)" }}>{line}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad-standard" style={{ borderTop: "1px solid var(--border-subtle)" }}>
        <div className="container">
          <ScrollReveal>
            <span className="eyebrow-minimal">DELIVERY PIPELINE</span>
          </ScrollReveal>
          <RevealHeading tag="h2" className="section-heading-editorial" style={{ marginBottom: "3.75rem" }} text="Five Stages, Defined Exit Criteria." accentFrom={2} />
          <div className="responsive-timeline-container">
            <div className="responsive-timeline-line" />
            <div style={{ display: "flex", flexDirection: "column", gap: "2.75rem" }}>
              {STAGES.map((s) => (
                <ScrollReveal key={s.num}>
                  <StepItem {...s} variant="timeline" />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad-standard" style={{ borderTop: "1px solid var(--border-subtle)" }}>
        <div className="container">
          <ScrollReveal>
            <span className="eyebrow-minimal">ENGINEERING BAR</span>
          </ScrollReveal>
          <RevealHeading tag="h2" className="section-heading-editorial" style={{ marginBottom: "1.75rem", maxWidth: "43.75rem" }} text='Nothing is "done" on a laptop.' accentFrom={3} />
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {["Code reviewed & merged", "Tests written and passing", "CI green", "Documentation updated", "Security checkpoints", "Deployed to the agreed environment"].map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
        </div>
      </section>

      <CTASection heading="Deploy A Pod, Not A Headcount Problem." description="Start with a paid Diagnostic Scoping Phase — it's billable either way, and it tells you exactly what to build." primaryHref="/contact" />
    </div>
  );
}
