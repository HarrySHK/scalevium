import React from "react";

interface MarqueeBandProps {
  items?: string[];
  /** Loop duration in seconds. Default 34. */
  speed?: number;
  separator?: string;
  size?: string;
  muted?: boolean;
}

export default function MarqueeBand({
  items = [],
  speed = 34,
  separator = "/",
  size = "clamp(1.6rem, 3.4vw, 3rem)",
  muted = true,
}: MarqueeBandProps) {
  const doubled = [...items, ...items];
  const id = "band" + Math.round(speed * 7);
  return (
    <div style={{ overflow: "hidden", padding: "1.125rem 0", borderTop: "1px solid var(--border-subtle)", borderBottom: "1px solid var(--border-subtle)", contain: "layout paint" }}>
      <div className={id} style={{ display: "flex", gap: "2.5rem", width: "max-content", alignItems: "center" }}>
        {doubled.map((it, i) => (
          <React.Fragment key={i}>
            <span style={{ fontSize: size, fontWeight: 600, letterSpacing: "-0.03em", whiteSpace: "nowrap", color: muted ? "var(--text-subtle)" : "var(--text-primary)" }}>
              {it}
            </span>
            <span style={{ color: "var(--accent-light)", fontSize: "1.2rem", opacity: 0.55 }}>{separator}</span>
          </React.Fragment>
        ))}
      </div>
      <style>{`.${id}{animation:${id}-scroll ${speed}s linear infinite}@keyframes ${id}-scroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}@media (prefers-reduced-motion:reduce){.${id}{animation:none}}`}</style>
    </div>
  );
}
