import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import CTASection from "@/components/CTASection";
import RevealHeading from "@/components/RevealHeading";
import EditorialRow from "@/components/EditorialRow";
import Badge from "@/components/Badge";

export const metadata: Metadata = {
  title: "Full-Stack Engineering & Cloud Systems Development | Scalevium",
  description:
    "Modern web platforms, microservices, and distributed cloud systems engineered on two-week cadences with continuous integration and verified test coverage.",
  alternates: {
    canonical: "https://scalevium.com/services/full-stack-development",
  },
  openGraph: {
    title: "Full-Stack Engineering & Cloud Systems Development | Scalevium",
    description:
      "Modern web platforms, microservices, and distributed cloud systems engineered on two-week cadences with continuous integration and verified test coverage.",
    url: "https://scalevium.com/services/full-stack-development",
    siteName: "Scalevium",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Scalevium Full-Stack Engineering" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Full-Stack Engineering & Cloud Systems Development | Scalevium",
    description:
      "Modern web platforms, microservices, and distributed cloud systems engineered on two-week cadences with continuous integration and verified test coverage.",
    images: ["/og-image.jpg"],
  },
};

const fullStackSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://scalevium.com" },
        { "@type": "ListItem", position: 2, name: "Services", item: "https://scalevium.com/services" },
        { "@type": "ListItem", position: 3, name: "Full-Stack Development", item: "https://scalevium.com/services/full-stack-development" },
      ],
    },
    {
      "@type": "Service",
      name: "Full-Stack Engineering & Cloud Systems Development",
      provider: {
        "@type": "Organization",
        name: "Scalevium",
        url: "https://scalevium.com",
      },
      serviceType: "Full-Stack Web & Cloud Development",
      description:
        "Modern, maintainable platforms and distributed cloud systems delivered on two-week sprints with rigorous code review and automated CI/CD.",
      url: "https://scalevium.com/services/full-stack-development",
    },
  ],
};

const CAPABILITIES = [
  { title: "Modern Web Platforms", desc: "High-performance frontends and APIs built on a short-lived-branch, protected-main workflow — no direct commits to main." },
  { title: "Distributed Backend Systems", desc: "Microservices and resilient codebases with dev/staging/production separation and secrets kept out of code and chat." },
  { title: "Infrastructure as Code", desc: "Reproducible cloud infrastructure, least-privilege access, and a documented release and rollback procedure." },
  { title: "Test & Release Discipline", desc: "Unit, integration, and regression coverage — a 70% default target on core services, adjusted per client." },
];

const DEFINITION_OF_DONE = ["Code reviewed and merged", "Tests written and passing", "CI green", "Documentation updated", "Acceptance criteria met", "Deployed to the agreed environment"];

export default function FullStackDevelopmentPage() {
  return (
    <div style={{ position: "relative", zIndex: 3 }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(fullStackSchema) }}
      />
      <section className="section-pad-hero">
        <div className="container">
          <h1 className="sr-only">Full-Stack Engineering: Software Built To Ship, Not Just Demo.</h1>
          <span className="eyebrow-minimal" aria-hidden="true">FULL-STACK ENGINEERING</span>
          <RevealHeading tag="span" aria-hidden="true" className="hero-title" style={{ maxWidth: "60rem", fontSize: "clamp(2.6rem, 6vw, 5.5rem)", marginBottom: 0 }} text="Software Built" />
          <RevealHeading tag="span" aria-hidden="true" className="hero-title" style={{ maxWidth: "60rem", fontSize: "clamp(2.6rem, 6vw, 5.5rem)", color: "var(--accent-light)" }} delay={0.22} text="To Ship, Not Just Demo." />
          <p className="section-sub-editorial" style={{ marginTop: "1.75rem", maxWidth: "38.75rem" }}>
            Modern, maintainable platforms delivered on two-week sprints, with nothing marked "done" until it's merged, tested, documented, and deployed.
          </p>
        </div>
      </section>

      <section className="section-pad-standard" style={{ borderTop: "1px solid var(--border-subtle)" }}>
        <div className="container">
          <ScrollReveal>
            <span className="eyebrow-minimal">CAPABILITIES</span>
          </ScrollReveal>
          <RevealHeading tag="h2" className="section-heading-editorial" style={{ marginBottom: "2.5rem" }} text="What We Build" accentFrom={1} />
          <div style={{ borderTop: "1px solid var(--border-subtle)" }}>
            {CAPABILITIES.map((s) => (
              <EditorialRow key={s.title} title={s.title} description={s.desc} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad-standard" style={{ borderTop: "1px solid var(--border-subtle)" }}>
        <div className="container">
          <ScrollReveal>
            <span className="eyebrow-minimal">DEFINITION OF DONE</span>
          </ScrollReveal>
          <RevealHeading tag="h2" className="section-heading-editorial" style={{ marginBottom: "1.75rem", maxWidth: "43.75rem" }} text="A Story Is Done Only When All Of This Is True." accentFrom={5} />
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {DEFINITION_OF_DONE.map((t) => (
              <Badge key={t} tone="success">
                {t}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <CTASection heading="Ship The Next Version Of Your Product." description="Tell us your stack and timeline — we'll tell you what a sprint with us looks like." primaryHref="/contact" />
    </div>
  );
}
