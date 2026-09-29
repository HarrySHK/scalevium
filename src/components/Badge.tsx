import React from "react";

interface BadgeProps {
  /** "neutral" (default, plain pill outline), "accent" (blue), or "success" (green). */
  tone?: "neutral" | "accent" | "success";
  children?: React.ReactNode;
}

const TONES: Record<NonNullable<BadgeProps["tone"]>, { color: string; border: string; background: string }> = {
  neutral: { color: "var(--text-muted)", border: "var(--border-subtle)", background: "transparent" },
  accent: { color: "var(--accent-light)", border: "var(--accent-border-faint)", background: "var(--accent-tint)" },
  success: { color: "var(--success)", border: "var(--success-tint)", background: "var(--success-tint)" },
};

export default function Badge({ children, tone = "neutral" }: BadgeProps) {
  const t = TONES[tone];
  return (
    <span
      style={{
        fontSize: "0.6875rem",
        fontWeight: 700,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        color: t.color,
        padding: "0.375rem 0.75rem",
        borderRadius: "var(--radius-pill)",
        border: `1px solid ${t.border}`,
        background: t.background,
        display: "inline-block",
      }}
    >
      {children}
    </span>
  );
}
