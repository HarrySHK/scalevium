'use client';

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const EASE_EDITORIAL = [0.16, 1, 0.3, 1] as const;
const EASE_OUT_BACK = [0.34, 1.56, 0.64, 1] as const;

// Mirrors the "Scalevium Logo Loader" composition cues: Mark -> Letters -> Hold -> Exit.
const MARK_DUR = 1.3;
const LETTERS_DUR = 1.8;
const HOLD_DUR = 1.2;
const EXIT_DUR = 0.8;
const CUE_LETTERS = MARK_DUR;
const CUE_EXIT = MARK_DUR + LETTERS_DUR + HOLD_DUR;
const TOTAL = CUE_EXIT + EXIT_DUR;

/** Present on <html> while the intro covers the page; page-load animations wait for INTRO_EXIT_EVENT. */
export const INTRO_ACTIVE_ATTR = "data-intro-active";
export const INTRO_EXIT_EVENT = "scalevium:intro-exit";

export default function IntroLoader() {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  // Survives React Strict Mode's dev-only mount->cleanup->mount so the
  // "have we decided to play" answer isn't re-derived (and desynced from
  // the sessionStorage write) on the throwaway first invocation.
  const shouldPlayRef = useRef<boolean | null>(null);

  useLayoutEffect(() => {
    if (shouldPlayRef.current === null) {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const seen = sessionStorage.getItem("scalevium-intro-seen");
      shouldPlayRef.current = !reduced && !seen;
      if (shouldPlayRef.current) sessionStorage.setItem("scalevium-intro-seen", "1");
    }

    if (!shouldPlayRef.current) {
      document.documentElement.classList.remove("intro-pending");
      return;
    }

    setVisible(true);
    document.body.style.overflow = "hidden";
    document.documentElement.setAttribute(INTRO_ACTIVE_ATTR, "");

    const exitTimer = setTimeout(() => {
      setExiting(true);
      document.documentElement.removeAttribute(INTRO_ACTIVE_ATTR);
      window.dispatchEvent(new Event(INTRO_EXIT_EVENT));
    }, CUE_EXIT * 1000);
    const doneTimer = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
      document.documentElement.classList.remove("intro-pending");
    }, TOTAL * 1000);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
      document.documentElement.removeAttribute(INTRO_ACTIVE_ATTR);
      document.body.style.overflow = "";
      document.body.style.removeProperty("overflow");
      document.documentElement.classList.remove("intro-pending");
    };
  }, []);

  useLayoutEffect(() => {
    if (visible) {
      document.documentElement.classList.remove("intro-pending");
    }
  }, [visible]);

  useEffect(() => {
    if (!visible) {
      document.body.style.overflow = "";
      document.body.style.removeProperty("overflow");
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 1 }}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: EXIT_DUR, ease: EASE_EDITORIAL }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99998,
        background: "var(--bg-primary)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: exiting ? "none" : "auto",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>
        <div
          style={{
            position: "relative",
            width: 110,
            height: 110,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.75, 0.3] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            style={{
              position: "absolute",
              inset: -28,
              borderRadius: "50%",
              background: "radial-gradient(closest-side, #3E7BFA, transparent 70%)",
              filter: "blur(6px)",
            }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.72 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: EASE_OUT_BACK }}
            style={{ position: "relative", width: 110, height: 110 }}
          >
            <Image
              src="/brand/mark-light.png"
              alt=""
              width={110}
              height={110}
              className="logo-mark-light"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain" }}
              priority
            />
            <Image
              src="/brand/mark-dark.png"
              alt=""
              width={110}
              height={110}
              className="logo-mark-dark"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain" }}
              priority
            />
          </motion.div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
            transition={{
              opacity: { duration: 0.2, delay: CUE_LETTERS },
              clipPath: { duration: 1.3, delay: CUE_LETTERS, ease: EASE_EDITORIAL },
            }}
            style={{ position: "relative", width: "min(340px, 70vw)", aspectRatio: `${1931 / 253}` }}
          >
            <Image
              src="/brand/logo-light.png"
              alt="Scalevium"
              width={340}
              height={Math.round(340 / (1931 / 253))}
              className="logo-mark-light"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain" }}
              priority
            />
            <Image
              src="/brand/logo-dark.png"
              alt=""
              aria-hidden
              width={340}
              height={Math.round(340 / (1931 / 253))}
              className="logo-mark-dark"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain" }}
              priority
            />
          </motion.div>
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.45, delay: CUE_LETTERS + 1.3, ease: EASE_EDITORIAL }}
            style={{ maxWidth: 180, height: 2, background: "var(--accent-light)", borderRadius: 2 }}
          />
        </div>
      </div>
    </motion.div>
  );
}
