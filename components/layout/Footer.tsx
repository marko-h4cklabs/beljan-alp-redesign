import Image from "next/image";
import Link from "next/link";
import { business } from "@/content/business";

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.45 2.9h-2.33V22c4.78-.79 8.44-4.94 8.44-9.94Z" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth={1.5}
      />
      <path d="M14 3v5h5" stroke="currentColor" strokeWidth={1.5} />
    </svg>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-forest-dark text-cream">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/images/shared/logo-badge.png"
                alt="Vrtna oaza Beljan logo"
                width={1920}
                height={1886}
                className="h-12 w-12"
              />
              <span className="font-display text-xl font-semibold">{business.name}</span>
            </div>
            <a
              href={business.facebookUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Vrtna oaza Beljan na Facebooku"
              className="mt-6 inline-flex h-9 w-9 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-cream/20"
            >
              <FacebookIcon />
            </a>
          </div>

          <div className="font-sans text-sm leading-relaxed text-cream/80">
            <h4 className="font-display text-base font-semibold text-cream">
              Podaci o tvrtki
            </h4>

            <div className="mt-4 space-y-4">
              <p>
                <span className="font-semibold text-cream">{business.name}</span>
                <br />
                {business.legalForm}
                <br />
                {business.ownerPrefixed}
              </p>

              <p>
                {business.address.street}
                <br />
                {business.address.city}
              </p>

              <p>{business.phoneDisplay}</p>

              <p>
                Matični broj: {business.maticniBroj}
                <br />
                OIB: {business.oib}
              </p>

              <p>{business.vatNote}</p>

              <p>{business.registryNote}</p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col-reverse items-start justify-between gap-4 border-t border-cream/10 pt-6 text-xs text-cream/60 sm:flex-row sm:items-center">
          <p>
            © {year} {business.name}. Sva prava pridržana.
          </p>
          <Link
            href="/politika-privatnosti"
            className="inline-flex items-center gap-1.5 text-cream/80 transition-colors hover:text-cream"
          >
            <DocumentIcon />
            Politika privatnosti
          </Link>
        </div>
      </div>
    </footer>
  );
}
