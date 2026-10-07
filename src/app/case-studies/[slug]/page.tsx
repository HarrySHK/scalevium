import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CTASection from "@/components/CTASection";
import CaseStudyDetailHero from "@/components/CaseStudyDetailHero";
import CaseStudyDetailBody from "@/components/CaseStudyDetailBody";
import {
  getAllCaseStudySlugs,
  getCaseStudyBySlug,
  type CaseStudy,
} from "@/lib/caseStudies";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function buildChallenge(study: CaseStudy): string {
  if (study.contributionNote) {
    return `${study.oneLiner} ${study.contributionNote}`;
  }
  return study.oneLiner;
}

export async function generateStaticParams() {
  return getAllCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) return {};

  const title = `${study.name} — Scalevium Case Study`;
  const description = study.oneLiner;
  const canonical = `https://scalevium.com/case-studies/${study.slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Scalevium",
      images: [
        {
          url: study.imageSrc,
          width: 1200,
          height: 630,
          alt: `${study.name} — Scalevium Case Study`,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [study.imageSrc],
    },
  };
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) notFound();

  const detailSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://scalevium.com" },
          { "@type": "ListItem", position: 2, name: "Case Studies", item: "https://scalevium.com/case-studies" },
          {
            "@type": "ListItem",
            position: 3,
            name: study.name,
            item: `https://scalevium.com/case-studies/${study.slug}`,
          },
        ],
      },
      {
        "@type": "CreativeWork",
        name: study.name,
        description: study.oneLiner,
        url: `https://scalevium.com/case-studies/${study.slug}`,
        genre: study.category,
        keywords: study.stack.join(", "),
        image: `https://scalevium.com${study.imageSrc}`,
      },
    ],
  };

  return (
    <div style={{ position: "relative", zIndex: 3 }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(detailSchema) }}
      />

      <article>
        <section className="section-pad-hero case-study-detail-page-hero">
          <div className="container">
            <CaseStudyDetailHero study={study} />
          </div>
        </section>

        <section className="section-pad-standard case-study-detail-page-body" style={{ borderTop: "1px solid var(--border-subtle)" }}>
          <div className="container">
            <CaseStudyDetailBody study={study} challenge={buildChallenge(study)} />
          </div>
        </section>
      </article>

      <CTASection
        heading="Have Something Similar In Mind?"
        description="Connect with our technical team to discuss your engineering roadmap."
        primaryHref="/contact"
      />
    </div>
  );
}
