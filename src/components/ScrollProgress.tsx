'use client';

import React, { useState, useEffect } from "react";
import { useLenis } from "@/hooks/useLenis";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      const onLenisScroll = (instance: typeof lenis) => {
        setProgress(instance.progress * 100);
      };
      onLenisScroll(lenis);
      const unsubscribe = lenis.on("scroll", onLenisScroll);
      return unsubscribe;
    }

    const onScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setProgress((window.scrollY / totalHeight) * 100);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lenis]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        background: "var(--border-subtle)",
        zIndex: 200,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress}%`,
          background: "var(--accent-light)",
          transition: "width 0.1s ease-out",
        }}
      />
    </div>
  );
}
