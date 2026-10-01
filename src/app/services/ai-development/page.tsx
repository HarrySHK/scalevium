import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import CTASection from "@/components/CTASection";
import RevealHeading from "@/components/RevealHeading";
import EditorialRow from "@/components/EditorialRow";
import AISolutionsByIndustry from "@/components/AISolutionsByIndustry";
import Badge from "@/components/Badge";

export const metadata: Metadata = {
  title: "AI Services · Scalevium",
  description:
    "Voice agents, AI automation, chat assistants, knowledge AI and AI integration — built and supported by Scalevium, connected to your existing systems.",
  alternates: {
    canonical: "https://scalevium.com/services/ai-development",
  },
  openGraph: {
    title: "AI Services · Scalevium",
    description:
      "Voice agents, AI automation, chat assistants, knowledge AI and AI integration — built and supported by Scalevium, connected to your existing systems.",
    url: "https://scalevium.com/services/ai-development",
    siteName: "Scalevium",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Scalevium AI Development" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Services · Scalevium",
    description:
      "Voice agents, AI automation, chat assistants, knowledge AI and AI integration — built and supported by Scalevium, connected to your existing systems.",
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
  { title: "AI Voice Agents", desc: "Best for businesses that live on the phone — clinics, hotels, gyms, and spas. Answers every call, books into your software, escalates when needed." },
  { title: "AI Agents & Automation", desc: "Best for teams buried in repetitive multi-step admin. Processes requests, extracts data, and updates CRM, PMS, or ERP records." },
  { title: "AI Chat Assistants", desc: "Best for websites and messaging with high inquiry volume. Qualifies leads, books appointments, hands over with full history." },
  { title: "Knowledge AI", desc: "Best for teams that search documents and policies daily. Answers from your SOPs with citations and role-based access." },
  { title: "AI Integration", desc: "Best when AI ideas are blocked by legacy systems. Connects AI to CRM, booking, PMS, EHR, and internal tools via APIs and MCP." },
  { title: "AI Strategy & Readiness", desc: "Best for leaders who want a clear AI plan before investing. Process audit, ranked roadmap, and proof of concept in weeks." },
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
          <h1 className="sr-only">AI Services: AI That Does The Work, Connected To The Tools You Already Use.</h1>
          <span className="eyebrow-minimal" aria-hidden="true">AI SERVICES</span>
          <RevealHeading tag="span" aria-hidden="true" className="hero-title" style={{ maxWidth: "60rem", fontSize: "clamp(2.6rem, 6vw, 5.5rem)", marginBottom: 0 }} text="AI That Does The Work," />
          <RevealHeading tag="span" aria-hidden="true" className="hero-title" style={{ maxWidth: "60rem", fontSize: "clamp(2.6rem, 6vw, 5.5rem)", color: "var(--accent-light)" }} delay={0.22} text="Connected To Your Tools." />
          <p className="section-sub-editorial" style={{ marginTop: "1.75rem", maxWidth: "38.75rem" }}>
            From phone agents to autonomous workflows, we design, build, integrate, and support AI systems built around your business rules.
          </p>
        </div>
      </section>

      <section className="section-pad-standard" style={{ borderTop: "1px solid var(--border-subtle)" }}>
        <div className="container">
          <ScrollReveal>
            <span className="eyebrow-minimal">AI CAPABILITIES</span>
          </ScrollReveal>
          <RevealHeading tag="h2" className="section-heading-editorial" style={{ marginBottom: "2.5rem" }} text="What We Build" accentFrom={1} />
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
            <span className="eyebrow-minimal">RELIABILITY & SAFETY</span>
          </ScrollReveal>
          <RevealHeading tag="h2" className="section-heading-editorial" style={{ marginBottom: "1.75rem", maxWidth: "43.75rem" }} text="How We Keep AI Safe And Reliable." accentFrom={1} />
          <p className="section-sub-editorial" style={{ marginBottom: "1.75rem", maxWidth: "40rem" }}>
            Your rules, not guesses — the AI answers from your approved policies and hands off when it does not know. Human handoff, privacy by design, scripted tests before launch, and monitoring after go-live.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {["Your rules, not guesses", "Human handoff", "Privacy by design", "Tested before launch", "Monitored after launch"].map((t) => (
              <Badge key={t} tone="accent">
                {t}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <CTASection heading="Book A Free AI Consultation." description="Tell us what you want AI to handle — we will map one process and give you a clear next step." primaryLabel="Book a free AI consultation" primaryHref="/contact" secondaryLabel="See AI case studies" secondaryHref="/case-studies" />
    </div>
  );
}
