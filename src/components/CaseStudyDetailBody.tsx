import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "@/lib/caseStudies";

interface CaseStudyDetailBodyProps {
  study: CaseStudy;
  challenge: string;
}

export default function CaseStudyDetailBody({ study, challenge }: CaseStudyDetailBodyProps) {
  return (
    <div
      className="case-study-detail-body"
      style={{ "--case-accent": study.accentColor } as React.CSSProperties}
    >
      <div className="case-study-detail-main">
        <section className="case-study-detail-section">
          <span className="eyebrow-minimal">THE CHALLENGE</span>
          <blockquote className="case-study-detail-challenge">{challenge}</blockquote>
        </section>

        <section className="case-study-detail-section">
          <span className="eyebrow-minimal">ARCHITECTURAL COMPLEXITY</span>
          <ol className="case-study-complexity-list">
            {study.complexity.map((item, i) => (
              <li key={item.title} className="case-study-complexity-item">
                <span className="case-study-complexity-index">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h2 className="case-study-complexity-title">{item.title}</h2>
                  <p className="case-study-complexity-body">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <aside className="case-study-detail-sidebar">
        <div className="case-study-sidebar-panel">
          <span className="eyebrow-minimal">CATEGORY</span>
          <p className="case-study-sidebar-value">{study.category}</p>
        </div>

        <div className="case-study-sidebar-panel">
          <span className="eyebrow-minimal">STACK</span>
          <ul className="case-study-stack-list">
            {study.stack.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </div>

        {study.liveUrl && (
          <div className="case-study-sidebar-panel">
            <span className="eyebrow-minimal">LIVE PROJECT</span>
            <br />
            <Link
              href={study.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-editorial"
              style={{ fontSize: "0.875rem", marginTop: "0.75rem", display: "inline-flex" }}
            >
              Visit site <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>
        )}

        <div className="case-study-sidebar-panel case-study-sidebar-panel--muted">
          <Link href="/case-studies" className="link-editorial" style={{ fontSize: "0.875rem" }}>
            ← All case studies
          </Link>
        </div>
      </aside>
    </div>
  );
}
