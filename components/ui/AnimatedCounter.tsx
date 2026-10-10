"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";
import { ease } from "@/lib/motion";

type AnimatedCounterProps = {
  value: number;
  decimals?: number;
  className?: string;
};

/** Counts up from 0 to `value` once it scrolls into view. Generic enough for
 * any numeric stat (currently used for the "5.0" rating and "24" reviews).
 *
 * Always starts rendering "0" on both server and client — the count-up
 * (or instant jump, for reduced-motion) only happens client-side inside the
 * effect below, so there's no server/client text mismatch on hydration. */
export function AnimatedCounter({ value, decimals = 0, className }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Reduced motion still goes through animate() (duration 0 = an instant
    // jump) so the state update stays inside the same onUpdate callback
    // either way, rather than a bare setState call in the effect body.
    const controls = animate(0, value, {
      duration: reduceMotion ? 0 : 1.2,
      ease: ease.out,
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className={className}>
      {display.toFixed(decimals)}
    </span>
  );
}
