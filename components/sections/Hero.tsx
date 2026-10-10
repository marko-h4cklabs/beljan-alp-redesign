"use client";

import { motion } from "motion/react";
import { BackgroundVideo } from "@/components/ui/BackgroundVideo";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { NavLink } from "@/components/layout/NavLink";
import { business } from "@/content/business";
import { hero } from "@/content/home";
import { staggerChildren } from "@/lib/motion";

const container = {
  hidden: {},
  visible: staggerChildren(0.15).visible,
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-amber-light" aria-hidden="true">
      <path d="M12 2.5l2.9 6.2 6.8.7-5.1 4.6 1.5 6.7L12 17l-6.1 3.7 1.5-6.7-5.1-4.6 6.8-.7Z" />
    </svg>
  );
}

export function Hero() {
  return (
    <section
      id="hero"
      data-scroll-section
      // Cancels out <main>'s global header-height padding so the video
      // bleeds to the true top of the viewport, behind the transparent
      // sticky header (the header stays fixed/overlaid regardless).
      style={{ marginTop: "calc(var(--header-height) * -1)" }}
      className="relative flex min-h-[85vh] items-center overflow-hidden bg-forest-dark text-cream"
    >
      <BackgroundVideo
        srcMp4={hero.videoSrc}
        srcMp4Mobile={hero.videoSrcMobile}
        poster={hero.poster}
        alt="Alpinističko rušenje teško dostupnog drveća"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/95 via-forest-dark/65 to-forest-dark/25" />
      {/* Keeps the transparent header legible over bright video/poster
          frames regardless of scroll state — independent of the gradient
          above, which is tuned for the headline block lower down. Widened
          and darkened slightly as a safety margin against real footage,
          which can be brighter at the very top than the placeholder. */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/60 to-transparent" />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={container}
        className="relative mx-auto flex max-w-4xl flex-col items-center px-5 py-32 text-center sm:px-8"
      >
        <motion.div variants={item} className="flex items-center gap-2 font-sans text-sm text-cream/90">
          <StarIcon />
          <span className="font-semibold">
            <AnimatedCounter value={business.rating.value} decimals={1} />
          </span>
          <span aria-hidden="true">—</span>
          <span>
            <AnimatedCounter value={business.rating.count} /> recenzija
          </span>
        </motion.div>

        <motion.h1
          variants={item}
          className="mt-6 font-display text-4xl font-semibold leading-tight sm:text-6xl"
        >
          {hero.headingLine1}
          <br />
          {hero.headingLine2}
        </motion.h1>

        <motion.div variants={item} className="mt-8">
          <NavLink
            href="/#contact-methods"
            className="inline-block rounded-pill bg-cream px-7 py-3 font-sans text-sm font-semibold text-forest-dark shadow-lift transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            {hero.cta}
          </NavLink>
        </motion.div>
      </motion.div>
    </section>
  );
}
