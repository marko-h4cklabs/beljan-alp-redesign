import type { ServiceItem, WorkItem, Testimonial } from "./types";

export const hero = {
  headingLine1: "Alpinističko rušenje",
  headingLine2: "teško dostupnog drveća",
  cta: "Kontaktirajte nas",
  videoSrc: "/videos/hero.mp4",
  videoSrcMobile: "/videos/hero-mobile.mp4",
  poster: "/images/hero-poster.jpg",
};

export const intro = {
  heading: "Imate stablo koje ugrožava sigurnost i vašu imovinu?",
  paragraph: "Mi ćemo ukloniti drvo za vas i pritom štititi imovinu.",
};

export const services = {
  eyebrow: "ŠTO RADIMO",
  heading: "Naše usluge",
  intro:
    "Od redovitog održavanja do hitnih uklanjanja, pružamo sveobuhvatna rješenja za njegu stabala prilagođena vašim potrebama.",
  items: [
    {
      title: "Rušenje drveća",
      description: "Sigurno i stručno uklanjanje drveća s vašeg imanja uz minimalne smetnje.",
    },
    {
      title: "Orezivanje grmova i živica",
      description: "Profesionalno oblikovanje i održavanje grmova i živica za uredan izgled vrta.",
    },
    {
      title: "Skraćivanje krošnje drveća",
      description: "Stručno skraćivanje i oblikovanje krošnji za zdravlje stabala i estetiku.",
    },
    {
      title: "Odvoz otpadnog materijala",
      description: "Kompletno čišćenje i odvoz svih ostataka nakon obavljenog posla.",
    },
    {
      title: "Krčenje zapuštenih parcela",
      description: "Temeljito čišćenje zapuštenih i zaraslih zemljišta za novu namjenu.",
    },
    {
      title: "Redovita košnja travnjaka",
      description: "Redovito održavanje travnjaka za uredan i zdrav izgled vaše okućnice.",
    },
  ] satisfies ServiceItem[],
};

export const work = {
  eyebrow: "GALERIJA",
  heading: "Uspješno srušena drva",
  items: [
    {
      image: "/images/home/work-01-rusenje-visokog-stabla.jpg",
      alt: "Rušenje visokog stabla",
      tag: "RUŠENJE DRVEĆA",
      caption: "Rušenje visokog stabla",
    },
    {
      image: "/images/home/work-02-rad-na-visini.jpg",
      alt: "Rad na visini",
      tag: "RUŠENJE DRVEĆA",
      caption: "Rad na visini",
    },
    {
      image: "/images/home/work-03-alpinisticko-rusenje.jpg",
      alt: "Alpinističko rušenje",
      tag: "SKRAĆIVANJE KROŠNJE",
      caption: "Alpinističko rušenje",
    },
    {
      image: "/images/home/work-04-rad-u-krosnji.jpg",
      alt: "Rad u krošnji",
      tag: "RUŠENJE DRVEĆA",
      caption: "Rad u krošnji",
    },
    {
      image: "/images/home/work-05-tehnika-rusenja.png",
      alt: "Tehnika rušenja",
      tag: "OREZIVANJE DRVEĆA",
      caption: "Tehnika rušenja",
    },
    {
      image: "/images/home/work-06-zimsko-orezivanje.png",
      alt: "Zimsko orezivanje",
      tag: "OREZIVANJE DRVEĆA",
      caption: "Zimsko orezivanje",
    },
  ] satisfies WorkItem[],
  cta: "Galerija radova",
  ctaHref: "/galerija" as const,
};

export const about = {
  eyebrow: "O NAMA",
  heading: "Stručnjaci za rušenje drveća",
  paragraphs: [
    "Glavna osoba za rušenje drveća je Alfonz Beljan, čije iskustvo omogućuje sigurno uklanjanje drveća po vašem upitu.",
    "Obzirom na zahtjevnost i potencijalnu opasnost rušenja teško dostupnog drveća, potrebno je znanje, iskustvo, hrabrost, te mogućnost rukovanja motornom pilom na visini.",
    "Zato nam se obratite s povjerenjem i učinite vašu okućnicu sigurnijom i uređenom po vašoj želji.",
  ],
  image: {
    src: "/images/home/about-alfonz-beljan.png",
    alt: "Alfonz Beljan - stručnjak za rušenje drveća",
  },
};

