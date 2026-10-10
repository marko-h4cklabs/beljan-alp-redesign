"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import { useReducedMotion } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import type { WorkItem } from "@/content/types";

export function GalleryGrid({ items }: { items: WorkItem[] }) {
  const [index, setIndex] = useState(-1);
  const reduceMotion = useReducedMotion();

  const slides = items.map((item) => ({
    src: item.image,
    alt: item.alt,
    title: item.caption,
    description: item.tag,
  }));

  return (
    <>
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {items.map((item, i) => (
          <Reveal as="li" key={item.image + item.caption} delay={i * 0.06}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Prikaži sliku: ${item.caption}`}
              className="group relative block aspect-[3/4] w-full overflow-hidden rounded-card shadow-soft"
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(min-width: 640px) 33vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-left">
                <span className="font-sans text-[10px] font-semibold tracking-[0.15em] text-amber-light uppercase">
                  {item.tag}
                </span>
                <h3 className="mt-1 font-display text-base font-semibold text-cream sm:text-lg">
                  {item.caption}
                </h3>
              </div>
            </button>
          </Reveal>
        ))}
      </ul>

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={slides}
        plugins={[Captions]}
        animation={{ fade: reduceMotion ? 0 : 250, swipe: reduceMotion ? 0 : 300 }}
      />
    </>
  );
}
