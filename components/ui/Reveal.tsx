"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { fadeUp, ease, duration } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  /** Stagger delay in seconds, typically `index * 0.08`. */
  delay?: number;
  className?: string;
  as?: "div" | "li";
};

/**
 * Standard scroll-reveal wrapper (fade + rise, once). Reduced-motion
 * handling comes from the app-wide `<MotionConfig reducedMotion="user">`
 * in the root layout, not a local branch here — that keeps the rendered
 * markup identical between server and client (avoiding hydration
 * mismatches), while Motion still neutralizes the animation itself for
 * users who prefer reduced motion.
 */
export function Reveal({ children, delay = 0, className, as = "div" }: RevealProps) {
  const motionProps = {
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, margin: "-10% 0px" },
    variants: fadeUp,
    transition: { duration: duration.slow, ease: ease.out, delay },
    className,
  } as const;

  return as === "li" ? (
    <motion.li {...motionProps}>{children}</motion.li>
  ) : (
    <motion.div {...motionProps}>{children}</motion.div>
  );
}
