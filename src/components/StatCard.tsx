'use client';

import React, { useEffect, useRef, useState } from "react";

interface StatCardProps {
  value: number;
  suffix?: string;
  label: string;
  sublabel?: string;
  /** Small index label, e.g. "01". */
  index?: string;
  /** Fill width of the progress rule, 0-100. Default 70. */
  barPercent?: number;
}

// Count-up stat. The number never renders as 0 when the observer doesn't fire —
// the fallback snaps straight to the final value so it can't get stuck at "0"..
export default function StatCard({ value, suffix = "", label, sublabel, index, barPercent }: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [n, setN] = useState(0);
  const [shown, setShown] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    let raf = 0;
    let fired = false;
    const run = () => {
      const dur = 1400;
      const start = performance.now();
      const step = (t: number) => {
        const p = Math.min(1, (t - start) / dur);
        setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };
    const snap = () => {
      setShown(true);
      setN(value);
    };
    if (!("IntersectionObserver" in window) || !ref.current) {
      snap();
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        fired = true;
        obs.disconnect();
        setShown(true);
        run();
      },
      { threshold: 0.35 }
    );
    obs.observe(ref.current);
    const t = setTimeout(() => {
      if (!fired) snap();
    }, 1000);
    return () => {
      clearTimeout(t);
      obs.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        height: "100%",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        padding: "1.75rem 1.625rem 1.5rem",
        borderRadius: "var(--radius-card)",
        overflow: "hidden",
        background: "var(--bg-card)",
        border: "1px solid var(--border-card)",
        transform: hover ? "translateY(-0.375rem)" : "translateY(0)",
        transition: "transform 0.5s var(--ease-editorial), border-color 0.4s ease",
        borderColor: hover ? "var(--accent-border)" : "var(--border-card)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: hover ? 1 : 0,
          transition: "opacity 0.5s ease",
          pointerEvents: "none",
          background: "radial-gradient(26.25rem circle at 20% 0%, var(--accent-tint), transparent 70%)",
        }}
      />
      {index && <div style={{ position: "relative", fontSize: "0.6875rem", letterSpacing: "0.18em", color: "var(--text-subtle)", marginBottom: "1.125rem", fontWeight: 600 }}>{index}</div>}
      <div style={{ position: "relative", display: "flex", alignItems: "baseline", gap: "0.125rem" }}>
        <span style={{ fontSize: "clamp(2.4rem, 4vw, 3.5rem)", fontWeight: 700, letterSpacing: "-0.045em", lineHeight: 1, color: "var(--text-primary)" }}>{n}</span>
        <span style={{ fontSize: "1.375rem", fontWeight: 600, color: "var(--accent-light)" }}>{suffix}</span>
      </div>
      <div style={{ position: "relative", marginTop: "1.125rem", height: "0.125rem", background: "var(--border-subtle)", borderRadius: "0.125rem", overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            width: shown ? `${barPercent != null ? barPercent : 70}%` : "0%",
            background: "var(--accent-light)",
            transition: "width 1.5s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
          }}
        />
      </div>
      <div style={{ position: "relative", marginTop: "1rem", fontSize: "0.9375rem", fontWeight: 600, color: "var(--text-primary)" }}>{label}</div>
      {sublabel && <div style={{ position: "relative", marginTop: "0.375rem", fontSize: "0.8125rem", color: "var(--text-muted)", lineHeight: 1.55 }}>{sublabel}</div>}
    </div>
  );
}
