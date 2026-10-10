"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { fadeUp, ease, duration } from "@/lib/motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

type RevealProps = {
  children: ReactNode;
  /** Stagger delay in seconds, typically `index * 0.08`. */
  delay?: number;
  className?: string;
  as?: "div" | "li";
};

/**
 * Standard scroll-reveal wrapper (fade + rise, once).
 *
 * For reduced-motion users this renders content already visible instead of
 * merely making the *transition* instant — `whileInView` is gated on an
 * IntersectionObserver, so content below the fold would otherwise stay
 * invisible (opacity: 0) until actually scrolled into view, which is the
 * wrong behavior for someone who turned off animations precisely to avoid
 * depending on motion/scroll choreography (e.g. jumping straight to a
 * section via a link should show it immediately, not leave it hidden).
 *
 * Uses `useReducedMotionSafe` (not `motion`'s `useReducedMotion`) because it
 * renders the same markup on the server and the client's first paint,
 * avoiding a hydration mismatch — the switch to the reduced-motion variant
 * only happens on a normal client re-render right after hydration.
 */
export function Reveal({ children, delay = 0, className, as = "div" }: RevealProps) {
  const reduceMotion = useReducedMotionSafe();

  const motionProps = reduceMotion
    ? {
        initial: "visible",
        animate: "visible",
        variants: fadeUp,
        className,
      }
    : {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, margin: "-10% 0px" },
        variants: fadeUp,
        transition: { duration: duration.slow, ease: ease.out, delay },
        className,
      };

  return as === "li" ? (
    <motion.li {...motionProps}>{children}</motion.li>
  ) : (
    <motion.div {...motionProps}>{children}</motion.div>
  );
}
