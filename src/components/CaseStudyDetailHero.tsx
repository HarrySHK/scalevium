'use client';

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import type { CaseStudy } from "@/lib/caseStudies";
import { prefersReducedMotion } from "@/lib/prefersReducedMotion";

interface CaseStudyDetailHeroProps {
  study: CaseStudy;
}

export default function CaseStudyDetailHero({ study }: CaseStudyDetailHeroProps) {
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = visualRef.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1, y: 0, scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 24, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.85, ease: "power2.out", delay: 0.15 }
      );
    }, visualRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      className="case-study-detail-hero"
      style={{ "--case-accent": study.accentColor } as React.CSSProperties}
    >
      <nav className="case-study-breadcrumb" aria-label="Breadcrumb">
        <Link href="/case-studies">Case Studies</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{study.name}</span>
      </nav>

      <div className="case-study-detail-hero-grid">
        <div className="case-study-detail-hero-copy">
          <span className="eyebrow-minimal">{study.category.toUpperCase()}</span>
          <h1 className="case-study-detail-title">{study.name}</h1>
          <p className="case-study-detail-lede">{study.oneLiner}</p>
          {study.liveUrl && (
            <Link
              href={study.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-editorial case-study-detail-live"
            >
              View live project <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          )}
        </div>

        <div ref={visualRef} className="case-study-detail-visual">
          <div
            className="case-study-detail-visual-frame"
            style={{ aspectRatio: "16 / 9", position: "relative", overflow: "hidden" }}
          >
            <Image
              src={study.imageSrc}
              alt={`${study.name} product interface`}
              fill
              sizes="(max-width: 992px) 100vw, 55vw"
              className="case-study-detail-visual-image"
              priority
            />
            <div className="case-study-detail-visual-glow" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
}
