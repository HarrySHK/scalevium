import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import CTASection from "@/components/CTASection";
import RevealHeading from "@/components/RevealHeading";
import CaseStudiesClient from "@/components/CaseStudiesClient";
import { CASE_STUDIES, getCaseStudyPortfolioFilters } from "@/lib/caseStudies";

export const metadata: Metadata = {
  title: "Case Studies · Scalevium",
  description:
    "6 AI systems and 5 software platforms across 10 industries — voice agents, booking AI, logistics platforms, and integration infrastructure.",
  alternates: {
    canonical: "https://scalevium.com/case-studies",
  },
  openGraph: {
    title: "Case Studies · Scalevium",
    description:
      "6 AI systems and 5 software platforms across 10 industries — voice agents, booking AI, logistics platforms, and integration infrastructure.",
    url: "https://scalevium.com/case-studies",
    siteName: "Scalevium",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Scalevium Case Studies" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies · Scalevium",
    description:
      "6 AI systems and 5 software platforms across 10 industries — voice agents, booking AI, logistics platforms, and integration infrastructure.",
    images: ["/og-image.jpg"],
  },
};

const caseStudiesSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://scalevium.com" },
        { "@type": "ListItem", position: 2, name: "Case Studies", item: "https://scalevium.com/case-studies" },
      ],
    },
    {
      "@type": "CollectionPage",
      name: "Scalevium Case Studies",
      description:
        "Selected production engineering work and voice AI receptionist products across logistics, healthcare, hospitality, fitness, and dental operations.",
      url: "https://scalevium.com/case-studies",
    },
  ],
};

export default function CaseStudiesPage() {
  const portfolioFilters = getCaseStudyPortfolioFilters();

  return (
    <div style={{ position: "relative", zIndex: 3 }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudiesSchema) }}
      />

      <section className="section-pad-hero">
        <div className="container">
          <span className="eyebrow-minimal">WORK</span>
          <RevealHeading
            tag="h1"
            className="hero-title"
            style={{ maxWidth: "60rem", fontSize: "clamp(2.6rem, 6vw, 5.5rem)" }}
            text="Work We've Shipped."
          />
          <ScrollReveal>
            <p className="section-sub-editorial" style={{ marginTop: "1.5rem", maxWidth: "42rem" }}>
              6 AI systems and 5 software platforms across 10 industries — from voice agents that book on the call to fleet platforms and live dispatch dashboards.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-pad-standard" style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: 0 }}>
        <div className="container">
          <CaseStudiesClient studies={CASE_STUDIES} filters={portfolioFilters} />
        </div>
      </section>

      <CTASection
        heading="Tell Us What You Want AI To Handle."
        description="Book a free consultation — we reply within one business day."
        primaryLabel="Book a free AI consultation"
        primaryHref="/contact"
      />
    </div>
  );
}
