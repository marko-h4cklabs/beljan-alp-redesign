/**
 * Central motion tokens — every animated component should read from here
 * instead of hardcoding durations/easings, so the whole site's motion feel
 * stays consistent and tunable from one place.
 */
export const duration = {
  fast: 0.15,
  base: 0.25,
  slow: 0.5,
  hero: 0.8,
} as const;

export const ease = {
  // gentle deceleration, used for reveals and most entrances
  out: [0.22, 1, 0.36, 1],
  // for things leaving the screen / collapsing
  in: [0.4, 0, 1, 1],
} as const;

export const spring = {
  // snappy hover feedback (cards, buttons)
  hover: { type: "spring", stiffness: 300, damping: 30 },
} as const;

/** Standard fade + rise reveal, meant for `motion`'s `whileInView`. */
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
} as const;

/** Stagger helper for parent containers revealing a list of children. */
export function staggerChildren(delayPerChild = 0.08) {
  return {
    visible: {
      transition: { staggerChildren: delayPerChild },
    },
  } as const;
}
