import React from "react";

const fieldStyle: React.CSSProperties = {
  width: "100%",
  padding: "1rem 0",
  background: "transparent",
  border: "none",
  borderBottom: "1px solid var(--border-subtle)",
  color: "var(--text-primary)",
  fontSize: "1rem",
  outline: "none",
  fontFamily: "inherit",
  appearance: "none",
  WebkitAppearance: "none",
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /** Option label list. */
  options?: string[];
  /** Empty-value option text. Default "Select an option". */
  placeholder?: string;
}

export default function Select({ options = [], placeholder = "Select an option", style, className, ...rest }: SelectProps) {
  return (
    <select className={className} style={{ ...fieldStyle, ...style }} {...rest}>
      <option value="" style={{ background: "var(--bg-surface)" }}>
        {placeholder}
      </option>
      {options.map((opt) => (
        <option key={opt} value={opt} style={{ background: "var(--bg-surface)" }}>
          {opt}
        </option>
      ))}
    </select>
  );
}
