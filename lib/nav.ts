/**
 * Primary nav links. `href` always starts with "/#" so the link works
 * identically from any route (see components/layout/ScrollToAnchor.tsx) —
 * same anchor ids the live site uses (#services, #work, #about, #contact-methods).
 */
export const navLinks = [
  { label: "Usluge", href: "/#services" },
  { label: "Naši radovi", href: "/#work" },
  { label: "O nama", href: "/#about" },
  { label: "Kontakt", href: "/#contact-methods" },
  { label: "Izbornik", href: "/izbornik" },
] as const;

export const ctaLink = { label: "Kontaktirajte nas", href: "/#contact-methods" } as const;
