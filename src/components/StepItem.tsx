import React from "react";

interface StepItemProps {
  num: string;
  title: string;
  description: string;
  /** "top-rule" (default, grid layout) or "timeline" (numbered circle + vertical line — needs a positioned ancestor). */
  variant?: "top-rule" | "timeline";
}

export default function StepItem({ num, title, description, variant = "top-rule" }: StepItemProps) {
  if (variant === "timeline") {
    return (
      <div style={{ position: "relative" }} className="timeline-step-item">
        <div
          style={{
            position: "absolute",
            left: "-3.75rem",
            top: "0.125rem",
            width: "2rem",
            height: "2rem",
            borderRadius: "50%",
            background: "var(--bg-primary)",
            border: "1px solid var(--border-subtle)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "var(--text-muted)",
          }}
          className="timeline-badge"
          aria-hidden="true"
        >
          {num}
        </div>
        <h3 style={{ fontSize: "1.375rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.625rem", lineHeight: 1.3 }}>{title}</h3>
        <p style={{ fontSize: "1rem", color: "var(--text-muted)", maxWidth: "33.75rem", lineHeight: 1.65 }}>{description}</p>
        <style>{`
          @media (max-width: 640px) {
            .timeline-badge {
              left: -2.5rem !important;
              width: 1.625rem !important;
              height: 1.625rem !important;
              font-size: 0.6875rem !important;
            }
          }
        `}</style>
      </div>
    );
  }
  return (
    <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "2rem" }}>
      <div aria-hidden="true" style={{ fontSize: "2.25rem", fontWeight: 300, color: "var(--text-subtle)", marginBottom: "1rem" }}>{num}</div>
      <h3 style={{ fontSize: "1.375rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.75rem", lineHeight: 1.3 }}>{title}</h3>
      <p style={{ fontSize: "0.9375rem", color: "var(--text-muted)", lineHeight: 1.65, maxWidth: "30rem" }}>{description}</p>
    </div>
  );
}
