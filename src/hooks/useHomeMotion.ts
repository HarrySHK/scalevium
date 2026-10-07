"use client";

import type { RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import { INTRO_ACTIVE_ATTR, INTRO_EXIT_EVENT } from "@/components/IntroLoader";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const HERO_PENDING_CLASS = "home-hero-pending";
const EASE_OUT = "expo.out";
const REVEAL_START = "top 88%";

const MEDIA = {
  motion: "(prefers-reduced-motion: no-preference)",
  heroVisual: "(prefers-reduced-motion: no-preference) and (min-width: 1200px)",
  finePointer:
    "(prefers-reduced-motion: no-preference) and (min-width: 1024px) and (hover: hover) and (pointer: fine)",
};

const BENTO_ITEMS =
  ".premium-platform-grid > [data-reveal], .premium-industry-grid > [data-reveal], [data-motion-bento] > [data-reveal]";
const BENTO_ART = ".ppb-graphic-container > *, .pib-graphic > *";

type Cleanup = () => void;

function all<T extends Element = HTMLElement>(selector: string, scope: ParentNode): T[] {
  return Array.from(scope.querySelectorAll<T>(selector));
}

/**
 * Reveal each element once, the first time it reaches `start`. Also fires on
 * onLeave/onEnterBack so elements skipped over by a fast jump (anchor link,
 * restored scroll position) never stay hidden.
 */
function batchReveal(targets: HTMLElement[], reveal: (batch: HTMLElement[]) => void, start = REVEAL_START) {
  if (!targets.length) return;
  const revealed = new WeakSet<Element>();
  const run = (batch: Element[]) => {
    const fresh = batch.filter((el) => !revealed.has(el)) as HTMLElement[];
    if (!fresh.length) return;
    fresh.forEach((el) => revealed.add(el));
    reveal(fresh);
  };
  ScrollTrigger.batch(targets, { start, interval: 0.08, onEnter: run, onEnterBack: run, onLeave: run });
}

/** Runs `cb` immediately, or once the first-visit intro loader starts its exit. */
function whenIntroDone(cb: () => void): Cleanup {
  if (!document.documentElement.hasAttribute(INTRO_ACTIVE_ATTR)) {
    cb();
    return () => {};
  }
  let fired = false;
  const run = () => {
    if (fired) return;
    fired = true;
    cb();
  };
  window.addEventListener(INTRO_EXIT_EVENT, run, { once: true });
  const failsafe = window.setTimeout(run, 6000);
  return () => {
    fired = true;
    window.removeEventListener(INTRO_EXIT_EVENT, run);
    window.clearTimeout(failsafe);
  };
}

/** Pause infinite loops while their section is off screen. */
function playWhileVisible(trigger: Element | null, tweens: gsap.core.Animation[]) {
  if (!trigger || !tweens.length) return;
  ScrollTrigger.create({
    trigger,
    start: "top bottom",
    end: "bottom top",
    onToggle: (self) => tweens.forEach((t) => (self.isActive ? t.play() : t.pause())),
  });
}

// ---------------------------------------------------------------------------
// Hero: word-by-word headline, split lede, floating cards, connector draw
// ---------------------------------------------------------------------------
function setupHeroIntro(root: HTMLElement): Cleanup {
  const hero = root.querySelector<HTMLElement>("[data-home-hero]");
  if (!hero) return () => {};

  const eyebrow = hero.querySelector<HTMLElement>("[data-hero-eyebrow]");
  const titleWords = all(".reveal-heading-word", hero.querySelector("[data-hero-title]") ?? hero);
  const lede = hero.querySelector<HTMLElement>("[data-hero-lede]");
  const actions = Array.from(hero.querySelector("[data-hero-actions]")?.children ?? []) as HTMLElement[];
  const marquee = root.querySelector<HTMLElement>("[data-motion-marquee]");
  const visual = hero.querySelector<HTMLElement>("[data-hero-visual]");
  const cards = visual ? all("[data-float-card]", visual) : [];
  const badges = visual ? all("[data-float-badge]", visual) : [];
  const nodes = visual ? all("[data-connector-node]", visual) : [];
  const path = visual?.querySelector<SVGPathElement>("[data-connector-path]") ?? null;

  const split = lede ? new SplitType(lede, { types: "words", wordClass: "motion-split-word" }) : null;
  const ledeWords = split?.words ?? [];

  // fromTo (immediateRender) applies every from-state now, while the timeline waits
  // for the intro, and keeps each from-state owned by the tween that reverts it.
  const tl = gsap.timeline({ paused: true, defaults: { ease: EASE_OUT } });
  const add = (targets: Element | Element[] | null, from: gsap.TweenVars, to: gsap.TweenVars, at: number) => {
    if (!targets || (Array.isArray(targets) && !targets.length)) return;
    tl.fromTo(targets, from, to, at);
  };

  add(eyebrow, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.8 }, 0);
  add(
    titleWords,
    { opacity: 0, yPercent: 70, rotate: 3, transformOrigin: "0% 100%" },
    { opacity: 1, yPercent: 0, rotate: 0, duration: 1.15, stagger: 0.09 },
    0.1
  );
  add(ledeWords, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.012 }, 0.55);
  add(actions, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 }, 0.75);
  add(marquee, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1 }, 0.9);
  add(cards, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1.1, stagger: 0.14 }, 0.45);
  add(
    path,
    { strokeDasharray: 1, strokeDashoffset: 1 },
    { strokeDashoffset: 0, duration: 1.8, ease: "power2.inOut" },
    0.6
  );
  add(nodes, { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.6, stagger: 0.18, ease: "back.out(2.2)" }, 0.8);
  add(badges, { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.7, stagger: 0.12, ease: "back.out(2.4)" }, 1.2);

  const stopWaiting = whenIntroDone(() => tl.play());

  return () => {
    stopWaiting();
    split?.revert();
  };
}

