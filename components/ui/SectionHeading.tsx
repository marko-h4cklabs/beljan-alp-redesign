import clsx from "clsx";
import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  heading: ReactNode;
  intro?: string;
  /** Use on dark (forest) section backgrounds. */
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  heading,
  intro,
  tone = "light",
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={clsx(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <span
          className={clsx(
            "font-sans text-xs font-semibold tracking-[0.2em] uppercase",
            tone === "dark" ? "text-amber-light" : "text-amber",
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={clsx(
          "mt-3 font-display text-3xl font-semibold sm:text-4xl",
          tone === "dark" ? "text-cream" : "text-forest",
        )}
      >
        {heading}
      </h2>
      {intro && (
        <p
          className={clsx(
            "mt-4 font-sans",
            tone === "dark" ? "text-cream/80" : "text-ink-soft",
          )}
        >
          {intro}
        </p>
      )}
    </Reveal>
  );
}
