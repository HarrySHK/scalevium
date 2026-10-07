'use client';

import React, { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotionLayer } from "@/components/motion/MotionLayerContext";

gsap.registerPlugin(ScrollTrigger);

const STAGGER_EACH = 0.028;

interface RevealHeadingProps {
  text: string;
  tag?: React.ElementType;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  accentFrom?: number;
  /** Hero / above-the-fold: show full heading immediately (no scroll reveal). */
  instant?: boolean;
  "aria-hidden"?: boolean | "true" | "false";
}

type LetterUnit = {
  char: string;
  accent: boolean;
  key: string;
};

function buildLetterUnits(text: string, accentFrom?: number): LetterUnit[][] {
  return text.split(" ").map((word, wordIndex) => {
    const accent = accentFrom != null && wordIndex >= accentFrom;

    return word.split("").map((char, charIndex) => ({
      char,
      accent,
      key: `${wordIndex}-${charIndex}-${char}`,
    }));
  });
}

/** Higher timeline duration → heading must travel further up the viewport while revealing. */
function computeEndScrollPosition(letterCount: number, lineDelay: number): string {
  const staggerSpan = Math.max(0, letterCount - 1) * STAGGER_EACH;
  const timelineDuration = lineDelay + 1 + staggerSpan;
  const endPercent = Math.max(2, Math.round(18 - timelineDuration * 1.45));
  return `top ${endPercent}%`;
}

function isInstantHero(className: string, instant?: boolean): boolean {
  if (instant) return true;
  return className.split(/\s+/).includes("hero-title");
}

export default function RevealHeading({
  text,
  tag: Tag = "h2",
  className = "",
  style = {},
  delay = 0,
  accentFrom,
  instant,
  "aria-hidden": ariaHidden,
}: RevealHeadingProps) {
  const ref = useRef<HTMLElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const wordGroups = useMemo(() => buildLetterUnits(text, accentFrom), [text, accentFrom]);
  const letterCount = useMemo(
    () => wordGroups.reduce((total, group) => total + group.length, 0),
    [wordGroups]
  );
  const managedByMotionLayer = useMotionLayer();
  const showInstant = managedByMotionLayer || isInstantHero(className, instant);

  useEffect(() => {
    const el = ref.current;
    const letters = letterRefs.current.filter(Boolean) as HTMLSpanElement[];
    if (!el || !letters.length || managedByMotionLayer) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || showInstant) {
      gsap.set(letters, { opacity: 1, y: 0, clearProps: "transform" });
      return;
    }

    gsap.set(letters, { opacity: 0.12, y: "0.22em", force3D: true });

    let exitObserver: IntersectionObserver | undefined;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true });

      tl.to(
        letters,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: { each: STAGGER_EACH, ease: "power1.out" },
          ease: "none",
        },
        delay
      );

      const completeReveal = () => {
        tl.progress(1);
      };

      ScrollTrigger.create({
        trigger: el,
        start: "top 92%",
        end: () => computeEndScrollPosition(letters.length, delay),
        scrub: true,
        invalidateOnRefresh: true,
        animation: tl,
        onUpdate: (self) => {
          if (self.progress >= 0.78) {
            completeReveal();
          }
        },
        onLeave: (self) => {
          if (self.direction === 1) {
            completeReveal();
          }
        },
        onLeaveBack: (self) => {
          if (self.direction === -1) {
            tl.progress(0);
          }
        },
      });

      exitObserver = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting && entry.boundingClientRect.top < 0 && tl.progress() < 0.99) {
            completeReveal();
          }
        },
        { threshold: 0 }
      );
      exitObserver.observe(el);
    }, el);

    const refresh = () => ScrollTrigger.refresh();
    refresh();
    requestAnimationFrame(refresh);

    return () => {
      exitObserver?.disconnect();
      ctx.revert();
    };
  }, [delay, text, letterCount, showInstant, managedByMotionLayer]);

  let letterIndex = 0;

  return (
    <Tag
      ref={ref as React.RefObject<HTMLElement>}
      className={`cursor-hover-target ${className}`.trim()}
      aria-hidden={ariaHidden}
      data-motion-heading={managedByMotionLayer && !isInstantHero(className, instant) ? "" : undefined}
      style={{ ...style, display: "block" }}
    >
      {wordGroups.map((group, wordIndex) => (
        <React.Fragment key={`word-${wordIndex}`}>
          <span className="reveal-heading-word">
            {group.map((unit) => {
              const currentIndex = letterIndex;
              letterIndex += 1;

              return (
                <span
                  key={unit.key}
                  ref={(node) => {
                    letterRefs.current[currentIndex] = node;
                  }}
                  className="reveal-heading-char"
                  style={{
                    color: unit.accent ? "var(--accent-light)" : undefined,
                    ...(showInstant ? { opacity: 1, transform: "none" } : undefined),
                  }}
                >
                  {unit.char}
                </span>
              );
            })}
          </span>
          {wordIndex < wordGroups.length - 1 ? " " : null}
        </React.Fragment>
      ))}
    </Tag>
  );
}
