import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-start justify-center px-5 py-24 sm:px-8">
      <span className="font-sans text-xs font-semibold tracking-[0.2em] text-amber uppercase">
        404
      </span>
      <h1 className="mt-4 font-display text-4xl font-semibold text-forest sm:text-5xl">
        Stranica nije pronađena
      </h1>
      <p className="mt-4 max-w-xl font-sans text-ink-soft">
        Stranica koju tražite ne postoji ili je premještena.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-pill bg-forest px-5 py-2.5 font-sans text-sm font-semibold text-cream shadow-soft transition-transform hover:scale-[1.02]"
      >
        Natrag na početnu
      </Link>
    </div>
  );
}
