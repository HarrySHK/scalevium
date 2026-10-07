"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LenisContext } from "@/hooks/useLenis";

gsap.registerPlugin(ScrollTrigger);

type SmoothScrollProviderProps = {
  children: ReactNode;
};

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function refreshScrollTriggerAfterRouteChange() {
  requestAnimationFrame(() => ScrollTrigger.refresh());
  window.setTimeout(() => ScrollTrigger.refresh(), 100);
  window.setTimeout(() => ScrollTrigger.refresh(), 400);
}

function focusTargetAfterScroll(target: Element) {
  if (target instanceof HTMLElement && typeof target.focus === "function") {
    target.focus({ preventScroll: true });
  }
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const tickerFnRef = useRef<((time: number) => void) | null>(null);
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const instance = new Lenis({
      // duration: how long programmatic / inertial scroll takes to settle (seconds); higher = heavier feel
      duration: 1.1,
      // easing: deceleration curve at end of scroll; expo-out keeps motion crisp without a hard stop
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      // smoothWheel: interpolate wheel/trackpad; touch stays native unless syncTouch is enabled
      smoothWheel: true,
      wheelMultiplier: 1,
      // touchMultiplier: slight boost on touch-driven programmatic scroll; default touch remains OS-native
      touchMultiplier: 1.1,
      infinite: false,
      // We gate init on prefers-reduced-motion ourselves; avoid double-handling inside Lenis
      respectReducedMotion: false,
      autoRaf: false,
      anchors: false,
    });

    lenisRef.current = instance;
    setLenis(instance);

    instance.on("scroll", ScrollTrigger.update);

    const tickerFn = (time: number) => {
      instance.raf(time * 1000);
    };
    tickerFnRef.current = tickerFn;
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    const onAnchorClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const anchor = (event.target as Element | null)?.closest?.("a[href]");
      if (!anchor || !(anchor instanceof HTMLAnchorElement)) return;

      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("#") || href.length < 2) return;

      const target = document.querySelector(href);
      if (!(target instanceof HTMLElement)) return;

      event.preventDefault();

      const active = lenisRef.current;
      if (!active) {
        target.scrollIntoView({ behavior: "auto", block: "start" });
        focusTargetAfterScroll(target);
        return;
      }

      active.scrollTo(target, {
        offset: 0,
        onComplete: () => focusTargetAfterScroll(target),
      });
    };

    document.addEventListener("click", onAnchorClick);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      if (tickerFnRef.current) {
        gsap.ticker.remove(tickerFnRef.current);
        tickerFnRef.current = null;
      }
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, []);

  useEffect(() => {
    const active = lenisRef.current;
    if (active) {
      active.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
    refreshScrollTriggerAfterRouteChange();
  }, [pathname, lenis]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
