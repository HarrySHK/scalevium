import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import CTASection from "@/components/CTASection";
import RevealHeading from "@/components/RevealHeading";
import EditorialRow from "@/components/EditorialRow";
import StepItem from "@/components/StepItem";

export const metadata: Metadata = {
  title: "Hire Senior Software Engineers | 48-Hour Placement | Scalevium",
  description:
    "Scalevium places pre-vetted senior developers and engineering specialists into your team within 48 hours, backed by a risk-free trial and replacement guarantee.",
  alternates: {
    canonical: "https://scalevium.com/services/talent-solutions",
  },
  openGraph: {
    title: "Hire Senior Software Engineers | 48-Hour Placement | Scalevium",
    description:
      "Scalevium places pre-vetted senior developers and engineering specialists into your team within 48 hours, backed by a risk-free trial and replacement guarantee.",
    url: "https://scalevium.com/services/talent-solutions",
    siteName: "Scalevium",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Scalevium Talent Solutions" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hire Senior Software Engineers | 48-Hour Placement | Scalevium",
    description:
      "Scalevium places pre-vetted senior developers and engineering specialists into your team within 48 hours, backed by a risk-free trial and replacement guarantee.",
    images: ["/og-image.jpg"],
  },
};

const talentSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://scalevium.com" },
        { "@type": "ListItem", position: 2, name: "Services", item: "https://scalevium.com/services" },
        { "@type": "ListItem", position: 3, name: "Talent Solutions", item: "https://scalevium.com/services/talent-solutions" },
      ],
    },
    {
      "@type": "Service",
      name: "Engineering Talent Solutions & Staff Augmentation",
      provider: {
        "@type": "Organization",
        name: "Scalevium",
        url: "https://scalevium.com",
      },
      serviceType: "Staff Augmentation",
      description:
        "Hire vetted senior software engineers who join your team under your management — placed within 48 hours with a risk-free trial and replacement guarantee.",
      url: "https://scalevium.com/services/talent-solutions",
    },
  ],
};

const ROLES = [
  "Frontend Software Engineers",
  "Backend Systems Engineers",
  "Full-Stack Developers",
  "AI / Machine Learning Researchers",
  "Data & Platform Engineers",
  "Cloud & DevOps Architects",
  "Mobile App Engineers",
  "QA & Test Automation Engineers",
  "Product Designers & UX Architects",
];

const PROCESS = [
  { num: "01", title: "Requirement Mapping", description: "A discovery call maps the role, stack, seniority, region, and daily overlap you need — minimum engagement size is $8,000/month." },
  { num: "02", title: "Precision Vetting", description: "Five gates: an AI screen, a live proctored coding challenge, a structured behavioural interview, identity verification, and a background check." },
  { num: "03", title: "Squad Integration", description: "Placement within 48 hours of an approved order, with a minimum 4-hour daily overlap window and a risk-free first 1–2 weeks." },
];

const RATE_TABLE = [
  { region: "South Asia (Pakistan, India)", junior: "$28/hr", mid: "$40/hr", senior: "$58/hr", lead: "$75/hr" },
  { region: "Southeast Asia", junior: "$28/hr", mid: "$42/hr", senior: "$60/hr", lead: "$78/hr" },
  { region: "Latin America", junior: "$45/hr", mid: "$65/hr", senior: "$90/hr", lead: "$115/hr" },
  { region: "Eastern Europe", junior: "$45/hr", mid: "$68/hr", senior: "$95/hr", lead: "$120/hr" },
];

