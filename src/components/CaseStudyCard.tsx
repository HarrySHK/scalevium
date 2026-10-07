'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "@/lib/caseStudies";

interface CaseStudyCardProps {
  study: CaseStudy;
  index?: number;
  compact?: boolean;
  className?: string;
}

export default function CaseStudyCard({ study, index, compact = false, className = "" }: CaseStudyCardProps) {
  const stackPreview = study.stack.slice(0, 3);
  const indexLabel = index != null ? String(index + 1).padStart(2, "0") : null;
  const imageSizes = compact
    ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
    : "(max-width: 768px) 100vw, 50vw";

  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className={`case-study-card ${compact ? "case-study-card--compact" : ""} ${className}`.trim()}
      aria-label={`${study.name} — ${study.category}`}
    >
      <article className="case-study-card-shell">
        <div className="case-study-card-media">
          <div className={`case-study-card-media-frame${study.cardImage ? " case-study-card-media-frame--cover" : ""}`}>
            {study.cardImage ? (
              (["dark", "light"] as const).map((theme) => (
                <Image
                  key={theme}
                  src={study.cardImage![theme]}
                  alt={`${study.name} — ${study.category} case study preview`}
                  fill
                  sizes={imageSizes}
                  className={`case-study-card-image case-study-card-image--${theme}`}
                  priority={index != null && index < 2}
                />
              ))
            ) : (
              <Image
                src={study.imageSrc}
                alt={`${study.name} — ${study.category} case study preview`}
                fill
                sizes={imageSizes}
                className="case-study-card-image"
                priority={index != null && index < 2}
              />
            )}
            {compact ? <div className="case-study-card-media-shade" aria-hidden="true" /> : null}
          </div>
        </div>

        <div className="case-study-card-body">
          <div className="case-study-card-meta">
            {indexLabel ? <span className="case-study-card-index">{indexLabel}</span> : null}
            <span className="case-study-card-eyebrow">{study.category}</span>
          </div>
          <h3 className="case-study-card-title">{study.name}</h3>
          {compact ? (
            <p className="case-study-card-summary">{study.oneLiner}</p>
          ) : (
            <p className="case-study-card-stack">{stackPreview.join(" · ")}</p>
          )}
          <span className="case-study-card-cta">
            View Case Study <ArrowUpRight size={14} aria-hidden="true" />
          </span>
        </div>
      </article>
    </Link>
  );
}
