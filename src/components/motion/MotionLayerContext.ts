"use client";

import { createContext, useContext } from "react";

/**
 * `true` inside a page whose scroll animation is driven by a page-level GSAP layer
 * (currently only the Home page). Shared components then render their final,
 * fully visible state and skip their own built-in reveal so the two systems never
 * animate the same element.
 */
export const MotionLayerContext = createContext(false);

export function useMotionLayer(): boolean {
  return useContext(MotionLayerContext);
}
