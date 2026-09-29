'use client';

import React, { useRef, useState } from "react";

interface TiltCardProps {
  children?: React.ReactNode;
  /** Max rotation in degrees. Default 7. */
  maxTilt?: number;
  padding?: number;
  /** Cursor-following glow. Default true. */
  glow?: boolean;
}

export default function TiltCard({ children, maxTilt = 7, padding = 28, glow = true }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ rx: 0, ry: 0, gx: 50, gy: 50, active: false });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setT({ rx: (0.5 - py) * maxTilt * 2, ry: (px - 0.5) * maxTilt * 2, gx: px * 100, gy: py * 100, active: true });
  };
  const onLeave = () => setT({ rx: 0, ry: 0, gx: 50, gy: 50, active: false });

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        position: "relative",
        height: "100%",
        padding: padding === 0 ? 0 : `${padding / 16}rem`,
        borderRadius: "var(--radius-card)",
        background: "var(--bg-card)",
        border: "1px solid",
        borderColor: t.active ? "var(--accent-border)" : "var(--border-card)",
        overflow: "hidden",
        transformStyle: "preserve-3d",
        transform: `perspective(56.25rem) rotateX(${t.rx}deg) rotateY(${t.ry}deg) translateY(${t.active ? -0.25 : 0}rem)`,
        transition: t.active ? "transform 0.15s ease-out, border-color 0.3s ease" : "transform 0.7s var(--ease-editorial), border-color 0.4s ease",
      }}
    >
      {glow && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: t.active ? 1 : 0,
            transition: "opacity 0.4s ease",
            background: `radial-gradient(380px circle at ${t.gx}% ${t.gy}%, var(--accent-tint), transparent 65%)`,
          }}
        />
      )}
      <div style={{ position: "relative", height: "100%" }}>{children}</div>
    </div>
  );
}
