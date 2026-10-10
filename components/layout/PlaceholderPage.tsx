export function PlaceholderPage({ title, step }: { title: string; step: string }) {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-start justify-center px-5 py-24 sm:px-8">
      <span className="font-sans text-xs font-semibold tracking-[0.2em] text-amber uppercase">
        {step}
      </span>
      <h1 className="mt-4 font-display text-4xl font-semibold text-forest sm:text-5xl">
        {title}
      </h1>
      <p className="mt-4 max-w-xl font-sans text-ink-soft">
        Pravi sadržaj ove stranice stiže u idućem koraku izrade. Ovo je privremeni
        prikaz koji potvrđuje da izbornik, ruta i raspored stranice rade ispravno.
      </p>
    </div>
  );
}
