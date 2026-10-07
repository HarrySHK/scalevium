'use client';

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import type { CaseStudy } from "@/lib/caseStudies";
import { prefersReducedMotion } from "@/lib/prefersReducedMotion";
import CaseStudyCard from "@/components/CaseStudyCard";
import ScrollReveal from "@/components/ScrollReveal";
import RevealHeading from "@/components/RevealHeading";
import { useMotionLayer } from "@/components/motion/MotionLayerContext";

interface CaseStudyTeaserProps {
  studies: CaseStudy[];
}

export default function CaseStudyTeaser({ studies }: CaseStudyTeaserProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const managedByMotionLayer = useMotionLayer();

  useEffect(() => {
    if (!gridRef.current || hasAnimated.current || managedByMotionLayer) return;

    const cards = gridRef.current.querySelectorAll(".case-study-teaser-item");
    if (prefersReducedMotion()) {
      gsap.set(cards, { opacity: 1, y: 0 });
      hasAnimated.current = true;
      return;
    }

    let ctx: gsap.Context | undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || hasAnimated.current) return;
          hasAnimated.current = true;

          ctx = gsap.context(() => {
            gsap.fromTo(
              cards,
              { opacity: 0, y: 16 },
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.08,
                ease: "power2.out",
              }
            );
          }, gridRef);
          observer.disconnect();
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(gridRef.current);
    return () => {
      observer.disconnect();
      ctx?.revert();
    };
  }, [managedByMotionLayer]);

  return (
    <section
      className="section-pad-standard case-study-teaser-section"
      style={{ borderTop: "1px solid var(--border-subtle)", position: "relative", zIndex: 3 }}
    >
      <div className="container">
        <ScrollReveal>
          <span className="eyebrow-minimal">CASE STUDIES</span>
        </ScrollReveal>
        <RevealHeading
          tag="h2"
          className="section-heading-editorial"
          text="AI Already Working For Businesses Like Yours."
          accentFrom={1}
          style={{ marginBottom: "1rem", maxWidth: "43.75rem" }}
        />
        <p className="case-study-teaser-lede" style={{ maxWidth: "40rem" }}>
          Real deployments across hospitality, healthcare, and operations — each connected to the tools your team
          already uses.
        </p>

        <div ref={gridRef} className="grid-responsive-3 case-study-teaser-grid">
          {studies.map((study, i) => (
            <div key={study.slug} className="case-study-teaser-item">
              <CaseStudyCard study={study} index={i} compact />
            </div>
          ))}
        </div>

        <div className="case-study-teaser-footer">
          <Link href="/case-studies" className="case-study-teaser-all">
            See All Work <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
