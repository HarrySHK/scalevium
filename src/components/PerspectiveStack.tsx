'use client';

import React, { useEffect, useRef, useState } from "react";

interface PerspectiveStackProps {
  /** Panel contents, back-to-front. */
  panels?: React.ReactNode[];
  height?: number;
}

export default function PerspectiveStack({ panels = [], height = 520 }: PerspectiveStackProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  const [m, setM] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const scroller: Element | Window = el.closest("[data-scroll-root]") || window;
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 900;
      setP(Math.max(-1, Math.min(1, 1 - ((r.top + r.height / 2) / vh) * 2)));
    };
    onScroll();
    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => scroller.removeEventListener("scroll", onScroll);
  }, []);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setM({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 });
  };

  return (
    <div
      ref={ref}
      className="perspective-stack-wrapper"
      onMouseMove={onMove}
      onMouseLeave={() => setM({ x: 0, y: 0 })}
      style={{
        position: "relative",
        height: `${height / 16}rem`,
        width: "100%",
        maxWidth: "100%",
      }}
    >
      {panels.map((panel, i) => {
        const depth = i / Math.max(1, panels.length - 1);
        return (
          <div
            key={i}
            className={`perspective-card perspective-card-${i}`}
            style={{
              position: "absolute",
              top: `${8 + i * 26}%`,
              left: `${4 + i * 10}%`,
              width: "82%",
              transform: `translateZ(${-i * 120}px) translateY(${p * (30 + i * 26)}px) rotateX(${52 - m.y * 8}deg) rotateZ(${-32 + m.x * 5}deg)`,
              transformStyle: "preserve-3d",
              transition: "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
              borderRadius: "var(--radius-card)",
              border: "1px solid var(--border-card)",
              background: "var(--bg-card)",
              boxShadow: `0 ${1.875 + i * 1.25}rem ${3.75 + i * 1.875}rem rgba(0,0,0,${0.45 - depth * 0.12})`,
              overflow: "hidden",
            }}
          >
            {panel}
          </div>
        );
      })}

      <style>{`
        .perspective-stack-wrapper {
          perspective: 1400px;
          perspective-origin: 60% 40%;
        }
        @media (max-width: 768px) {
          .perspective-stack-wrapper {
            perspective: none !important;
            height: 28rem !important;
            margin-top: 1.5rem;
          }
          .perspective-card {
            width: 92% !important;
            left: 4% !important;
            transform: none !important;
            transition: none !important;
          }
          .perspective-card-0 {
            top: 0% !important;
            z-index: 1;
            opacity: 0.9;
          }
          .perspective-card-1 {
            top: 28% !important;
            z-index: 2;
            opacity: 0.95;
          }
          .perspective-card-2 {
            top: 56% !important;
            z-index: 3;
            opacity: 1;
          }
        }
        @media (max-width: 480px) {
          .perspective-stack-wrapper {
            height: 29rem !important;
          }
          .perspective-card {
            width: 100% !important;
            left: 0% !important;
          }
        }
      `}</style>
    </div>
  );
}
