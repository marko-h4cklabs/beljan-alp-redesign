import { Reveal } from "@/components/ui/Reveal";
import { intro } from "@/content/home";

export function IntroStrip() {
  return (
    <section className="bg-cream-dark">
      <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-8 sm:py-20">
        <Reveal>
          <h2 className="font-display text-2xl font-semibold text-forest sm:text-3xl">
            {intro.heading}
          </h2>
          <p className="mt-3 font-sans text-ink-soft">{intro.paragraph}</p>
        </Reveal>
      </div>
    </section>
  );
}
