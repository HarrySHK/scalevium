import React from "react";

interface EditorialRowProps {
  /** Leading index label, e.g. "01". */
  index?: string;
  title: string;
  description?: string;
  /** Force the hover-highlighted text weight/color. Default false. */
  active?: boolean;
  onClick?: () => void;
}

export default function EditorialRow({ index, title, description, active = false, onClick }: EditorialRowProps) {
  const handleKeyDown = onClick
    ? (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }
    : undefined;

  return (
    <div
      className="tech-row"
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", minWidth: 0 }}>
        {index != null && <span style={{ fontSize: "0.875rem", color: "var(--text-subtle)", fontWeight: 500, flexShrink: 0 }}>{index}</span>}
        <span className="tech-row-text" style={active ? { color: "var(--text-primary)", fontWeight: 600 } : undefined}>
          {title}
        </span>
      </div>
      {description && <span className="tech-row-desc">{description}</span>}
      <div className="tech-row-line" aria-hidden="true" />
    </div>
  );
}
