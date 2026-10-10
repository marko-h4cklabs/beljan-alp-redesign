"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function scrollToHash(hash: string) {
  if (!hash) return;
  const el = document.getElementById(hash.slice(1));
  if (!el) return;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  requestAnimationFrame(() => {
    el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  });
}

/**
 * Mounted once in the root layout. Handles scrolling to an anchor section
 * after landing on a route with a hash in the URL — covers both a fresh
 * page load (e.g. a bookmarked "/#about") and arriving via client-side
 * navigation from another route (e.g. clicking "Usluge" from /galerija,
 * which Next.js Link navigates to "/#services"). Same-route anchor clicks
 * are handled directly by components/layout/NavLink.tsx without a route
 * change, so this component doesn't need to react to hash-only changes.
 */
export function ScrollToAnchor() {
  const pathname = usePathname();

  useEffect(() => {
    scrollToHash(window.location.hash);
  }, [pathname]);

  return null;
}
