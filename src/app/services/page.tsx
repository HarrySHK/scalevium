import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import CTASection from "@/components/CTASection";
import RevealHeading from "@/components/RevealHeading";
import EditorialRow from "@/components/EditorialRow";
import ComparisonTable from "@/components/ComparisonTable";

export const metadata: Metadata = {
  title: "Engineering Services & Capabilities | Staff Augmentation & AI Pods",
  description:
    "Scalevium provides two engagement models: staff augmentation with senior engineers in 48 hours, and fully managed engineering pods led by Fractional CTOs.",
  alternates: {
    canonical: "https://scalevium.com/services",
  },
  openGraph: {
    title: "Engineering Services & Capabilities | Staff Augmentation & AI Pods",
    description:
      "Scalevium provides two engagement models: staff augmentation with senior engineers in 48 hours, and fully managed engineering pods led by Fractional CTOs.",
    url: "https://scalevium.com/services",
    siteName: "Scalevium",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Scalevium Services" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering Services & Capabilities | Staff Augmentation & AI Pods",
    description:
      "Scalevium provides two engagement models: staff augmentation with senior engineers in 48 hours, and fully managed engineering pods led by Fractional CTOs.",
    images: ["/og-image.jpg"],
  },
};

const servicesSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://scalevium.com" },
        { "@type": "ListItem", position: 2, name: "Services", item: "https://scalevium.com/services" },
      ],
    },
    {
      "@type": "ItemList",
      name: "Scalevium Engineering Services",
      itemListElement: [
        {
          "@type": "Service",
          position: 1,
          name: "Talent Solutions",
          description: "Vetted senior engineers who join your team under your management — staff augmentation, done properly.",
          url: "https://scalevium.com/services/talent-solutions",
        },
        {
          "@type": "Service",
          position: 2,
          name: "Technology Solutions",
          description: "A complete managed engineering pod, led by a Fractional CTO, that owns delivery end to end.",
          url: "https://scalevium.com/services/technology-solutions",
        },
        {
          "@type": "Service",
          position: 3,
          name: "AI Development",
          description: "LLM integrations, agentic workflows, and RAG pipelines — reviewed with the same rigour as any production code.",
          url: "https://scalevium.com/services/ai-development",
        },
        {
          "@type": "Service",
          position: 4,
          name: "Full-Stack Development",
          description: "Modern web platforms and backend systems, delivered on two-week sprints with a written Definition of Done.",
          url: "https://scalevium.com/services/full-stack-development",
        },
      ],
    },
  ],
};

const SERVICES = [
  { title: "Talent Solutions", desc: "Vetted senior engineers who join your team under your management — staff augmentation, done properly.", path: "/services/talent-solutions" },
  { title: "Technology Solutions", desc: "A complete managed engineering pod, led by a Fractional CTO, that owns delivery end to end.", path: "/services/technology-solutions" },
  { title: "AI Development", desc: "LLM integrations, agentic workflows, and RAG pipelines — reviewed with the same rigour as any production code.", path: "/services/ai-development" },
  { title: "Full-Stack Development", desc: "Modern web platforms and backend systems, delivered on two-week sprints with a written Definition of Done.", path: "/services/full-stack-development" },
];

export default function ServicesPage() {
  return (
    <div style={{ position: "relative", zIndex: 3 }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      <section className="section-pad-hero">
        <div className="container">
          <h1 className="sr-only">Services & Capabilities: Talent & Technology. One Partner.</h1>
          <span className="eyebrow-minimal" aria-hidden="true">SERVICES & CAPABILITIES</span>
          <RevealHeading tag="span" aria-hidden="true" className="hero-title" style={{ maxWidth: "60rem", fontSize: "clamp(2.6rem, 6vw, 5.5rem)", marginBottom: 0 }} text="Talent & Technology." />
          <RevealHeading tag="span" aria-hidden="true" className="hero-title" style={{ maxWidth: "60rem", fontSize: "clamp(2.6rem, 6vw, 5.5rem)", color: "var(--accent-light)" }} delay={0.22} text="One Partner." />
          <p className="section-sub-editorial" style={{ marginTop: "1.75rem", maxWidth: "37.5rem" }}>
            Two ways to work with us, and two specialisations underneath them — pick the track that matches how much of the outcome you want to own.
          </p>
        </div>
      </section>

      <section className="section-pad-standard" style={{ paddingTop: 0 }}>
        <div className="container">
          <div style={{ borderTop: "1px solid var(--border-subtle)" }}>
            {SERVICES.map((s, i) => (
              <Link key={s.path} href={s.path} style={{ display: "block" }}>
                <EditorialRow index={`0${i + 1}`} title={s.title} description={s.desc} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad-standard" style={{ borderTop: "1px solid var(--border-subtle)" }}>
        <div className="container">
          <ScrollReveal>
            <span className="eyebrow-minimal">QUICK COMPARISON</span>
          </ScrollReveal>
          <RevealHeading tag="h2" className="section-heading-editorial" style={{ marginBottom: "2.5rem", maxWidth: "43.75rem" }} text="Which Track Fits?" accentFrom={1} />
          <ScrollReveal>
            <ComparisonTable
              columns={["Staff Augmentation", "Managed Pod"]}
              rows={[
                { label: "You have a technical lead", values: ["Good fit", "Optional"] },
                { label: "You want the outcome, not the management", values: ["—", "Good fit"] },
                { label: "Buyer", values: ["VP Eng, CTO, Eng Manager", "Non-technical founder or busy CEO"] },
                { label: "Pricing", values: ["Hourly / monthly retainer", "Retainer + Fractional CTO layer"] },
              ]}
            />
          </ScrollReveal>
        </div>
      </section>

      <CTASection
        heading="Discuss Your Project Needs."
        description="Connect with our team to review your technical requirements — most proposals go out within one to two business days."
        primaryLabel="Start a Conversation"
        primaryHref="/contact"
      />
    </div>
  );
}
