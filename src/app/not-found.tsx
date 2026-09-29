import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export const metadata = {
  title: "404 — Page Not Found | Scalevium",
  description: "The page you are looking for does not exist or has been moved. Explore Scalevium's engineering services and case studies.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div style={{ position: "relative", zIndex: 3 }}>
      <section className="section-pad-hero" style={{ minHeight: "75vh", display: "flex", alignItems: "center" }}>
        <div className="container" style={{ maxWidth: "48rem", textAlign: "center" }}>
          <span className="eyebrow-minimal" style={{ marginBottom: "1rem", display: "inline-block" }}>
            ERROR 404
          </span>
          <h1 className="hero-title" style={{ fontSize: "clamp(2.6rem, 6vw, 4.5rem)", marginBottom: "1.5rem" }}>
            Page Not Found.
          </h1>
          <p className="section-sub-editorial" style={{ margin: "0 auto 2.5rem", maxWidth: "34rem" }}>
            The requested URL could not be found. It may have been moved or updated. Use the links below to explore our services or return to the homepage.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "1.25rem", flexWrap: "wrap", alignItems: "center" }}>
            <Link href="/" className="btn-editorial-solid">
              <ArrowLeft size={16} aria-hidden="true" /> Back to Home
            </Link>
            <Link href="/services" className="link-editorial">
              Explore Services <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
            <Link href="/case-studies" className="link-editorial">
              Case Studies <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
            <Link href="/contact" className="link-editorial">
              Contact Us <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
