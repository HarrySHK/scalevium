'use client';

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import type { CaseStudy } from "@/lib/caseStudies";
import { portfolioFilterToKey } from "@/lib/caseStudies";
import { prefersReducedMotion } from "@/lib/prefersReducedMotion";
import CaseStudyCard from "@/components/CaseStudyCard";
import CaseStudyFilter from "@/components/CaseStudyFilter";

interface CaseStudiesClientProps {
  studies: CaseStudy[];
  filters: string[];
}

function revealCards(cards: NodeListOf<Element> | undefined, duration: number) {
  if (!cards?.length) return undefined;
  return gsap.fromTo(
    cards,
    { opacity: 0, y: 16 },
    {
      opacity: 1,
      y: 0,
      duration,
      stagger: 0.08,
      ease: "power2.out",
    }
  );
}

export default function CaseStudiesClient({ studies, filters }: CaseStudiesClientProps) {
  const [active, setActive] = useState(filters[0] ?? "AI Projects");
  const gridRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const skipFilterAnimation = useRef(true);

  const portfolioKey = portfolioFilterToKey(active);
  const filtered = studies.filter((s) => s.portfolio === portfolioKey);

  useEffect(() => {
    if (!gridRef.current || skipFilterAnimation.current) return;

    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll(".case-study-grid-item");
      if (!cards?.length) return;

      if (prefersReducedMotion()) {
        gsap.set(cards, { opacity: 1, y: 0 });
        return;
      }

      gsap.killTweensOf(cards);
      revealCards(cards, 0.3);
    }, gridRef);

    return () => ctx.revert();
  }, [active]);

  useEffect(() => {
    if (!gridRef.current || hasAnimated.current) return;

    const reduced = prefersReducedMotion();
    if (reduced) {
      const cards = gridRef.current.querySelectorAll(".case-study-grid-item");
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
          const cards = gridRef.current?.querySelectorAll(".case-study-grid-item");
          if (!cards?.length) return;

          ctx = gsap.context(() => {
            revealCards(cards, 0.5);
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
  }, []);

  return (
    <>
      <CaseStudyFilter
        filters={filters}
        active={active}
        onChange={(filter) => {
          skipFilterAnimation.current = false;
          setActive(filter);
        }}
      />

      <div ref={gridRef} className="case-studies-grid">
        {filtered.map((study, i) => (
          <div key={study.slug} className="case-study-grid-item">
            <CaseStudyCard study={study} index={i} />
          </div>
        ))}
      </div>
    </>
  );
}
