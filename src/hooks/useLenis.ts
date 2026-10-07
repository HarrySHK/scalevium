"use client";

import { createContext, useContext } from "react";
import type Lenis from "lenis";

/** Active Lenis instance when smooth scroll is enabled; `null` when reduced motion or before mount. */
export const LenisContext = createContext<Lenis | null>(null);

export function useLenis(): Lenis | null {
  return useContext(LenisContext);
}
