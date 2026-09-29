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
  const aspectRatio = compact ? "4 / 3" : "16 / 9";

  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className={`case-study-card ${compact ? "case-study-card--compact" : ""} ${className}`.trim()}
      aria-label={`${study.name} — ${study.category}`}
      style={{ "--case-accent": study.accentColor } as React.CSSProperties}
    >
      <div
        className="case-study-card-inner"
        style={{ aspectRatio, position: "relative", overflow: "hidden" }}
      >
        <Image
          src={study.imageSrc}
          alt={`${study.name} interface preview`}
          fill
          sizes={compact ? "(max-width: 768px) 100vw, 33vw" : "(max-width: 768px) 100vw, 50vw"}
          className="case-study-card-image"
          priority={index != null && index < 2}
        />
        <div className="case-study-card-bottom-fade" aria-hidden="true" />
        <div className="case-study-card-hover-wash" aria-hidden="true" />

        <div className="case-study-card-content">
          <div className="case-study-card-meta">
            {indexLabel && <span className="case-study-card-index">{indexLabel}</span>}
            <span className="case-study-card-eyebrow">{study.category}</span>
          </div>
          <h3 className="case-study-card-title">{study.name}</h3>
          <p className="case-study-card-stack">{stackPreview.join(" · ")}</p>
          <span className="case-study-card-cta">
            View project <ArrowUpRight size={14} aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}
