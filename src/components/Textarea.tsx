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
  minHeight: "7.5rem",
  resize: "vertical",
};

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function Textarea({ style, className, ...rest }: TextareaProps) {
  return <textarea className={className} style={{ ...fieldStyle, ...style }} {...rest} />;
}
