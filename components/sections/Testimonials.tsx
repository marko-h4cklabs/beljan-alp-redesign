import { ExternalLink, Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { testimonials } from "@/content/home";
import { business } from "@/content/business";

export function Testimonials() {
  return (
    <section className="bg-cream-dark">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <SectionHeading eyebrow={testimonials.eyebrow} heading={testimonials.heading} />

        <ul className="mt-12 grid gap-5 lg:grid-cols-3">
          {testimonials.items.map((t, i) => (
            <Reveal as="li" key={t.name} delay={i * 0.08}>
              <div className="flex h-full flex-col rounded-card bg-cream p-7 shadow-soft">
                <div className="flex gap-0.5 text-amber">
                  {Array.from({ length: Math.round(business.rating.value) }).map((_, s) => (
                    <Star key={s} size={16} fill="currentColor" strokeWidth={0} aria-hidden="true" />
                  ))}
                </div>
                <p className="mt-4 flex-1 font-sans text-sm text-ink-soft">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-6 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest font-sans text-sm font-semibold text-cream">
                    {t.initial}
                  </span>
                  <div>
                    <p className="font-sans text-sm font-semibold text-forest">{t.name}</p>
                    <p className="font-sans text-xs text-ink-soft">{t.country}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-8">
          <a
            href={business.facebookUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-forest transition-colors hover:text-forest-light"
          >
            {testimonials.facebookLinkLabel}
            <ExternalLink size={14} aria-hidden="true" />
          </a>
          <a
            href={testimonials.googleLinkHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-forest transition-colors hover:text-forest-light"
          >
            {testimonials.googleLinkLabel}
            <ExternalLink size={14} aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
