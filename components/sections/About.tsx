import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { about } from "@/content/home";

export function About() {
  return (
    <section id="about" data-scroll-section className="bg-cream">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:items-center">
        <Reveal className="relative aspect-[4/5] overflow-hidden rounded-card shadow-lift lg:order-2">
          <Image
            src={about.image.src}
            alt={about.image.alt}
            fill
            sizes="(min-width: 1024px) 45vw, 90vw"
            className="object-cover"
          />
        </Reveal>

        <Reveal className="lg:order-1">
          <span className="font-sans text-xs font-semibold tracking-[0.2em] text-amber uppercase">
            {about.eyebrow}
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-forest sm:text-4xl">
            {about.heading}
          </h2>
          <div className="mt-5 space-y-4 font-sans text-ink-soft">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
