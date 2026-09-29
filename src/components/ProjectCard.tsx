import React from "react";

interface ProjectCardProps {
  category: string;
  title: string;
  description: string;
  tags?: string[];
  /** Optional highlighted metric string, e.g. "+40% throughput". */
  metric?: string;
}

export default function ProjectCard({ category, title, description, tags = [], metric }: ProjectCardProps) {
  return (
    <div className="card-base" style={{ padding: "2.25rem 2rem", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--accent-light)",
              padding: "0.375rem 0.75rem",
              borderRadius: "var(--radius-pill)",
              background: "var(--accent-tint)",
              border: "1px solid var(--accent-border-faint)",
            }}
          >
            {category}
          </span>
          {metric && <span style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--success)" }}>{metric}</span>}
        </div>
        <h3 style={{ fontSize: "1.375rem", fontWeight: 700, color: "var(--text-card-primary)", marginBottom: "0.75rem", lineHeight: 1.3 }}>{title}</h3>
        <p style={{ fontSize: "0.9375rem", color: "var(--text-card-muted)", lineHeight: 1.65, marginBottom: "1.5rem" }}>{description}</p>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", paddingTop: "1rem", borderTop: "1px solid var(--border-card-faint)" }}>
        {tags.map((t) => (
          <span
            key={t}
            style={{
              fontSize: "0.75rem",
              color: "var(--text-card-muted)",
              background: "var(--bg-surface-alt)",
              padding: "0.25rem 0.625rem",
              borderRadius: "var(--radius-xs)",
              border: "1px solid var(--border-card-hairline)",
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
