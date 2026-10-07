'use client';

import React, { useEffect, useRef, useState } from "react";
import { useMotionLayer } from "@/components/motion/MotionLayerContext";

interface StatCardProps {
  value: number;
  suffix?: string;
  label: string;
  sublabel?: string;
  index?: string;
  barPercent?: number;
}

export default function StatCard({
  value,
  suffix = "",
  label,
  sublabel,
  index,
  barPercent = 72,
}: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [n, setN] = useState(0);
  const [shown, setShown] = useState(false);
  const managedByMotionLayer = useMotionLayer();

  useEffect(() => {
    if (managedByMotionLayer) return;
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
  }, [value, managedByMotionLayer]);

  return (
    <article ref={ref} className="stat-card">
      <div className="stat-card-glow" aria-hidden="true" />
      {index ? <span className="stat-card-index">{index}</span> : null}
      <div className="stat-card-metric" aria-label={`${value}${suffix}`}>
        <span className="stat-card-value" data-count-to={managedByMotionLayer ? value : undefined}>
          {managedByMotionLayer ? value : n}
        </span>
        {suffix ? <span className="stat-card-suffix">{suffix}</span> : null}
      </div>
      <h3 className="stat-card-label">{label}</h3>
      {sublabel ? <p className="stat-card-sublabel">{sublabel}</p> : null}
      <div className="stat-card-rule" aria-hidden="true">
        <span
          className="stat-card-rule-fill"
          style={{ width: managedByMotionLayer || shown ? `${barPercent}%` : "0%" }}
        />
      </div>
    </article>
  );
}