// ---------------------------------------------------------------------------
// Shared heading pattern: word-by-word fade + rise, CTA heading letter-by-letter
// ---------------------------------------------------------------------------
function setupHeadings(root: HTMLElement) {
  const headings = all("[data-motion-heading]", root).filter((h) => !h.closest(".cta-section-wrapper"));
  const wordsOf = (h: HTMLElement) => all(".reveal-heading-word", h);

  headings.forEach((h) => gsap.set(wordsOf(h), { opacity: 0, yPercent: 45 }));
  batchReveal(
    headings,
    (batch) =>
      batch.forEach((h, i) =>
        gsap.to(wordsOf(h), { opacity: 1, yPercent: 0, duration: 0.95, ease: EASE_OUT, stagger: 0.06, delay: i * 0.1 })
      ),
    "top 86%"
  );
}

function setupGenericReveals(root: HTMLElement, handled: Set<Element>) {
  const items = [
    ...all("[data-reveal]", root),
    ...all(".case-study-teaser-lede, .case-study-teaser-footer", root),
  ].filter((el) => !handled.has(el) && !el.closest("[data-home-hero]"));

  gsap.set(items, { opacity: 0, y: 28 });
  batchReveal(items, (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.9, ease: EASE_OUT, stagger: 0.08 }));
}

/** Accent line drawing itself across each section's top border (CSS `--rule-scale`). */
function setupSectionRules(root: HTMLElement) {
  const sections = all(":scope > section:not(:first-child)", root);
  gsap.set(sections, { "--rule-scale": 0 });
  batchReveal(
    sections,
    (batch) => gsap.to(batch, { "--rule-scale": 1, duration: 1.4, ease: "power3.inOut", stagger: 0.1 }),
    "top 85%"
  );
}

