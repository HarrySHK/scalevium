'use client';

import React, { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useMotionLayer } from "@/components/motion/MotionLayerContext";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const managedByMotionLayer = useMotionLayer();

  if (managedByMotionLayer) {
    return (
      <div className={className || undefined} data-reveal="">
        {children}
      </div>
    );
  }

  const getInitial = () => {
    if (shouldReduceMotion) return { opacity: 1, x: 0, y: 0 };
    switch (direction) {
      case "up": return { y: 40, opacity: 0 };
      case "down": return { y: -40, opacity: 0 };
      case "left": return { x: 40, opacity: 0 };
      case "right": return { x: -40, opacity: 0 };
      default: return { y: 40, opacity: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.8,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
