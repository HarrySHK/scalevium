import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL, CONTACT_MAILTO } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Scalevium collects, uses, and protects information submitted through scalevium.com.",
  alternates: { canonical: "https://scalevium.com/privacy-policy" },
  openGraph: {
    title: "Privacy Policy | Scalevium",
    url: "https://scalevium.com/privacy-policy",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Scalevium" }],
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div style={{ position: "relative", zIndex: 3 }}>
      <section className="section-pad-hero">
        <div className="container">
          <div className="legal-page-inner">
            <span className="eyebrow-minimal">LEGAL</span>
            <h1 className="section-heading-editorial" style={{ marginBottom: "1.5rem" }}>
              Privacy Policy
            </h1>
            <p className="section-sub-editorial" style={{ marginBottom: "2.5rem" }}>
              Last updated: March 29, 2026. This policy describes how Scalevium Technologies Inc. (&quot;Scalevium&quot;, &quot;we&quot;)
              handles information when you use scalevium.com.
            </p>

            <div className="legal-prose">
              <h2>Information we collect</h2>
              <p>
                When you submit our contact form, we collect the details you provide (such as name, company, email, phone,
                project interest, and message). We also receive standard technical data from your browser and hosting logs
                (for example IP address and user agent) for security and operations.
              </p>

              <h2>How we use it</h2>
              <p>
                We use contact submissions to respond to inquiries, evaluate fit for our services, and improve how we
                communicate with prospective clients. We do not sell your personal information.
              </p>

              <h2>Cookies &amp; analytics</h2>
              <p>
                We use essential storage (such as theme preference and whether you dismissed our cookie banner) to run
                the site. If you accept analytics cookies, we load Google Analytics to measure traffic in aggregate. You
                can decline analytics and still use the site. See your browser settings to clear stored preferences.
              </p>

              <h2>Storage &amp; processors</h2>
              <p>
                Form data is stored in our secure database (Supabase) and may be copied to internal operational tools
                (such as Google Sheets) used by our team to track and respond to inquiries. These providers process data
                on our behalf under appropriate agreements.
              </p>

              <h2>Retention</h2>
              <p>
                We retain contact inquiries for as long as needed to manage the business relationship and comply with legal
                obligations, unless you ask us to delete earlier where applicable law allows.
              </p>

              <h2>Your rights</h2>
              <p>
                Depending on your location, you may have rights to access, correct, or delete personal data we hold about
                you. Contact us at{" "}
                <a href={CONTACT_MAILTO} className="link-editorial">
                  {CONTACT_EMAIL}
                </a>{" "}
                to make a request.
              </p>

              <h2>Contact</h2>
              <p>
                Questions about this policy:{" "}
                <a href={CONTACT_MAILTO} className="link-editorial">
                  {CONTACT_EMAIL}
                </a>
                . See also our <Link href="/terms-condition">Terms of Service</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
