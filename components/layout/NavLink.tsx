"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, MouseEvent, ReactNode } from "react";

type NavLinkProps = Omit<ComponentProps<typeof Link>, "children"> & {
  href: string;
  children: ReactNode;
};

/**
 * Wraps next/link for the nav/CTA links, which are always of the form
 * "/#section-id" or a plain route like "/izbornik". When the link's path
 * matches the current route (we're already on "/"), it intercepts the click
 * and scrolls to the section directly instead of letting Next.js perform a
 * full client-side navigation to itself — avoids a redundant route
 * transition for the common case of clicking a section link while already
 * on the homepage.
 */
export function NavLink({ href, children, onClick, ...rest }: NavLinkProps) {
  const pathname = usePathname();

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    onClick?.(e);
    if (e.defaultPrevented) return;

    const [path, hash] = href.split("#");
    if (!hash) return;
    if (path !== pathname && !(path === "" && pathname === "/")) return;

    e.preventDefault();
    const el = document.getElementById(hash);
    if (!el) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    window.history.pushState(null, "", `#${hash}`);
  }

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
