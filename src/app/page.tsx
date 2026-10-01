import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Scalevium · AI Agents, Voice AI & Custom Software",
  description:
    "AI voice agents, AI agents and custom software that connect to the tools your business already uses. Book a free AI consultation.",
  alternates: {
    canonical: "https://scalevium.com",
  },
  openGraph: {
    title: "Scalevium · AI Agents, Voice AI & Custom Software",
    description:
      "AI voice agents, AI agents and custom software that connect to the tools your business already uses. Book a free AI consultation.",
    url: "https://scalevium.com",
    siteName: "Scalevium",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Scalevium · AI Agents, Voice AI & Custom Software",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scalevium · AI Agents, Voice AI & Custom Software",
    description:
      "AI voice agents, AI agents and custom software that connect to the tools your business already uses. Book a free AI consultation.",
    images: ["/og-image.jpg"],
  },
};

const homeFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What kind of AI do you build?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Voice agents, chat assistants, autonomous agents, document and knowledge assistants, and AI features inside web and mobile products.",
      },
    },
    {
      "@type": "Question",
      name: "Do we need a lot of data?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Most systems start from your existing policies, documents, and software.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most AI systems go live in 3–6 weeks, depending on integrations.",
      },
    },
    {
      "@type": "Question",
      name: "Who owns the work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You do. Code and IP transfer to you with a clear chain of title.",
      },
    },
    {
      "@type": "Question",
      name: "Do you support it after launch?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Monitoring, tuning, and support plans are available.",
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