// ---------------------------------------------------------------------------
// Stats: card rise + GSAP count-up + bar fill
// ---------------------------------------------------------------------------
function setupStats(root: HTMLElement, handled: Set<Element>): Cleanup {
  const items = all(".home-stats-grid > [data-reveal]", root);
  const counters = new Map<Element, { node: Text; target: number }>();

  items.forEach((item) => {
    handled.add(item);
    const valueEl = item.querySelector<HTMLElement>("[data-count-to]");
    const node = valueEl?.firstChild;
    if (valueEl && node && node.nodeType === Node.TEXT_NODE) {
      counters.set(item, { node: node as Text, target: Number(valueEl.dataset.countTo) });
      node.nodeValue = "0";
    }
  });

  const fills = items.map((item) => item.querySelector(".stat-card-rule-fill")).filter(Boolean);
  gsap.set(fills, { scaleX: 0, transformOrigin: "left center" });
  gsap.set(items, { opacity: 0, y: 40, scale: 0.96 });

  batchReveal(items, (batch) => {
    gsap.to(batch, { opacity: 1, y: 0, scale: 1, duration: 1, ease: EASE_OUT, stagger: 0.1 });
    batch.forEach((item, i) => {
      const counter = counters.get(item);
      if (counter) {
        const state = { v: 0 };
        gsap.to(state, {
          v: counter.target,
          duration: 1.6,
          delay: 0.15 + i * 0.1,
          ease: "power3.out",
          onUpdate: () => {
            counter.node.nodeValue = String(Math.round(state.v));
          },
        });
      }
      const fill = item.querySelector(".stat-card-rule-fill");
      if (fill) gsap.to(fill, { scaleX: 1, duration: 1.4, delay: 0.3 + i * 0.1, ease: EASE_OUT });
    });
  });

  return () => counters.forEach(({ node, target }) => (node.nodeValue = String(target)));
}

// ---------------------------------------------------------------------------
// Bento grids (The Gap, Platforms, Industries): staggered rise + Ken Burns art
// ---------------------------------------------------------------------------
function setupBento(root: HTMLElement, handled: Set<Element>) {
  const items = all(BENTO_ITEMS, root);
  items.forEach((el) => handled.add(el));

  gsap.set(items, { opacity: 0, y: 60, scale: 0.94, transformOrigin: "50% 100%" });
  gsap.set(all(BENTO_ART, root), { scale: 1.12 });
  gsap.set(all(".problem-card-icon", root), { opacity: 0, scale: 0.5, rotate: -12 });

  batchReveal(
    items,
    (batch) => {
      gsap.to(batch, { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: EASE_OUT, stagger: 0.12 });
      batch.forEach((item, i) => {
        const art = all(BENTO_ART, item);
        if (art.length) {
          gsap.to(art, { scale: 1, duration: 1.9, delay: i * 0.12, ease: "power2.out", clearProps: "transform" });
        }
        const icon = item.querySelector(".problem-card-icon");
        if (icon) {
          gsap.to(icon, {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 0.8,
            delay: 0.25 + i * 0.12,
            ease: "back.out(2)",
            clearProps: "transform,opacity",
          });
        }
      });
    },
    "top 90%"
  );
}

// ---------------------------------------------------------------------------
// How it works: checklist steps slide in, check icons pop
// ---------------------------------------------------------------------------
function setupChecklist(root: HTMLElement) {
  const items = all("[data-check-item]", root);
  const icons = items.map((item) => item.querySelector("svg")).filter(Boolean);
  gsap.set(items, { opacity: 0, x: -24 });
  gsap.set(icons, { scale: 0, transformOrigin: "50% 50%" });

  batchReveal(items, (batch) => {
    gsap.to(batch, { opacity: 1, x: 0, duration: 0.85, ease: EASE_OUT, stagger: 0.1 });
    const batchIcons = batch.map((item) => item.querySelector("svg")).filter(Boolean);
    gsap.to(batchIcons, { scale: 1, duration: 0.6, delay: 0.15, ease: "back.out(3)", stagger: 0.1 });
  });
}

