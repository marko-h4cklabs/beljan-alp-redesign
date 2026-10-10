import { useEffect, useState } from "react";

/**
 * Hydration-safe reduced-motion check: renders `false` on the server and the
 * client's first paint (matching, so no hydration mismatch), then corrects
 * to the real value via a guaranteed post-mount effect.
 *
 * Deliberately NOT implemented with `useSyncExternalStore` — that only
 * re-evaluates `getSnapshot` when the subscription's `change` event fires
 * or some OTHER re-render happens to occur; `prefers-reduced-motion`'s
 * `change` event only fires if the OS setting flips *during* the session,
 * so a component with no other reactive state (like `Reveal`) can get
 * stuck showing the stale server snapshot forever. A plain effect that
 * calls `setState` once on mount guarantees the real value actually lands.
 */
export function useReducedMotionSafe(): boolean {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    function sync() {
      setReduceMotion(mq.matches);
    }
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return reduceMotion;
}
