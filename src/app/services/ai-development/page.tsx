import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import CTASection from "@/components/CTASection";
import RevealHeading from "@/components/RevealHeading";
import EditorialRow from "@/components/EditorialRow";
import AISolutionsByIndustry from "@/components/AISolutionsByIndustry";
import Badge from "@/components/Badge";

export const metadata: Metadata = {
  title: "Enterprise AI Development & Autonomous Agents | Scalevium",
  description:
    "Scalevium builds production AI architectures, autonomous agents, and enterprise RAG pipelines with private data isolation and strict engineering review.",
  alternates: {
    canonical: "https://scalevium.com/services/ai-development",
  },
  openGraph: {
    title: "Enterprise AI Development & Autonomous Agents | Scalevium",
    description:
      "Scalevium builds production AI architectures, autonomous agents, and enterprise RAG pipelines with private data isolation and strict engineering review.",
    url: "https://scalevium.com/services/ai-development",
    siteName: "Scalevium",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Scalevium AI Development" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Enterprise AI Development & Autonomous Agents | Scalevium",
    description:
      "Scalevium builds production AI architectures, autonomous agents, and enterprise RAG pipelines with private data isolation and strict engineering review.",
    images: ["/og-image.jpg"],
  },
};

const aiSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://scalevium.com" },
        { "@type": "ListItem", position: 2, name: "Services", item: "https://scalevium.com/services" },
        { "@type": "ListItem", position: 3, name: "AI Development", item: "https://scalevium.com/services/ai-development" },
      ],
    },
    {
      "@type": "Service",
      name: "Enterprise AI Development & Autonomous Agents",
      provider: {
        "@type": "Organization",
        name: "Scalevium",
        url: "https://scalevium.com",
      },
      serviceType: "Artificial Intelligence Engineering",
      description:
        "Design and deployment of production-grade AI architectures, autonomous agents, and enterprise RAG pipelines with strict security controls.",
      url: "https://scalevium.com/services/ai-development",
    },
  ],
};

const AI_SERVICES = [
  { title: "Generative AI Systems", desc: "Custom generative applications and fine-tuned model integrations, reviewed with the same rigour as any production code." },
  { title: "Autonomous AI Agents", desc: "Multi-step reasoning agents for operational tasks — built on approved enterprise-tier tooling only, never personal AI accounts." },
  { title: "Production LLM Products", desc: "High-frequency reasoning and search products engineered for scale, with security and dependency checks on every AI-assisted change." },
  { title: "Enterprise RAG Architectures", desc: "Retrieval-augmented pipelines grounded in your private data — client data is never used to train any model, and never reused across clients." },
  { title: "Intelligent Process Automation", desc: "Replacing manual bottlenecks with automated decision and routing systems." },
  { title: "AI Calling & Voice Agents", desc: "Automated outbound and inbound call agents — booking, qualification, and follow-up — orchestrated on n8n and wired into your CRM and telephony stack." },
  { title: "Document & Unstructured Data Mining", desc: "Structured extraction from PDFs, contracts, and audio at production quality." },
];

export default function AIDevelopmentPage() {
  return (
    <div style={{ position: "relative", zIndex: 3 }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aiSchema) }}
      />
      <section className="section-pad-hero">
        <div className="container">
          <h1 className="sr-only">Artificial Intelligence: Intelligent Systems. Built For Scale.</h1>
          <span className="eyebrow-minimal" aria-hidden="true">ARTIFICIAL INTELLIGENCE</span>
          <RevealHeading tag="span" aria-hidden="true" className="hero-title" style={{ maxWidth: "60rem", fontSize: "clamp(2.6rem, 6vw, 5.5rem)", marginBottom: 0 }} text="Intelligent Systems." />
          <RevealHeading tag="span" aria-hidden="true" className="hero-title" style={{ maxWidth: "60rem", fontSize: "clamp(2.6rem, 6vw, 5.5rem)", color: "var(--accent-light)" }} delay={0.22} text="Built For Scale." />
          <p className="section-sub-editorial" style={{ marginTop: "1.75rem", maxWidth: "38.75rem" }}>
            We design and deploy production-grade AI architectures, autonomous agents, and RAG pipelines — held to the same review bar as everything else we ship.
          </p>
        </div>
      </section>

      <section className="section-pad-standard" style={{ borderTop: "1px solid var(--border-subtle)" }}>
        <div className="container">
          <ScrollReveal>
            <span className="eyebrow-minimal">AI CAPABILITIES</span>
          </ScrollReveal>
          <RevealHeading tag="h2" className="section-heading-editorial" style={{ marginBottom: "2.5rem" }} text="Specialised AI Solutions" accentFrom={1} />
          <div style={{ borderTop: "1px solid var(--border-subtle)" }}>
            {AI_SERVICES.map((s) => (
              <EditorialRow key={s.title} title={s.title} description={s.desc} />
            ))}
          </div>
        </div>
      </section>

      <AISolutionsByIndustry />

      <section className="section-pad-standard" style={{ borderTop: "1px solid var(--border-subtle)" }}>
        <div className="container">
          <ScrollReveal>
            <span className="eyebrow-minimal">AI GOVERNANCE</span>
          </ScrollReveal>
          <RevealHeading tag="h2" className="section-heading-editorial" style={{ marginBottom: "1.75rem", maxWidth: "43.75rem" }} text="AI-Assisted, Never AI-Unsupervised." accentFrom={1} />
          <p className="section-sub-editorial" style={{ marginBottom: "1.75rem", maxWidth: "40rem" }}>
            AI-generated code gets the same or greater review rigour as human code — security, dependency, and licence checks included. We treat AI output like a capable junior engineer's work: useful, and not trusted by default.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {["Enterprise-tier tools only", "No training on your code", "Material AI contributions flagged", "Same review bar as human code"].map((t) => (
              <Badge key={t} tone="accent">
                {t}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <CTASection heading="Deploy AI Into Production." description="Connect with our team to evaluate your data and use cases — minimum engagement size is $8,000/month." primaryLabel="Start an AI Project" primaryHref="/contact" />
    </div>
  );
}
