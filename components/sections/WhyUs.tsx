import { Check } from "lucide-react";
import { BackgroundVideo } from "@/components/ui/BackgroundVideo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { whyUs } from "@/content/home";

export function WhyUs() {
  return (
    <section className="relative overflow-hidden bg-forest-dark text-cream">
      <BackgroundVideo
        srcMp4={whyUs.videoSrc}
        srcWebm={whyUs.videoSrcWebm}
        poster={whyUs.poster}
        alt="Alpinistički rad na stablu"
      />
      <div className="absolute inset-0 bg-forest-dark/75" />

      <div className="relative mx-auto max-w-3xl px-5 py-24 sm:px-8">
        <SectionHeading eyebrow={whyUs.eyebrow} heading={whyUs.heading} tone="dark" />

        <ul className="mt-8 space-y-4">
          {whyUs.points.map((point, i) => (
            <Reveal as="li" key={point} delay={i * 0.08} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-amber text-forest-dark">
                <Check size={14} strokeWidth={3} aria-hidden="true" />
              </span>
              <p className="font-sans text-cream/90">{point}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
