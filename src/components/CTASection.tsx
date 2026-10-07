'use client';

import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import RevealHeading from "@/components/RevealHeading";
import { PRIMARY_CTA_HREF, PRIMARY_CTA_LABEL } from "@/lib/site";
import { useMotionLayer } from "@/components/motion/MotionLayerContext";

interface CTASectionProps {
  heading: string;
  description: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  primaryHref?: string;
  secondaryHref?: string;
}

export default function CTASection({
  heading,
  description,
  primaryLabel = PRIMARY_CTA_LABEL,
  secondaryLabel,
  primaryHref = PRIMARY_CTA_HREF,
  secondaryHref,
}: CTASectionProps) {
  const managedByMotionLayer = useMotionLayer();

  return (
    <section
      className={managedByMotionLayer ? "cta-section-wrapper cta-section-wrapper--motion" : "cta-section-wrapper"}
      style={{ borderTop: "1px solid var(--border-subtle)", position: "relative", zIndex: 3 }}
    >
      {managedByMotionLayer && (
        <div className="motion-glow-field" aria-hidden="true">
          <span className="motion-glow-blob motion-glow-blob--cta-a" data-glow-blob />
          <span className="motion-glow-blob motion-glow-blob--cta-b" data-glow-blob />
        </div>
      )}
      <div
        className="container"
        style={{ textAlign: "center", maxWidth: "51.25rem", ...(managedByMotionLayer ? { position: "relative", zIndex: 1 } : null) }}
      >
        <RevealHeading tag="h2" className="section-heading-editorial" style={{ marginBottom: "1.5rem" }} text={heading} />
        <p className="section-sub-editorial" style={{ margin: "0 auto 3rem", maxWidth: "33.75rem" }}>
          {description}
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", flexWrap: "wrap", alignItems: "center" }}>
          {primaryHref && (
            <Link href={primaryHref} className="btn-editorial-solid">
              {primaryLabel} <ArrowRight size={16} aria-hidden="true" />
            </Link>
          )}
          {secondaryLabel && secondaryHref && (
            <Link href={secondaryHref} className="link-editorial">
              {secondaryLabel} <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>
      <style>{`
        .cta-section-wrapper {
          padding: 8.75rem 0;
        }
        @media (max-width: 768px) {
          .cta-section-wrapper {
            padding: 4.5rem 0;
          }
        }
      `}</style>
    </section>
  );
}
