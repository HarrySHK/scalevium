import React from "react";

interface IndustryCardProps {
  icon?: React.ReactNode;
  industry: string;
  useCase: string;
}

export default function IndustryCard({ icon, industry, useCase }: IndustryCardProps) {
  return (
    <div className="card-base" style={{ padding: "1.75rem", display: "flex", flexDirection: "column", gap: "0.875rem", height: "100%" }}>
      <div
        aria-hidden="true"
        style={{
          width: "2.5rem",
          height: "2.5rem",
          borderRadius: "var(--radius-icon)",
          background: "var(--accent-tint)",
          border: "1px solid var(--accent-border-faint)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--accent-light)",
          fontSize: "1.0625rem",
        }}
      >
        {icon}
      </div>
      <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-card-primary)", lineHeight: 1.3 }}>{industry}</h4>
      <p style={{ fontSize: "0.84375rem", color: "var(--text-card-muted)", lineHeight: 1.6 }}>{useCase}</p>
    </div>
  );
}
