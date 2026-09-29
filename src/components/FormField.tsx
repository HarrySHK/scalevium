import React from "react";
import { AlertCircle } from "lucide-react";

interface FormFieldProps {
  label: string;
  error?: string;
  id?: string;
  required?: boolean;
  children: React.ReactNode;
}

export default function FormField({ label, error, id, children }: FormFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        style={{
          fontSize: "0.75rem",
          color: "var(--text-subtle)",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          marginBottom: "0.25rem",
          display: "block",
          fontWeight: 600,
        }}
      >
        {label}
      </label>
      {children}
      {error && (
        <div
          id={id ? `${id}-error` : undefined}
          role="alert"
          style={{ display: "flex", alignItems: "center", gap: "0.375rem", marginTop: "0.375rem", color: "var(--danger)", fontSize: "0.78125rem" }}
        >
          <AlertCircle size={13} aria-hidden="true" /> {error}
        </div>
      )}
    </div>
  );
}
