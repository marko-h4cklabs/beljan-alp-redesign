import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { galerija } from "@/content/galerija";

export const metadata: Metadata = {
  title: galerija.heading,
  description:
    "Pogledajte fotografije uspješno završenih projekata rušenja, orezivanja i njege stabala tvrtke Vrtna oaza Beljan iz Međimurja.",
};

export default function GalerijaPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <Reveal>
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-sans text-sm font-medium text-ink-soft transition-colors hover:text-forest"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          {galerija.backLinkLabel}
        </Link>

        <span className="mt-8 block font-sans text-xs font-semibold tracking-[0.2em] text-amber uppercase">
          {galerija.eyebrow}
        </span>
        <h1 className="mt-3 font-display text-4xl font-semibold text-forest sm:text-5xl">
          {galerija.heading}
        </h1>
        <p className="mt-4 max-w-xl font-sans text-ink-soft">{galerija.intro}</p>
      </Reveal>

      <div className="mt-10">
        <GalleryGrid items={galerija.items} />
      </div>

      <Reveal className="mt-8 text-center">
        <p className="font-sans text-sm text-ink-soft">{galerija.lightboxHint}</p>
      </Reveal>
    </div>
  );
}
