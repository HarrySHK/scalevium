import type { Metadata } from "next";
import { Suspense } from "react";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Scalevium | Hire Senior Developers & Engineering Pods",
  description:
    "Connect with Scalevium's lead architects to discuss developer placements, custom AI solutions, or managed pods. Direct response within one business day.",
  alternates: {
    canonical: "https://scalevium.com/contact",
  },
  openGraph: {
    title: "Contact Scalevium | Hire Senior Developers & Engineering Pods",
    description:
      "Connect with Scalevium's lead architects to discuss developer placements, custom AI solutions, or managed pods. Direct response within one business day.",
    url: "https://scalevium.com/contact",
    siteName: "Scalevium",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Contact Scalevium" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Scalevium | Hire Senior Developers & Engineering Pods",
    description:
      "Connect with Scalevium's lead architects to discuss developer placements, custom AI solutions, or managed pods. Direct response within one business day.",
    images: ["/og-image.jpg"],
  },
};

const contactSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://scalevium.com" },
        { "@type": "ListItem", position: 2, name: "Contact", item: "https://scalevium.com/contact" },
      ],
    },
    {
      "@type": "ContactPage",
      name: "Contact Scalevium",
      description:
        "Connect with Scalevium's lead software architects to discuss senior engineering talent, custom software builds, or AI implementations.",
      url: "https://scalevium.com/contact",
    },
  ],
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <Suspense fallback={null}>
        <ContactClient />
      </Suspense>
    </>
  );
}
