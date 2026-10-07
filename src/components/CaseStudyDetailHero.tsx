'use client';

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Play } from "lucide-react";
import { gsap } from "gsap";
import type { CaseStudy } from "@/lib/caseStudies";
import { prefersReducedMotion } from "@/lib/prefersReducedMotion";
import {
  getVoiceAgentDemoVideoPath,
  getVoiceAgentFlowchartPath,
  publicPathToUrl,
} from "@/lib/voiceAgentCaseStudyAssets";
import CaseStudyDetailVideoModal from "@/components/CaseStudyDetailVideoModal";

interface CaseStudyDetailHeroProps {
  study: CaseStudy;
}

export default function CaseStudyDetailHero({ study }: CaseStudyDetailHeroProps) {
  const visualRef = useRef<HTMLDivElement>(null);
  const [videoOpen, setVideoOpen] = useState(false);

  const demoVideoPath = getVoiceAgentDemoVideoPath(study.slug);
  const demoVideoUrl = demoVideoPath ? publicPathToUrl(demoVideoPath) : undefined;
  const hasDiagramHero = Boolean(getVoiceAgentFlowchartPath(study.slug));

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
        { y: 24, scale: 0.98 },
        { y: 0, scale: 1, duration: 0.85, ease: "power2.out", delay: 0.15 }
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

      <div
        className={`case-study-detail-hero-grid${
          hasDiagramHero ? " case-study-detail-hero-grid--diagram" : ""
        }`}
      >
        <div className="case-study-detail-hero-copy">
          <span className="eyebrow-minimal">{study.category.toUpperCase()}</span>
          <h1 className="case-study-detail-title">{study.name}</h1>
          <p className="case-study-detail-lede">{study.oneLiner}</p>
          <div className="case-study-detail-hero-actions">
            {demoVideoUrl && (
              <button
                type="button"
                className="btn-editorial-solid case-study-detail-demo-btn"
                onClick={() => setVideoOpen(true)}
              >
                <Play size={16} aria-hidden="true" fill="currentColor" />
                Watch the call flow
              </button>
            )}
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
        </div>

        <div ref={visualRef} className="case-study-detail-visual">
          <div
            className={`case-study-detail-visual-frame${
              hasDiagramHero ? " case-study-detail-visual-frame--diagram" : ""
            }`}
          >
            {hasDiagramHero ? (
              <div className="case-study-detail-diagram-stage">
                <Image
                  src={study.imageSrc}
                  alt={`${study.name} — voice agent call flow diagram`}
                  width={1920}
                  height={1380}
                  sizes="(max-width: 992px) 100vw, 58vw"
                  className="case-study-detail-diagram-img"
                  quality={92}
                  priority
                />
              </div>
            ) : (
              <Image
                src={study.imageSrc}
                alt={`${study.name} project preview`}
                fill
                sizes="(max-width: 992px) 100vw, 55vw"
                className="case-study-detail-visual-image"
                style={{ objectFit: "cover", objectPosition: "center center" }}
                priority
              />
            )}
            {!hasDiagramHero && (
              <div className="case-study-detail-visual-glow" aria-hidden="true" />
            )}
          </div>
        </div>
      </div>

      {demoVideoUrl && (
        <CaseStudyDetailVideoModal
          open={videoOpen}
          onClose={() => setVideoOpen(false)}
          title={`${study.name} — call flow demo`}
          videoSrc={demoVideoUrl}
        />
      )}
    </div>
  );
}