// ---------------------------------------------------------------------------
// AI services rows: index/title and description converge from opposite sides
// ---------------------------------------------------------------------------
function setupEditorialRows(root: HTMLElement) {
  const rows = all(".tech-row", root);
  const leads = rows.map((row) => row.firstElementChild).filter(Boolean);
  const descs = rows.map((row) => row.querySelector(".tech-row-desc")).filter(Boolean);
  gsap.set(leads, { opacity: 0, x: -36 });
  gsap.set(descs, { opacity: 0, x: 36 });

  batchReveal(rows, (batch) => {
    const batchLeads = batch.map((row) => row.firstElementChild).filter(Boolean);
    const batchDescs = batch.map((row) => row.querySelector(".tech-row-desc")).filter(Boolean);
    gsap.to(batchLeads, { opacity: 1, x: 0, duration: 1, ease: EASE_OUT, stagger: 0.08 });
    gsap.to(batchDescs, { opacity: 1, x: 0, duration: 1, ease: EASE_OUT, stagger: 0.08, delay: 0.1 });
  });
}

// ---------------------------------------------------------------------------
// Process: steps slide in; badge lights up as the scrubbed line reaches it
// ---------------------------------------------------------------------------
function setupProcess(root: HTMLElement, handled: Set<Element>) {
  const steps = all("[data-motion-process] > [data-reveal]", root);
  steps.forEach((el) => handled.add(el));

  gsap.set(steps, { opacity: 0, x: 32 });
  batchReveal(steps, (batch) => gsap.to(batch, { opacity: 1, x: 0, duration: 0.9, ease: EASE_OUT, stagger: 0.1 }), "top 85%");

  steps.forEach((step) => {
    const badge = step.querySelector(".timeline-badge");
    ScrollTrigger.create({
      trigger: step,
      start: "top 70%",
      onEnter: () => {
        step.classList.add("is-step-active");
        if (badge) gsap.fromTo(badge, { scale: 0.6 }, { scale: 1, duration: 0.6, ease: "back.out(3)" });
      },
      onLeaveBack: () => step.classList.remove("is-step-active"),
    });
  });
}

// ---------------------------------------------------------------------------
// Case studies: staggered rise + slow Ken Burns zoom-out on each image
// ---------------------------------------------------------------------------
function setupCaseStudies(root: HTMLElement, handled: Set<Element>) {
  const items = all(".case-study-teaser-item", root);
  items.forEach((el) => handled.add(el));
  const imageOf = (item: Element) => item.querySelector("img.case-study-card-image");

  gsap.set(items, { opacity: 0, y: 50, scale: 0.95 });
  gsap.set(items.map(imageOf).filter(Boolean), { scale: 1.12, transition: "none" });

  batchReveal(items, (batch) => {
    gsap.to(batch, { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: EASE_OUT, stagger: 0.12 });
    batch.forEach((item, i) => {
      const img = imageOf(item);
      if (img) {
        gsap.to(img, { scale: 1, duration: 2.2, delay: i * 0.12, ease: "power2.out", clearProps: "transform,transition" });
      }
    });
  });
}

function setupFaq(root: HTMLElement) {
  const items = all("[data-motion-faq] > div > div", root);
  gsap.set(items, { opacity: 0, y: 20 });
  batchReveal(items, (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.8, ease: EASE_OUT, stagger: 0.07 }), "top 92%");
}

// ---------------------------------------------------------------------------
// CTA: letter-by-letter heading, split description, actions rise
// ---------------------------------------------------------------------------
function setupCta(root: HTMLElement): Cleanup {
  const cta = root.querySelector<HTMLElement>(".cta-section-wrapper");
  if (!cta) return () => {};

  const chars = all(".reveal-heading-char", cta.querySelector("[data-motion-heading]") ?? cta);
  const desc = cta.querySelector<HTMLElement>(".section-sub-editorial");
  const actions = Array.from(cta.querySelector(".container")?.lastElementChild?.children ?? []) as HTMLElement[];
  const split = desc ? new SplitType(desc, { types: "words", wordClass: "motion-split-word" }) : null;
  const descWords = split?.words ?? [];

  gsap.set(chars, { opacity: 0, yPercent: 60 });
  gsap.set(descWords, { opacity: 0, y: 10 });
  gsap.set(actions, { opacity: 0, y: 20 });

  batchReveal(
    [cta],
    () => {
      const tl = gsap.timeline({ defaults: { ease: EASE_OUT } });
      tl.to(chars, { opacity: 1, yPercent: 0, duration: 0.9, stagger: 0.018 }, 0)
        .to(descWords, { opacity: 1, y: 0, duration: 0.6, stagger: 0.015 }, 0.45)
        .to(actions, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 }, 0.7);
    },
    "top 72%"
  );

  return () => split?.revert();
}