export default function TalentSolutionsPage() {
  return (
    <div style={{ position: "relative", zIndex: 3 }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(talentSchema) }}
      />
      <section className="section-pad-hero">
        <div className="container">
          <h1 className="sr-only">Staff Augmentation: Extend Your Team Without Adding Headcount.</h1>
          <span className="eyebrow-minimal" aria-hidden="true">STAFF AUGMENTATION</span>
          <RevealHeading tag="span" aria-hidden="true" className="hero-title" style={{ maxWidth: "60rem", fontSize: "clamp(2.6rem, 6vw, 5.5rem)", marginBottom: 0 }} text="Extend Your Team" />
          <RevealHeading tag="span" aria-hidden="true" className="hero-title" style={{ maxWidth: "60rem", fontSize: "clamp(2.6rem, 6vw, 5.5rem)", color: "var(--accent-light)" }} delay={0.22} text="Without Adding Headcount." />
          <p className="section-sub-editorial" style={{ marginTop: "1.75rem", maxWidth: "38.75rem" }}>
            Senior engineers join your team, work under your technical lead, and follow your process. Placement often happens within 48 hours of approval.
          </p>
        </div>
      </section>

      <section className="section-pad-standard" style={{ borderTop: "1px solid var(--border-subtle)" }}>
        <div className="container">
          <ScrollReveal>
            <span className="eyebrow-minimal">SPECIALISATIONS</span>
          </ScrollReveal>
          <RevealHeading tag="h2" className="section-heading-editorial" style={{ marginBottom: "2.5rem" }} text="Roles We Embed" accentFrom={1} />
          <div style={{ borderTop: "1px solid var(--border-subtle)" }}>
            {ROLES.map((role, idx) => (
              <EditorialRow key={role} index={`0${idx + 1}`} title={role} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad-standard" style={{ borderTop: "1px solid var(--border-subtle)" }}>
        <div className="container">
          <ScrollReveal>
            <span className="eyebrow-minimal">INDICATIVE RATE CARD</span>
          </ScrollReveal>
          <RevealHeading tag="h2" className="section-heading-editorial" style={{ marginBottom: "0.75rem", maxWidth: "43.75rem" }} text="Hourly Bill Rate By Region & Seniority." accentFrom={3} />
          <p className="section-sub-editorial" style={{ marginBottom: "2rem", maxWidth: "37.5rem" }}>
            Directional launch figures — actual rates are set per engineer, stack, and country at hire time. Scarce skills (AI/ML, security, senior data/platform) carry a 30–50% premium.
          </p>
          <div className="responsive-table-wrapper" role="region" aria-label="Indicative hourly bill rates by region and seniority" tabIndex={0}>
            <div style={{ minWidth: "35rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr 1fr", background: "var(--bg-surface)" }}>
                {["Region", "Junior", "Mid", "Senior", "Lead / Architect"].map((h) => (
                  <div key={h} style={{ padding: "0.875rem 1.125rem", fontSize: "0.71875rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--accent-light)" }}>
                    {h}
                  </div>
                ))}
              </div>
              {RATE_TABLE.map((r) => (
                <div key={r.region} style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr 1fr", borderTop: "1px solid var(--border-subtle)" }}>
                  <div style={{ padding: "0.875rem 1.125rem", fontSize: "0.84375rem", color: "var(--text-primary)", fontWeight: 600 }}>{r.region}</div>
                  <div style={{ padding: "0.875rem 1.125rem", fontSize: "0.84375rem", color: "var(--text-muted)" }}>{r.junior}</div>
                  <div style={{ padding: "0.875rem 1.125rem", fontSize: "0.84375rem", color: "var(--text-muted)" }}>{r.mid}</div>
                  <div style={{ padding: "0.875rem 1.125rem", fontSize: "0.84375rem", color: "var(--text-muted)" }}>{r.senior}</div>
                  <div style={{ padding: "0.875rem 1.125rem", fontSize: "0.84375rem", color: "var(--text-muted)" }}>{r.lead}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad-standard" style={{ borderTop: "1px solid var(--border-subtle)" }}>
        <div className="container">
          <ScrollReveal>
            <span className="eyebrow-minimal">ONBOARDING PIPELINE</span>
          </ScrollReveal>
          <RevealHeading tag="h2" className="section-heading-editorial" style={{ marginBottom: "3.125rem" }} text="Matching Process" />
          <div className="grid-responsive-3">
            {PROCESS.map((step) => (
              <ScrollReveal key={step.num}>
                <StepItem {...step} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection heading="Find Your Next Senior Engineer." description="Share your requirements and team composition — proposals typically go out within one business day." primaryLabel="Hire Senior Engineers" primaryHref="/contact" />
    </div>
  );
}
