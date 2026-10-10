import type { Metadata } from "next";
import { FileDown } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { privacy } from "@/content/privacy";

export const metadata: Metadata = {
  title: privacy.heading,
  description: "Politika privatnosti Vrtne oaze Beljan.",
};

export default function PrivacyPolicyPage() {
  const hasContent = privacy.paragraphs.length > 0;

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
      <Reveal>
        <h1 className="font-display text-4xl font-semibold text-forest sm:text-5xl">
          {privacy.heading}
        </h1>

        {hasContent ? (
          <div className="mt-8 space-y-4 font-sans text-ink-soft">
            {privacy.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-card border border-dashed border-sage/40 bg-cream-dark p-6 font-sans text-ink-soft">
            <p>
              Sadržaj ove stranice još čeka izvorni dokument politike privatnosti.
              Ovdje će se prikazati točan tekst, prenesen od riječi do riječi, čim
              dokument bude dostupan.
            </p>
          </div>
        )}

        <a
          href={privacy.pdfHref}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-pill bg-forest px-5 py-2.5 font-sans text-sm font-semibold text-cream shadow-soft transition-transform hover:scale-[1.02]"
        >
          <FileDown size={16} aria-hidden="true" />
          {privacy.pdfDownloadLabel}
        </a>
      </Reveal>
    </div>
  );
}