function setupGlowDrift(root: HTMLElement) {
  all("[data-glow-blob]", root).forEach((blob) => {
    const tween = gsap.to(blob, {
      xPercent: () => gsap.utils.random(-14, 14),
      yPercent: () => gsap.utils.random(-12, 12),
      scale: () => gsap.utils.random(0.88, 1.15),
      duration: gsap.utils.random(7, 11),
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      repeatRefresh: true,
      paused: true,
    });
    playWhileVisible(blob.closest("section"), [tween]);
  });
}

// ---------------------------------------------------------------------------
// Desktop-only: hero float bob + scroll depth, cursor parallax, tilt, magnetic
// ---------------------------------------------------------------------------
function setupHeroFloat(root: HTMLElement) {
  const hero = root.querySelector<HTMLElement>("[data-home-hero]");
  const visual = hero?.querySelector<HTMLElement>("[data-hero-visual]");
  if (!hero || !visual) return;

  const floats = all("[data-float-card], [data-float-badge]", visual).map((el, i) =>
    gsap.to(el, {
      y: i % 2 ? 9 : -11,
      duration: 2.6 + i * 0.45,
      delay: i * 0.2,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    })
  );
  playWhileVisible(hero, floats);

  const stage = visual.querySelector("[data-hero-visual-stage]");
  if (stage) {
    gsap.to(stage, {
      y: -90,
      ease: "none",
      scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
    });
  }
}

function setupHeroParallax(root: HTMLElement): Cleanup {
  const hero = root.querySelector<HTMLElement>("[data-home-hero]");
  if (!hero) return () => {};

  const layers = all("[data-depth]", hero).map((el) => ({
    depth: parseFloat(el.dataset.depth || "0.5"),
    x: gsap.quickTo(el, "x", { duration: 1.1, ease: "power3.out" }),
    y: gsap.quickTo(el, "y", { duration: 1.1, ease: "power3.out" }),
  }));

  const onMove = (e: PointerEvent) => {
    const r = hero.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    layers.forEach((l) => {
      l.x(-nx * 38 * l.depth);
      l.y(-ny * 28 * l.depth);
    });
  };
  const onLeave = () => layers.forEach((l) => (l.x(0), l.y(0)));

  hero.addEventListener("pointermove", onMove);
  hero.addEventListener("pointerleave", onLeave);
  return () => {
    hero.removeEventListener("pointermove", onMove);
    hero.removeEventListener("pointerleave", onLeave);
  };
}

function attachTilt(el: HTMLElement, maxTilt = 5): Cleanup {
  gsap.set(el, { transformPerspective: 1000 });
  const toX = gsap.quickTo(el, "rotationX", { duration: 0.6, ease: "power3.out" });
  const toY = gsap.quickTo(el, "rotationY", { duration: 0.6, ease: "power3.out" });

  const onMove = (e: PointerEvent) => {
    const r = el.getBoundingClientRect();
    toX((0.5 - (e.clientY - r.top) / r.height) * maxTilt * 2);
    toY(((e.clientX - r.left) / r.width - 0.5) * maxTilt * 2);
  };
  const onLeave = () => {
    toX(0);
    toY(0);
  };

  el.addEventListener("pointermove", onMove);
  el.addEventListener("pointerleave", onLeave);
  return () => {
    el.removeEventListener("pointermove", onMove);
    el.removeEventListener("pointerleave", onLeave);
  };
}

