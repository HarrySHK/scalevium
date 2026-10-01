import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import CTASection from "@/components/CTASection";
import RevealHeading from "@/components/RevealHeading";
import EditorialRow from "@/components/EditorialRow";
import ComparisonTable from "@/components/ComparisonTable";

export const metadata: Metadata = {
  title: "Software Engineering · Scalevium",
  description:
    "Web, mobile, backend and cloud engineering for production platforms — plus AI services and staff augmentation when you need extra capacity.",
  alternates: {
    canonical: "https://scalevium.com/services",
  },
  openGraph: {
    title: "Software Engineering · Scalevium",
    description:
      "Web, mobile, backend and cloud engineering for production platforms — plus AI services and staff augmentation when you need extra capacity.",
    url: "https://scalevium.com/services",
    siteName: "Scalevium",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Scalevium Services" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Software Engineering · Scalevium",
    description:
      "Web, mobile, backend and cloud engineering for production platforms — plus AI services and staff augmentation when you need extra capacity.",
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
  { title: "AI Services", desc: "Voice agents, AI automation, chat assistants, knowledge AI, integration, and strategy — connected to the tools you already use.", path: "/services/ai-development" },
  { title: "Web & Full-Stack Engineering", desc: "Web platforms your team and customers rely on every day — SaaS, dashboards, portals, and internal tools.", path: "/services/full-stack-development" },
  { title: "Managed Engineering Pod", desc: "A complete team we hire and lead — scoping, sprints, and delivery with a Fractional CTO as your single contact.", path: "/services/technology-solutions" },
  { title: "Staff Augmentation", desc: "Senior engineers join your team under your technical lead — placement often within 48 hours of approval.", path: "/services/talent-solutions" },
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
          <h1 className="sr-only">Software Engineering: Web, Mobile And Backend Products Built For Production.</h1>
          <span className="eyebrow-minimal" aria-hidden="true">SOFTWARE ENGINEERING</span>
          <RevealHeading tag="span" aria-hidden="true" className="hero-title" style={{ maxWidth: "60rem", fontSize: "clamp(2.6rem, 6vw, 5.5rem)", marginBottom: 0 }} text="Web, Mobile And Backend" />
          <RevealHeading tag="span" aria-hidden="true" className="hero-title" style={{ maxWidth: "60rem", fontSize: "clamp(2.6rem, 6vw, 5.5rem)", color: "var(--accent-light)" }} delay={0.22} text="Products Built For Production." />
          <p className="section-sub-editorial" style={{ marginTop: "1.75rem", maxWidth: "37.5rem" }}>
            We design and build complete platforms, and the integrations and infrastructure that keep them running. Start with AI services if that is what you need first.
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
            <span className="eyebrow-minimal">ENGAGEMENT OPTIONS</span>
          </ScrollReveal>
          <RevealHeading tag="h2" className="section-heading-editorial" style={{ marginBottom: "2.5rem", maxWidth: "43.75rem" }} text="Build With Us Or Extend Your Team." accentFrom={1} />
          <ScrollReveal>
            <ComparisonTable
              columns={["Staff Augmentation", "Managed Pod"]}
              rows={[
                { label: "Best for", values: ["Teams with a technical lead who need capacity", "Leaders who want delivery owned end to end"] },
                { label: "What you get", values: ["Vetted engineers embedded in your team", "A full pod led by a Fractional CTO"] },
                { label: "Typical start", values: ["Often within 48 hours of approval", "Discovery and a scoped delivery plan"] },
                { label: "AI vs software", values: ["Either — engineers join your roadmap", "Either — we ship AI or product work for you"] },
              ]}
            />
          </ScrollReveal>
        </div>
      </section>

      <CTASection
        heading="Start Your Project."
        description="Tell us what you want AI or software to handle — we reply within one business day."
        primaryLabel="Book a free AI consultation"
        primaryHref="/contact"
      />
    </div>
  );
}
