"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Button from "@/components/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[app error boundary]", error);
  }, [error]);

  return (
    <div style={{ position: "relative", zIndex: 3 }}>
      <section className="section-pad-hero" style={{ minHeight: "70vh", display: "flex", alignItems: "center" }}>
        <div className="container" style={{ maxWidth: "44rem" }}>
          <span className="eyebrow-minimal">SOMETHING WENT WRONG</span>
          <h1 className="section-heading-editorial" style={{ marginBottom: "1.25rem" }}>
            We hit an unexpected error.
          </h1>
          <p className="section-sub-editorial" style={{ marginBottom: "2rem" }}>
            This page could not load correctly. You can try again, return home, or reach out if the problem persists.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
            <Button type="button" onClick={() => reset()}>
              Try again
            </Button>
            <Link href="/" className="link-editorial" style={{ fontSize: "0.9375rem" }}>
              <ArrowLeft size={16} aria-hidden="true" /> Back to Home
            </Link>
            <Link href="/contact" className="link-editorial" style={{ fontSize: "0.9375rem" }}>
              Contact us <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
