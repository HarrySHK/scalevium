"use client";

import React, { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[global error boundary]", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          background: "#070709",
          color: "#f4f4f5",
          fontFamily: "system-ui, sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <div style={{ maxWidth: "28rem", textAlign: "center" }}>
          <p
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#6ea0ff",
              marginBottom: "1rem",
            }}
          >
            Scalevium
          </p>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 600, marginBottom: "0.75rem" }}>Critical error</h1>
          <p style={{ color: "#a1a1aa", lineHeight: 1.6, marginBottom: "1.5rem" }}>
            The application could not recover. Please reload the page or try again later.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              background: "#f4f4f5",
              color: "#070709",
              border: "none",
              borderRadius: "999px",
              padding: "0.875rem 1.5rem",
              fontSize: "0.875rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
