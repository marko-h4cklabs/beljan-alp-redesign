import { useSyncExternalStore } from "react";

function getSnapshot(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getServerSnapshot(): boolean {
  return false;
}

function subscribe(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

/**
 * Hydration-safe reduced-motion check. Unlike `motion`'s own
 * `useReducedMotion()`, this is guaranteed to render the same value on the
 * server and the client's first paint (always `false`), only switching to
 * the real value on the client right after hydration. Use this whenever a
 * component needs to change *which props/markup* it renders based on
 * reduced motion — `useReducedMotion()` resolves synchronously on the
 * client's very first render, which causes a hydration mismatch the moment
 * the real preference differs from the SSR default.
 */
export function useReducedMotionSafe(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
