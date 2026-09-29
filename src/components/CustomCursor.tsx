'use client';

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";

const SIZE_DEFAULT = 10;
const SIZE_INTERACTIVE = 44;
/** Large agency-style ring over editorial headings (~14–16rem feel on screen). */
const SIZE_HEADING = 168;

const POSITION_SMOOTH = 0.35;
const SIZE_SMOOTH = 0.45;

const HEADING_SELECTOR =
  ".cursor-hover-target, .section-heading-editorial, .hero-title, .reveal-heading-char, .reveal-heading-word, h1, h2, h3";

function isTouchOrNarrowViewport(): boolean {
  if (typeof window === "undefined") return true;
  return !window.matchMedia("(pointer: fine) and (min-width: 768px)").matches;
}

function resolveHoverSize(clientX: number, clientY: number): number {
  const under = document.elementFromPoint(clientX, clientY) as HTMLElement | null;
  if (!under) return SIZE_DEFAULT;

  if (under.closest(HEADING_SELECTOR)) {
    return SIZE_HEADING;
  }
  if (under.closest("a, button, input, textarea, select, [role='button'], .interactive")) {
    return SIZE_INTERACTIVE;
  }
  return SIZE_DEFAULT;
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setEnabled(!isTouchOrNarrowViewport() && !reduced.matches);
    sync();
    reduced.addEventListener("change", sync);
    return () => reduced.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!enabled || !mounted) return;

    const el = cursorRef.current;
    if (!el) return;

    gsap.set(el, {
      xPercent: -50,
      yPercent: -50,
      x: -100,
      y: -100,
      width: SIZE_DEFAULT,
      height: SIZE_DEFAULT,
      scale: 1,
      opacity: 0,
      force3D: true,
    });

    const xTo = gsap.quickTo(el, "x", { duration: POSITION_SMOOTH, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: POSITION_SMOOTH, ease: "power3.out" });
    const wTo = gsap.quickTo(el, "width", { duration: SIZE_SMOOTH, ease: "power3.out" });
    const hTo = gsap.quickTo(el, "height", { duration: SIZE_SMOOTH, ease: "power3.out" });
    const opacityTo = gsap.quickTo(el, "opacity", { duration: 0.22, ease: "power2.out" });

    const onPointerMove = (event: PointerEvent) => {
      xTo(event.clientX);
      yTo(event.clientY);
      opacityTo(1);

      const size = resolveHoverSize(event.clientX, event.clientY);
      wTo(size);
      hTo(size);

      const under = document.elementFromPoint(event.clientX, event.clientY) as HTMLElement | null;
      const textOnly =
        under?.closest("p, blockquote, .section-sub-editorial") &&
        !under.closest(`${HEADING_SELECTOR}, a, button, .interactive`);
      if (textOnly) {
        opacityTo(0.45);
      }
    };

    const onPointerLeave = () => opacityTo(0);
    const onPointerEnter = () => opacityTo(0.9);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onPointerLeave);
    document.documentElement.addEventListener("mouseenter", onPointerEnter);

    const onResize = () => setEnabled(!isTouchOrNarrowViewport());
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("mouseleave", onPointerLeave);
      document.documentElement.removeEventListener("mouseenter", onPointerEnter);
      window.removeEventListener("resize", onResize);
      gsap.killTweensOf(el);
    };
  }, [enabled, mounted]);

  if (!mounted || !enabled) {
    return null;
  }

  return createPortal(
    <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />,
    document.body
  );
}
