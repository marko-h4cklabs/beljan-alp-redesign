"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import clsx from "clsx";
import { navLinks, ctaLink } from "@/lib/nav";
import { ease } from "@/lib/motion";
import { NavLink } from "./NavLink";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  // Only the homepage has a full-bleed dark hero behind the header, which is
  // what the transparent/light-text treatment is for. Every other route
  // starts with a plain cream background, so the header must render solid
  // there from the very top of the page — otherwise light text on a light
  // page background is unreadable.
  const isHomepage = pathname === "/";
  const solid = !isHomepage || scrolled;

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile drawer whenever the viewport grows back to desktop size.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    function handle(e: MediaQueryListEvent) {
      if (e.matches) setMenuOpen(false);
    }
    mq.addEventListener("change", handle);
    return () => mq.removeEventListener("change", handle);
  }, []);

  return (
    <header
      data-scrolled={solid}
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,padding] duration-300",
        solid
          ? "bg-cream/90 shadow-soft backdrop-blur-sm"
          : "bg-cream/0",
      )}
      style={{ height: "var(--header-height)" }}
    >
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
          <Image
            src="/images/shared/logo-badge.png"
            alt="Vrtna oaza Beljan logo"
            width={1920}
            height={1886}
            className={clsx(
              "h-9 w-9 transition sm:h-10 sm:w-10",
              !solid && "brightness-0 invert",
            )}
            priority
          />
          <span
            className={clsx(
              "font-display text-lg font-semibold tracking-tight transition-colors sm:text-xl",
              solid ? "text-forest" : "text-cream",
            )}
          >
            Vrtna oaza Beljan
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              className={clsx(
                "font-sans text-sm font-medium transition-colors",
                solid ? "text-ink-soft hover:text-forest" : "text-cream/90 hover:text-cream",
              )}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <NavLink
            href={ctaLink.href}
            className="rounded-pill bg-forest px-5 py-2.5 font-sans text-sm font-semibold text-cream shadow-soft transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {ctaLink.label}
          </NavLink>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className={clsx(
            "flex h-10 w-10 items-center justify-center rounded-full transition-colors lg:hidden",
            solid || menuOpen ? "text-forest" : "text-cream",
          )}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {menuOpen ? (
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
            transition={{ duration: 0.2, ease: ease.out }}
            className="border-t border-sage/20 bg-cream px-5 pb-6 pt-4 shadow-soft lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <NavLink
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-lg px-3 py-3 font-sans text-base font-medium text-ink transition-colors hover:bg-cream-dark"
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <NavLink
              href={ctaLink.href}
              onClick={() => setMenuOpen(false)}
              className="mt-3 block rounded-pill bg-forest px-5 py-3 text-center font-sans text-sm font-semibold text-cream"
            >
              {ctaLink.label}
            </NavLink>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
