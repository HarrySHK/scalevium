'use client';

import React, { useState } from "react";

interface FAQItem {
  q: string;
  a: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [open, setOpen] = useState(0);

  return (
    <div style={{ borderTop: "1px solid var(--border-subtle)" }}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} style={{ borderBottom: "1px solid var(--border-subtle)" }}>
            <button
              type="button"
              id={`faq-btn-${i}`}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${i}`}
              onClick={() => setOpen(isOpen ? -1 : i)}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1.5rem 0",
                textAlign: "left",
                cursor: "pointer",
                gap: "1rem",
              }}
            >
              <span style={{ fontSize: "1.0625rem", fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.4 }}>{item.q}</span>
              <span
                aria-hidden="true"
                style={{
                  fontSize: "1.25rem",
                  color: "var(--text-muted)",
                  transition: "transform 0.3s var(--ease-editorial)",
                  transform: isOpen ? "rotate(45deg)" : "none",
                  flexShrink: 0,
                }}
              >
                +
              </span>
            </button>
            <div
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-btn-${i}`}
              style={{
                display: "grid",
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                transition: "grid-template-rows 0.4s var(--ease-editorial)",
              }}
            >
              <div style={{ overflow: "hidden" }}>
                <p style={{ fontSize: "0.9375rem", color: "var(--text-muted)", lineHeight: 1.7, paddingBottom: "1.5rem", maxWidth: "40rem" }}>{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
