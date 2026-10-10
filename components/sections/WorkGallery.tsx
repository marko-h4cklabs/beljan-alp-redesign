import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { work } from "@/content/home";

export function WorkGallery() {
  return (
    <section id="work" data-scroll-section className="bg-cream-dark">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <SectionHeading eyebrow={work.eyebrow} heading={work.heading} />

        <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {work.items.map((item, i) => (
            <Reveal as="li" key={item.image} delay={i * 0.06}>
              <div className="group relative aspect-[3/4] overflow-hidden rounded-card shadow-soft">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 640px) 33vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <span className="font-sans text-[10px] font-semibold tracking-[0.15em] text-amber-light uppercase">
                    {item.tag}
                  </span>
                  <h3 className="mt-1 font-display text-base font-semibold text-cream sm:text-lg">
                    {item.caption}
                  </h3>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-10 flex justify-center">
          <Link
            href={work.ctaHref}
            className="group inline-flex items-center gap-2 rounded-pill bg-forest px-6 py-3 font-sans text-sm font-semibold text-cream shadow-soft transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {work.cta}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
