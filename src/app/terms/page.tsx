import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL, CONTACT_MAILTO } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms governing use of the Scalevium corporate website.",
  alternates: { canonical: "https://scalevium.com/terms" },
  openGraph: {
    title: "Terms of Service | Scalevium",
    url: "https://scalevium.com/terms",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Scalevium" }],
  },
};

export default function TermsPage() {
  return (
    <div style={{ position: "relative", zIndex: 3 }}>
      <section className="section-pad-hero">
        <div className="container">
          <div className="legal-page-inner">
          <span className="eyebrow-minimal">LEGAL</span>
          <h1 className="section-heading-editorial" style={{ marginBottom: "1.5rem" }}>
            Terms of Service
          </h1>
          <p className="section-sub-editorial" style={{ marginBottom: "2.5rem" }}>
            Last updated: March 29, 2026. By accessing scalevium.com, you agree to these terms.
          </p>

          <div className="legal-prose">
            <h2>Website use</h2>
            <p>
              This site provides information about Scalevium&apos;s engineering and talent services. Content is for general
              information only and does not constitute a binding offer until confirmed in a signed agreement.
            </p>

            <h2>No warranty</h2>
            <p>
              The site and materials are provided &quot;as is&quot; without warranties of any kind. We strive for accuracy but do
              not guarantee that all content is complete or current at all times.
            </p>

            <h2>Intellectual property</h2>
            <p>
              Scalevium logos, branding, case study summaries, and site content are owned by Scalevium or its licensors.
              You may not copy or redistribute them without written permission, except for personal, non-commercial
              reference.
            </p>

            <h2>Contact submissions</h2>
            <p>
              Information you submit through our contact form must be accurate to the best of your knowledge. Do not
              submit unlawful, misleading, or harmful content.
            </p>

            <h2>Limitation of liability</h2>
            <p>
              To the fullest extent permitted by law, Scalevium is not liable for indirect or consequential damages
              arising from use of this website.
            </p>

            <h2>Governing law</h2>
            <p>
              These terms are governed by the laws applicable to Scalevium Technologies Inc., without regard to conflict-of-law
              principles. Specific client engagements are governed by separate written contracts.
            </p>

            <h2>Contact</h2>
            <p>
              Questions:{" "}
              <a href={CONTACT_MAILTO} className="link-editorial">
                {CONTACT_EMAIL}
              </a>
              . See our <Link href="/privacy">Privacy Policy</Link>.
            </p>
          </div>
          </div>
        </div>
      </section>
    </div>
  );
}