export const testimonials = {
  eyebrow: "ISKUSTVA",
  heading: "Što ljudi kažu o nama?",
  items: [
    {
      quote:
        "Dečki znaju što rade. Zahtjevan posao odradili brzo i profesionalno bez ikakve štete. Iskrene preporuke za sve koji trebaju rušenje drveća na nepristupačnim lokacijama.",
      name: "Damir Zganec",
      country: "Hrvatska",
      initial: "D",
    },
    {
      quote:
        "Dečki su odlični, simpatični i što je najvažnije znaju što rade. Vrlo brzo su riješili 5 vrlo visokih smreka koje su u blizini kuće a da nisu napravili štetu.",
      name: "Jasminka Parać",
      country: "Hrvatska",
      initial: "J",
    },
    {
      quote:
        "Imate moje preporuke. Orah koji je zbog bolesti i opasnosti za žice trebalo ukloniti, a nitko nije htio/mogao, vi ste riješili za par sati.",
      name: "Ines Slunjski",
      country: "Hrvatska",
      initial: "I",
    },
  ] satisfies Testimonial[],
  facebookLinkLabel: "Više našeg sadržaja na Facebook-u",
  // Simplified from the live site's raw URL, which was a one-time Google
  // search results link full of session-specific tracking params (sxsrf,
  // si, ved, biw/bih/dpr...) that wouldn't reliably reproduce the same
  // results for a new visitor. This is the same search with just the
  // query kept, which is the only part that actually matters.
  googleLinkLabel: "Iskustva naših klijenata",
  googleLinkHref: "https://www.google.com/search?q=Ru%C5%A1enje+drve%C4%87a+Beljan+Recenzije",
};

export const whyUs = {
  eyebrow: "KONTAKTIRAJTE NAS",
  heading: "Zašto odabrati baš nas?",
  points: [
    "Pazimo na sigurnost Vaše imovine – sve oko stabla bit će neoštećeno, neovisno o zahtjevnosti zadatka",
    "Mogućnost rušenja alpinizmom ili košarom, ovisno o dostupnosti drveta i složenosti situacije",
    "Potrudit ćemo se da posao obavimo što brže kako bismo Vam uštedjeli vrijeme",
  ],
  // Not uploaded yet — omitted (rather than pointing at a 404) so
  // BackgroundVideo renders poster-only with no failed request. Add this
  // back once the real file lands at this path (see MEDIA_GUIDE.md).
  // videoSrc: "/videos/home-why-us-bg.mp4",
  poster: "/videos/home-why-us-poster.jpg",
};

export const contactMethods = {
  heading: "Kontaktirajte nas putem poziva ili poruke",
  intro: "Odaberite način kontakta koji vam najviše odgovara",
  items: [
    { label: "WhatsApp", description: "Pošaljite nam poruku" },
    { label: "Poziv", description: "098 137 5774" },
    { label: "Messenger", description: "Pišite nam na Facebook" },
  ],
};

export const contactForm = {
  heading: "Pošaljite Nam Upit",
  intro: "Imate pitanje ili trebate ponudu? Ispunite obrazac i javit ćemo vam se u najkraćem roku.",
  nameLabel: "Vaše ime",
  namePlaceholder: "Unesite vaše ime",
  emailLabel: "Email adresa",
  emailPlaceholder: "vasa@email.com",
  phoneLabel: "Broj telefona",
  phonePlaceholder: "+385 91 234 5678",
  messageLabel: "Vaša poruka",
  messagePlaceholder: "Opišite što trebate - vrstu posla, lokaciju, hitnost...",
  fileLabel: "Priložite sliku",
  fileOptionalNote: "(neobavezno)",
  fileHint: "Kliknite za dodavanje slike (max 10MB)",
  submitLabel: "Pošalji Upit",
  submitPendingLabel: "Slanje...",
  // Shown once email sending is actually wired up (step 5); for now the
  // form validates and simulates a successful submission locally.
  successMessage: "Hvala! Vaš upit je zaprimljen, javit ćemo vam se uskoro.",
  errors: {
    name: "Unesite vaše ime.",
    email: "Unesite ispravnu email adresu.",
    message: "Opišite ukratko što trebate (najmanje 10 znakova).",
    fileTooLarge: "Slika je prevelika (max 10MB).",
  },
  maxFileSizeBytes: 10 * 1024 * 1024,
};
