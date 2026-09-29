'use client';

import React, { useEffect, useRef, useState } from "react";

interface CaseStudyFilterProps {
  filters: string[];
  active: string;
  onChange: (filter: string) => void;
}

export default function CaseStudyFilter({ filters, active, onChange }: CaseStudyFilterProps) {
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [underline, setUnderline] = useState({ left: 0, width: 0 });

  const tabs = filters;

  useEffect(() => {
    const activeIndex = filters.indexOf(active);
    const el = tabsRef.current[activeIndex];
    if (!el) return;

    setUnderline({
      left: el.offsetLeft,
      width: el.offsetWidth,
    });
  }, [active, filters]);

  return (
    <div
      role="tablist"
      aria-label="Filter case studies by portfolio"
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "1.5rem 2rem",
        position: "relative",
        paddingBottom: "0.875rem",
        paddingTop: "0.875rem",
        borderBottom: "1px solid var(--border-subtle)",
        marginBottom: "2.5rem",
      }}
    >
      {tabs.map((tab, i) => {
        const isActive = active === tab;
        return (
          <button
            key={tab}
            ref={(el) => {
              tabsRef.current[i] = el;
            }}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab)}
            style={{
              background: "none",
              border: "none",
              padding: "0.25rem 0",
              cursor: "pointer",
              fontWeight: isActive ? 600 : 500,
              color: isActive ? "var(--text-primary)" : "var(--text-muted)",
              transition: "color 0.25s ease",
              fontFamily: "inherit",
              fontSize: "0.9375rem",
              letterSpacing: "-0.01em",
            }}
          >
            {tab}
          </button>
        );
      })}

      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-1px",
          left: underline.left,
          width: underline.width,
          height: "1px",
          background: "var(--accent-light)",
          transition: "left 0.3s var(--ease-editorial), width 0.3s var(--ease-editorial)",
        }}
      />
    </div>
  );
}
