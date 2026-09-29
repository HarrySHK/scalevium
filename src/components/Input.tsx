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
  transition: "border-color 0.3s ease",
};

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({ style, className, ...rest }: InputProps) {
  return <input className={className} style={{ ...fieldStyle, ...style }} {...rest} />;
}
