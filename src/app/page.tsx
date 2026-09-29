import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Scalevium — Senior Engineering Talent & Managed AI Software Pods",
  description:
    "Scalevium provides vetted senior software engineers within 48 hours and builds high-velocity managed engineering pods led by Fractional CTOs.",
  alternates: {
    canonical: "https://scalevium.com",
  },
  openGraph: {
    title: "Scalevium — Senior Engineering Talent & Managed AI Software Pods",
    description:
      "Scalevium provides vetted senior software engineers within 48 hours and builds high-velocity managed engineering pods led by Fractional CTOs.",
    url: "https://scalevium.com",
    siteName: "Scalevium",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Scalevium — Senior Engineering Talent & Managed AI Software Pods",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scalevium — Senior Engineering Talent & Managed AI Software Pods",
    description:
      "Scalevium provides vetted senior software engineers within 48 hours and builds high-velocity managed engineering pods led by Fractional CTOs.",
    images: ["/og-image.jpg"],
  },
};

const homeFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How quickly can an engineer start?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For standard roles on our active bench, we present candidates within 48 hours. Kickoff happens once an agreement is executed — usually within 3 to 5 business days.",
      },
    },
    {
      "@type": "Question",
      name: "What does a Fractional CTO actually do?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "They lead your managed pod's technical strategy, architecture, and weekly deliverables. They are your single point of contact, attend planning sessions, and report directly to your executive team.",
      },
    },
    {
      "@type": "Question",
      name: "Can we transition an engineer to a direct hire?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. After six months of continuous placement, you can convert any engineer to a direct employee under straightforward, transparent buyout terms.",
      },
    },
    {
      "@type": "Question",
      name: "How does the Diagnostic Phase work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A paid 1–2 week technical scoping phase where a lead architect audits your stack, produces a detailed technical blueprint, and defines sprint milestones. The fee is credited directly toward your first month's pod retainer.",
      },
    },
    {
      "@type": "Question",
      name: "What is the minimum commitment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Staff augmentation placements require a one-month minimum. Managed pods begin with a two-month initial term, followed by monthly renewals.",
      },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqSchema) }}
      />
      <HomeClient />
    </>
  );
}
