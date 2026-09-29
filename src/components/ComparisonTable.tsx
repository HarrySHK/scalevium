import React from "react";

interface ComparisonRow {
  label: string;
  values: React.ReactNode[];
}

interface ComparisonTableProps {
  columns: string[];
  rows: ComparisonRow[];
}

export default function ComparisonTable({ columns, rows }: ComparisonTableProps) {
  return (
    <div className="responsive-table-wrapper" role="region" aria-label="Feature comparison table" tabIndex={0}>
      <div style={{ minWidth: "36rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: `1.2fr repeat(${columns.length}, 1fr)`, background: "var(--bg-surface)" }}>
          <div style={{ padding: "1rem 1.25rem" }} />
          {columns.map((c) => (
            <div key={c} style={{ padding: "1rem 1.25rem", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--accent-light)" }}>
              {c}
            </div>
          ))}
        </div>
        {rows.map((row) => (
          <div key={row.label} style={{ display: "grid", gridTemplateColumns: `1.2fr repeat(${columns.length}, 1fr)`, borderTop: "1px solid var(--border-subtle)" }}>
            <div style={{ padding: "1rem 1.25rem", fontSize: "0.84375rem", color: "var(--text-muted)", fontWeight: 600 }}>{row.label}</div>
            {row.values.map((v, j) => (
              <div key={j} style={{ padding: "1rem 1.25rem", fontSize: "0.875rem", color: "var(--text-primary)", lineHeight: 1.5 }}>
                {v}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
