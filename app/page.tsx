const sections = [
  { id: "hero", label: "Hero" },
  { id: "services", label: "Naše usluge" },
  { id: "work", label: "Naši radovi" },
  { id: "about", label: "O nama" },
  { id: "contact-methods", label: "Kontaktirajte nas" },
];

export default function HomePage() {
  return (
    <>
      {sections.map((section, i) => (
        <section
          key={section.id}
          id={section.id}
          data-scroll-section
          className={i % 2 === 0 ? "bg-cream" : "bg-cream-dark"}
        >
          <div className="mx-auto flex min-h-[70vh] max-w-6xl flex-col items-start justify-center px-5 py-24 sm:px-8">
            <span className="font-sans text-xs font-semibold tracking-[0.2em] text-amber uppercase">
              Korak 1 — prikaz izbornika
            </span>
            <h1 className="mt-4 max-w-2xl font-display text-4xl font-semibold text-forest sm:text-5xl">
              {section.label}
            </h1>
            <p className="mt-4 max-w-xl font-sans text-ink-soft">
              Pravi sadržaj ove sekcije stiže u 2. koraku (izrada početne stranice).
              Ovo je privremeni blok koji dokazuje da izbornik, skrolanje na sidrene
              poveznice i uređenje rade ispravno.
            </p>
          </div>
        </section>
      ))}
    </>
  );
}
