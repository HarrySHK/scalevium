'use client';

import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

export type ToastVariant = "success" | "error";

export type ToastState = {
  message: string;
  variant: ToastVariant;
} | null;

type ToastProps = {
  toast: ToastState;
  onDismiss: () => void;
  durationMs?: number;
};

export default function Toast({ toast, onDismiss, durationMs = 5000 }: ToastProps) {
  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(onDismiss, durationMs);
    return () => window.clearTimeout(timer);
  }, [toast, onDismiss, durationMs]);

  if (!toast || typeof document === "undefined") {
    return null;
  }

  const isSuccess = toast.variant === "success";

  return createPortal(
    <div
      className="site-toast"
      role={isSuccess ? "status" : "alert"}
      aria-live="polite"
      style={{
        position: "fixed",
        bottom: "1.5rem",
        right: "1.5rem",
        left: "1.5rem",
        maxWidth: "26rem",
        marginLeft: "auto",
        zIndex: 100001,
        display: "flex",
        alignItems: "flex-start",
        gap: "0.75rem",
        padding: "1rem 1.125rem",
        borderRadius: "var(--radius-sm)",
        background: "var(--bg-surface)",
        border: `1px solid ${isSuccess ? "var(--accent-border)" : "var(--danger-border)"}`,
        boxShadow: "0 12px 40px rgba(0,0,0,0.35)",
        color: "var(--text-primary)",
        fontSize: "0.875rem",
        lineHeight: 1.5,
      }}
    >
      {isSuccess ? (
        <CheckCircle2 size={20} color="var(--accent-light)" aria-hidden="true" style={{ flexShrink: 0, marginTop: 2 }} />
      ) : (
        <AlertCircle size={20} color="var(--danger)" aria-hidden="true" style={{ flexShrink: 0, marginTop: 2 }} />
      )}
      <p style={{ flex: 1, margin: 0 }}>{toast.message}</p>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss notification"
        style={{
          background: "none",
          border: "none",
          padding: 4,
          cursor: "pointer",
          color: "var(--text-muted)",
          flexShrink: 0,
        }}
      >
        <X size={16} aria-hidden="true" />
      </button>
    </div>,
    document.body
  );
}