function attachMagnetic(el: HTMLElement, strength = 0.3): Cleanup {
  // The CSS hover rule transitions `transform`; drop that so it doesn't fight quickTo.
  gsap.set(el, { transition: "background-color 0.3s ease" });
  const toX = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
  const toY = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

  const onEnter = () => gsap.to(el, { scale: 1.03, duration: 0.4, ease: "power3.out" });
  const onMove = (e: PointerEvent) => {
    const r = el.getBoundingClientRect();
    const cx = r.left - (gsap.getProperty(el, "x") as number) + r.width / 2;
    const cy = r.top - (gsap.getProperty(el, "y") as number) + r.height / 2;
    toX((e.clientX - cx) * strength);
    toY((e.clientY - cy) * strength);
  };
  const onLeave = () => {
    toX(0);
    toY(0);
    gsap.to(el, { scale: 1, duration: 0.6, ease: "elastic.out(1, 0.5)" });
  };

  el.addEventListener("pointerenter", onEnter);
  el.addEventListener("pointermove", onMove);
  el.addEventListener("pointerleave", onLeave);
  return () => {
    el.removeEventListener("pointerenter", onEnter);
    el.removeEventListener("pointermove", onMove);
    el.removeEventListener("pointerleave", onLeave);
  };
}

function setupPointerEffects(root: HTMLElement): Cleanup {
  const cleanups: Cleanup[] = [setupHeroParallax(root)];
  const tiltTargets = [
    ...all(".home-stats-grid > [data-reveal]", root),
    ...all(BENTO_ITEMS, root),
    ...all(".case-study-teaser-item", root),
  ];
  tiltTargets.forEach((el) => cleanups.push(attachTilt(el)));
  all(".btn-editorial-solid", root).forEach((el) => cleanups.push(attachMagnetic(el)));
  return () => cleanups.forEach((fn) => fn());
}

/** Shared sections live in components used on other pages; tag them for the navbar scroll-spy here. */
function tagNavSections(root: HTMLElement) {
  root.querySelector(".case-study-teaser-section")?.setAttribute("data-nav-section", "/case-studies");
  root.querySelector(".cta-section-wrapper")?.setAttribute("data-nav-section", "/contact");
}

function scheduleRefreshes(root: HTMLElement): Cleanup {
  let timer: number | undefined;
  const refresh = () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => ScrollTrigger.refresh(), 120);
  };
  const pendingImages = all<HTMLImageElement>("img", root).filter((img) => !img.complete);

  requestAnimationFrame(refresh);
  document.fonts?.ready.then(refresh).catch(() => {});
  window.addEventListener("load", refresh);
  pendingImages.forEach((img) => img.addEventListener("load", refresh, { once: true }));

  return () => {
    window.clearTimeout(timer);
    window.removeEventListener("load", refresh);
    pendingImages.forEach((img) => img.removeEventListener("load", refresh));
  };
}

export function useHomeMotion(rootRef: RefObject<HTMLElement>) {
  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      tagNavSections(root);
      const mm = gsap.matchMedia();

      mm.add(MEDIA.motion, () => {
        const handled = new Set<Element>();
        const cleanups: Cleanup[] = [setupHeroIntro(root)];
        setupHeadings(root);
        setupSectionRules(root);
        cleanups.push(setupStats(root, handled));
        setupBento(root, handled);
        setupProcess(root, handled);
        setupCaseStudies(root, handled);
        setupChecklist(root);
        setupEditorialRows(root);
        setupFaq(root);
        cleanups.push(setupCta(root));
        setupGenericReveals(root, handled);
        setupGlowDrift(root);
        return () => cleanups.forEach((fn) => fn());
      });

      mm.add(MEDIA.heroVisual, () => setupHeroFloat(root));
      mm.add(MEDIA.finePointer, () => setupPointerEffects(root));

      document.documentElement.classList.remove(HERO_PENDING_CLASS);
      const stopRefreshes = scheduleRefreshes(root);

      return () => {
        stopRefreshes();
        mm.revert();
      };
    },
    { scope: rootRef }
  );
}
