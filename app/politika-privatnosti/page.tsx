import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { PrivacyPolicyBody } from "@/components/sections/PrivacyPolicyBody";
import { privacy } from "@/content/privacy";

export const metadata: Metadata = {
  title: privacy.heading,
  description: "Politika privatnosti Vrtne oaze Beljan.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
      <Reveal>
        <h1 className="font-display text-4xl font-semibold text-forest sm:text-5xl">
          {privacy.heading}
        </h1>
        <p className="mt-3 font-display text-lg font-semibold text-ink">{privacy.companyLine}</p>
        <span className="mt-2 inline-block font-sans text-xs font-semibold tracking-[0.15em] text-amber uppercase">
          {privacy.effectiveDate}
        </span>
        <p className="mt-6 leading-relaxed text-ink-soft">{privacy.intro}</p>
      </Reveal>

      <Reveal
        as="div"
        className="mt-10 rounded-card bg-cream-dark p-5"
      >
        <p className="font-sans text-xs font-semibold tracking-[0.15em] text-amber uppercase">
          Sadržaj
        </p>
        <ul className="mt-3 grid gap-x-6 gap-y-1.5 font-sans text-sm sm:grid-cols-2">
          {privacy.sections.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="text-ink-soft transition-colors hover:text-forest">
                {s.number}. {s.heading}
              </a>
            </li>
          ))}
        </ul>
      </Reveal>

      <div className="mt-12">
        <PrivacyPolicyBody sections={privacy.sections} />
      </div>
    </div>
  );
}
