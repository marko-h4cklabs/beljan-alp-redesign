# Site Map & Content Inventory — beljan-alp.com

Captured 2026-10-10 via headless-browser crawl (Playwright/Chromium) of the live site
`https://www.beljan-alp.com/`. The site is a Lovable-built React SPA with exactly **3
client-side routes**. There are no further sub-tabs, accordions, or hidden pages — every
unlisted path (e.g. `/usluge`, `/blog`, `/anything`) returns HTTP 200 but renders a
client-side "404" component (bad for SEO: should be a real 404 status in the rebuild).

Language: Croatian (`hr`). All copy below is transcribed **verbatim** — do not edit, fix
typos, or rewrite without flagging first (see "Observations" at the end).

```
/                     Homepage (single-page scroll with anchored sections)
  ├─ Header/Nav (sticky, global — appears on all 3 routes)
  ├─ #hero            Hero (video bg)
  ├─ (unlabeled)       "Imate stablo..." intro strip
  ├─ #services         Naše usluge (6 service cards)
  ├─ #work             Naši radovi (gallery scroller, 6 images) → link to /galerija
  ├─ #about            O nama (Alfonz Beljan)
  ├─ (unlabeled)       Testimonials — Što ljudi kažu o nama? (3 reviews)
  ├─ (unlabeled)       Zašto odabrati baš nas? (video bg + 3 checklist points)
  ├─ #contact-methods  Kontaktirajte nas putem poziva ili poruke (WhatsApp/Call/Messenger)
  ├─ (unlabeled)       Pošaljite Nam Upit (contact form)
  └─ Footer (global — appears on all 3 routes)

/galerija             Gallery Radova (secondary gallery page, 6 images, lightbox)
  ├─ Header/Nav (same as above)
  ├─ "Natrag na početnu" back-link
  ├─ Galerija Radova (heading + intro)
  ├─ Image grid (6 images, click-to-enlarge lightbox, no inline captions other than hover tag)
  └─ Footer (global)

/izbornik             "Izbornik" — a link-in-bio / linktree-style contact hub page
  ├─ Header/Nav (same as above)
  ├─ Large circular logo badge
  ├─ "Izbornik" heading + intro line
  ├─ 2 link cards: Web stranica (→ /), Facebook stranica (external)
  ├─ "KONTAKTIRAJTE NAS PUTEM" label
  ├─ 4 link cards: WhatsApp, Messenger, E-mail, Nazovite nas (phone)
  └─ Footer (global)
```

No hash-tab or accordion content was found beyond the anchor-linked sections above — the
in-page nav items (Usluge / Naši radovi / O nama / Kontakt) are just smooth-scroll anchors
on the homepage, not separate views.

---

## Global Header (all 3 routes)

- Logo mark (circular badge, "B" monogram) + wordmark "Vrtna oaza Beljan" — links to `/`
- Nav links: **Usluge** (`#services`), **Naši radovi** (`#work`), **O nama** (`#about`),
  **Kontakt** (`#contact-methods`), **Izbornik** (`/izbornik`)
- CTA button: **Kontaktirajte nas** (scrolls to contact form)
- Mobile: hamburger icon, `aria-label="Toggle menu"`, same links in a drawer/menu

---

## Route: `/` — Homepage

**Title:** `Vrtna oaza Beljan | Profesionalno Rušenje i Njega Stabala`
**Meta description:** `Stručno rušenje stabala, obrezivanje i mljevenje panjeva. Certificirani arboristi pružaju sigurnu, profesionalnu njegu stabala za stambene i komercijalne objekte.`
**og:title:** `Vrtna oaza Beljan | Profesionalno Rušenje i Njega Stabala`
**og:description:** `Stručno rušenje stabala, obrezivanje i mljevenje panjeva. Profesionalna njega stabala.`
**og:image:** `https://lovable.dev/opengraph-image-p98pqg.png` ⚠️ Lovable's default placeholder — must be replaced.
**twitter:card:** `summary_large_image`, **twitter:site:** `@Lovable` ⚠️ also a Lovable default, must be replaced.

### 1. Hero section
- Background: autoplay/loop/muted video, `home-hero-bg.mp4` (see Media section — not downloadable from this environment, see Observations)
- Rating strip: `5.0` — `24 recenzija` (star icon)
- H1: **"Alpinističko rušenje"** / **"teško dostupnog drveća"** (two-line heading)
- Button: **"Kontaktirajte nas"**

### 2. Intro strip (no section id)
- H3: **"Imate stablo koje ugrožava sigurnost i vašu imovinu?"**
- Paragraph: *"Mi ćemo ukloniti drvo za vas i pritom štititi imovinu."*

### 3. Services — `#services`
- Eyebrow: `ŠTO RADIMO`
- H2: **"Naše usluge"**
- Intro: *"Od redovitog održavanja do hitnih uklanjanja, pružamo sveobuhvatna rješenja za njegu stabala prilagođena vašim potrebama."*
- 6 service cards (icon + H3 + paragraph), in this exact order:
  1. **Rušenje drveća** — *"Sigurno i stručno uklanjanje drveća s vašeg imanja uz minimalne smetnje."*
  2. **Orezivanje grmova i živica** — *"Profesionalno oblikovanje i održavanje grmova i živica za uredan izgled vrta."*
  3. **Skraćivanje krošnje drveća** — *"Stručno skraćivanje i oblikovanje krošnji za zdravlje stabala i estetiku."*
  4. **Odvoz otpadnog materijala** — *"Kompletno čišćenje i odvoz svih ostataka nakon obavljenog posla."*
  5. **Krčenje zapuštenih parcela** — *"Temeljito čišćenje zapuštenih i zaraslih zemljišta za novu namjenu."*
  6. **Redovita košnja travnjaka** — *"Redovito održavanje travnjaka za uredan i zdrav izgled vaše okućnice."*

### 4. Work gallery (scroller) — `#work`
- Eyebrow: `GALERIJA`
- H2: **"Uspješno srušena drva"**
- 6 images, each with a category tag + H3 caption (card hover reveal):
  1. tag `RUŠENJE DRVEĆA` — **"Rušenje visokog stabla"** — `home-work-01-rusenje-visokog-stabla.jpg`
  2. tag `RUŠENJE DRVEĆA` — **"Rad na visini"** — `home-work-02-rad-na-visini.jpg`
  3. tag `SKRAĆIVANJE KROŠNJE` — **"Alpinističko rušenje"** — `home-work-03-alpinisticko-rusenje.jpg`
  4. tag `RUŠENJE DRVEĆA` — **"Rad u krošnji"** — `home-work-04-rad-u-krosnji.jpg`
  5. tag `OREZIVANJE DRVEĆA` — **"Tehnika rušenja"** — `home-work-05-tehnika-rusenja.png`
  6. tag (none captured separately, caption only) — **"Zimsko orezivanje"** — `home-work-06-zimsko-orezivanje.png`
- Button: **"Galerija radova →"** → links to `/galerija`

### 5. About — `#about`
- Eyebrow: `O NAMA`
- H2: **"Stručnjaci za rušenje drveća"**
- Paragraph 1: *"Glavna osoba za rušenje drveća je Alfonz Beljan, čije iskustvo omogućuje sigurno uklanjanje drveća po vašem upitu."*
- Paragraph 2: *"Obzirom na zahtjevnost i potencijalnu opasnost rušenja teško dostupnog drveća, potrebno je znanje, iskustvo, hrabrost, te mogućnost rukovanja motornom pilom na visini."*
- Paragraph 3: *"Zato nam se obratite s povjerenjem i učinite vašu okućnicu sigurnijom i uređenom po vašoj želji."*
- Photo: `about-alfonz-beljan.png` (alt: "Alfonz Beljan - stručnjak za rušenje drveća")

### 6. Testimonials (no section id)
- Eyebrow: `ISKUSTVA`
- H2: **"Što ljudi kažu o nama?"**
- 3 review cards, each with 5-star rating, quote, initial-letter avatar, name, country:
  1. ★★★★★ — *"Dečki znaju što rade. Zahtjevan posao odradili brzo i profesionalno bez ikakve štete. Iskrene preporuke za sve koji trebaju rušenje drveća na nepristupačnim lokacijama."* — **Damir Zganec**, Hrvatska (avatar initial "D")
  2. ★★★★★ — *"Dečki su odlični, simpatični i što je najvažnije znaju što rade. Vrlo brzo su riješili 5 vrlo visokih smreka koje su u blizini kuće a da nisu napravili štetu."* — **Jasminka Parać**, Hrvatska (avatar initial "J")
  3. ★★★★★ — *"Imate moje preporuke. Orah koji je zbog bolesti i opasnosti za žice trebalo ukloniti, a nitko nije htio/mogao, vi ste riješili za par sati."* — **Ines Slunjski**, Hrvatska (avatar initial "I")
- Links: **"Više našeg sadržaja na Facebook-u"** (→ Facebook page), **"Iskustva naših klijenata"** (→ Google search results URL for reviews)

### 7. Why us (video bg, no section id)
- Eyebrow: `KONTAKTIRAJTE NAS`
- H2: **"Zašto odabrati baš nas?"**
- 3 checklist points (✓ icon):
  1. *"Pazimo na sigurnost Vaše imovine – sve oko stabla bit će neoštećeno, neovisno o zahtjevnosti zadatka"*
  2. *"Mogućnost rušenja alpinizmom ili košarom, ovisno o dostupnosti drveta i složenosti situacije"*
  3. *"Potrudit ćemo se da posao obavimo što brže kako bismo Vam uštedjeli vrijeme"*
- Background video: `home-why-us-bg.mp4` (autoplay/loop/muted — see Observations)

### 8. Contact methods — `#contact-methods`
- H3: **"Kontaktirajte nas putem poziva ili poruke"**
- Paragraph: *"Odaberite način kontakta koji vam najviše odgovara"*
- 3 contact cards:
  1. **WhatsApp** — *"Pošaljite nam poruku"* → `https://wa.me/385981375774`
  2. **Poziv** — *"098 137 5774"* → `tel:+385981375774`
  3. **Messenger** — *"Pišite nam na Facebook"* → `https://m.me/rusenjeteskodostupnogdrveca`

### 9. Contact form (same section, right column)
- H3: **"Pošaljite Nam Upit"**
- Paragraph: *"Imate pitanje ili trebate ponudu? Ispunite obrazac i javit ćemo vam se u najkraćem roku."*
- Fields (none marked `required` in the DOM, though real-world validation may exist client-side):
  - Text — label **"Vaše ime"**, placeholder `Unesite vaše ime`, name `name`
  - Email — label **"Email adresa"**, placeholder `vasa@email.com`, name `email`
  - Tel — label **"Broj telefona"**, placeholder `+385 91 234 5678`, name `phone`
  - Textarea — label **"Vaša poruka"**, placeholder `Opišite što trebate - vrstu posla, lokaciju, hitnost...`, name `message`
  - File input — label **"Priložite sliku"** / *(neobavezno)* / **"Kliknite za dodavanje slike (max 10MB)"**
  - Submit button: **"Pošalji Upit"**
- Submission endpoint could not be determined from static inspection (likely a Supabase edge function or similar given the project uses Supabase storage for media — confirm with client/owner, or treat as unknown and build fresh).

---

## Route: `/galerija` — Gallery

**Title/meta:** identical to homepage (SPA serves the same `index.html`/head tags for every route — i.e. **every route currently shares one generic title/description**, which is a significant SEO gap to fix).

- Back-link: **"Natrag na početnu"** → `/`
- Eyebrow: `GALERIJA`
- H1: **"Galerija Radova"**
- Intro: *"Pogledajte naše uspješno završene projekte rušenja, orezivanja i njege drveća."*
- 6 images in a grid, each with a category tag + H3 caption, click-to-enlarge lightbox:
  1. tag `RUŠENJE DRVEĆA` — **"Rad s Dizalicom"** — `gallery-07-rad-s-dizalicom.jpg`
  2. tag `ALPINISTIČKO RUŠENJE` — **"Penjanje na Smreku"** — `gallery-08-penjanje-na-smreku.jpg`
  3. tag `RUŠENJE DRVEĆA` — **"Rušenje Breze"** — `gallery-09-rusenje-breze.jpg`
  4. tag `RUŠENJE DRVEĆA` — **"Rad u Krošnji"** — `gallery-10-rad-u-krosnji.jpg`
  5. tag `ALPINISTIČKO RUŠENJE` — **"Visinski Rad"** — reuses `home-work-03-alpinisticko-rusenje.jpg` (same file, alt text differs: "Visinski Rad" here vs. "Alpinističko rušenje" on homepage)
  6. tag `RUŠENJE DRVEĆA` — **"Uklanjanje Stabla"** — reuses `home-work-02-rad-na-visini.jpg` (same file, alt text differs: "Uklanjanje Stabla" here vs. "Rad na visini" on homepage)
- Caption: *"Kliknite na sliku za povećani prikaz"*

---

## Route: `/izbornik` — Link hub ("Menu")

**Title/meta:** same generic shared tags as above.

- H1: **"Izbornik"**
- Intro: *"Sve na jednom mjestu — posjetite nas, kontaktirajte nas ili pratite naš rad."*
- Large circular logo badge (`logo-badge.png`, same file as header logo, shown larger)
- Link card 1: **"Posjetite našu Web stranicu"** — *"Povratak na početnu stranicu"* → `/`
- Link card 2: **"Posjetite našu Facebook stranicu"** — *"Pratite nas na Facebooku"* → `https://www.facebook.com/rusenjeteskodostupnogdrveca`
- Label: `KONTAKTIRAJTE NAS PUTEM`
- Link card 3: **WhatsApp** — *"Pošaljite nam poruku"* → `https://wa.me/385981375774`
- Link card 4: **Messenger** — *"Pišite nam na Facebook"* → `https://m.me/rusenjeteskodostupnogdrveca`
- Link card 5: **E-mail** — `vrtnaoazabeljan@gmail.com` → (mailto, inferred)
- Link card 6: **Nazovite nas** — `098 137 5774` → `tel:+385981375774`

---

## Global Footer (all 3 routes)

- Logo mark + wordmark "Vrtna oaza Beljan"
- Facebook icon link → `https://www.facebook.com/rusenjeteskodostupnogdrveca`
- H4: **"Podaci o tvrtki"** (Company details)
  - **Vrtna oaza Beljan** — *"Obrt za rušenje drveća i hortikulturu"* / *"vl. Alfonz Beljan"*
  - Address: **Železna Gora 166**, **Železna Gora**
  - Phone: **098 137 5774**
  - Matični broj: **98952048**
  - OIB: **98109732423**
  - *"Obrt nije u sustavu PDV-a prema čl.90. Zakona o PDV-u"*
  - *"Obrt je upisan u Obrtni registar u upravnom odjelu za gospodarstvo, poljoprivredu i turizam, Odsjek za obrt i poduzetništvo u Međimurskoj županiji."*
- Copyright: **"© 2026 Vrtna oaza Beljan. Sva prava pridržana."**
- Link: **"Politika privatnosti"** → PDF at `https://agzshlajheodpkbpvhfe.supabase.co/storage/v1/object/public/documents/politika-privatnosti.pdf` (external icon shown next to link)

---

## Media inventory

All files downloaded to `/_inventory/media/` except the 2 videos and the privacy-policy
PDF (see Observations — network-blocked in this environment, not missing from the live site).

| File | Used on | Alt / role | Source dimensions |
|---|---|---|---|
| `logo-badge.png` | Header (all pages), Footer (all pages), `/izbornik` (large) | "Vrtna oaza Beljan logo" | 1920×1886 |
| `home-hero-bg.mp4` ⚠️ not downloaded | `/` hero background | autoplay/loop/muted, no poster set | unknown |
| `home-why-us-bg.mp4` ⚠️ not downloaded | `/` "Zašto odabrati baš nas?" background | autoplay/loop/muted, no poster set | unknown |
| `home-work-01-rusenje-visokog-stabla.jpg` | `/` work gallery #1 | "Rušenje visokog stabla" | 1440×1920 |
| `home-work-02-rad-na-visini.jpg` | `/` work gallery #2; reused on `/galerija` as "Uklanjanje Stabla" | "Rad na visini" / "Uklanjanje Stabla" | 1200×1600 |
| `home-work-03-alpinisticko-rusenje.jpg` | `/` work gallery #3; reused on `/galerija` as "Visinski Rad" | "Alpinističko rušenje" / "Visinski Rad" | 1440×1920 |
| `home-work-04-rad-u-krosnji.jpg` | `/` work gallery #4 | "Rad u krošnji" | 1200×1600 |
| `home-work-05-tehnika-rusenja.png` | `/` work gallery #5 | "Tehnika rušenja" | 760×1024 |
| `home-work-06-zimsko-orezivanje.png` | `/` work gallery #6 | "Zimsko orezivanje" | 683×1024 |
| `about-alfonz-beljan.png` | `/` about section | "Alfonz Beljan - stručnjak za rušenje drveća" | 683×1024 |
| `gallery-07-rad-s-dizalicom.jpg` | `/galerija` #1 | "Rad s Dizalicom" | 1440×1920 |
| `gallery-08-penjanje-na-smreku.jpg` | `/galerija` #2 | "Penjanje na Smreku" | 760×1024 |
| `gallery-09-rusenje-breze.jpg` | `/galerija` #3 | "Rušenje Breze" | 1080×1920 |
| `gallery-10-rad-u-krosnji.jpg` | `/galerija` #4 | "Rad u Krošnji" | 1440×1920 |
| `favicon.ico` | browser tab (no explicit `<link rel="icon">` in HTML — relies on default `/favicon.ico` path) | — | — |
| `politika-privatnosti.pdf` ⚠️ not downloaded | Footer link (all pages) | Privacy policy | unknown |

Raw URL → filename mapping is also saved machine-readably at `_inventory/data/media-map.json`.

### Screenshots

Full-page screenshots (desktop 1440px + mobile 390px, scroll-triggered reveal animations
forced to fire first) are saved in `/_inventory/screenshots/`:
`home-desktop.png`, `home-mobile.png`, `galerija-desktop.png`, `galerija-mobile.png`,
`izbornik-desktop.png`, `izbornik-mobile.png`.

Note: in the desktop/mobile screenshots, the "Why us" section's video-background box
renders as an empty dark-green rectangle — that's the same video-download blocker, not a
real bug on the live site.

---

## Contact / business details (for reuse in JSON-LD, footer, contact links)

- Business name: **Vrtna oaza Beljan**
- Legal form: *Obrt za rušenje drveća i hortikulturu* (sole proprietorship / craft business)
- Owner: **Alfonz Beljan**
- Address: **Železna Gora 166, Železna Gora**, Croatia (Međimurska županija)
- Phone: **098 137 5774** (`tel:+385981375774`)
- WhatsApp: `https://wa.me/385981375774`
- Messenger: `https://m.me/rusenjeteskodostupnogdrveca`
- Email: **vrtnaoazabeljan@gmail.com**
- Facebook: `https://www.facebook.com/rusenjeteskodostupnogdrveca`
- Matični broj (business registration number): **98952048**
- OIB (tax ID): **98109732423**
- Not in the VAT system (čl. 90. Zakona o PDV-u)
- Registered with: Upravni odjel za gospodarstvo, poljoprivredu i turizam, Odsjek za obrt i poduzetništvo, Međimurska županija
- Google reviews: 5.0 rating, 24 reviews (as displayed on homepage hero)

---

## Observations / things to flag before Phase 1 (do not act on these without confirming)

1. **Two background videos (`hero-bg.mp4`, `why-us.mp4`) and the privacy-policy PDF
   live on a Supabase storage subdomain
   (`agzshlajheodpkbpvhfe.supabase.co`) that does not resolve from this sandboxed
   environment** (confirmed NXDOMAIN via direct DNS, curl, Playwright's own browser
   fetch, and a separate server-side fetch tool — three independent network paths, all
   failing identically). This is very likely an environment-specific network
   restriction rather than the files being gone, since they do render on the live
   site. **I could not download these 3 files.** Options: (a) you download them
   yourself and drop them into `_inventory/media/` (I can tell you exactly which
   filenames to use), or (b) grant a way for me to fetch that domain. Either way, this
   does not block Phase 1 planning.
2. **The SPA shares one generic `<title>`/meta description/OG tags across all 3
   routes** (all served from the same `index.html`). Per-page unique titles/descriptions
   is a planned fix in Phase 1 (SEO section), not a content change.
3. **Every unknown URL returns HTTP 200** with a client-rendered "404" page (no real
   404 status). Needs a proper server-side 404 in the rebuild.
4. **No explicit favicon/manifest tags** — site relies on the browser's default
   `/favicon.ico` discovery. No `site.webmanifest`, no apple-touch-icon, no sitemap.xml.
5. The two images `gallery-2` and `gallery-3` are **reused** between `/` and
   `/galerija` with **different alt text/captions** in each place ("Rad na visini" vs.
   "Uklanjanje Stabla"; "Alpinističko rušenje" vs. "Visinski Rad"). I preserved both
   variants in the inventory above — flagging in case you want them deduplicated or
   kept as distinct photos later.
6. The contact form's submit **endpoint could not be determined** from static
   inspection — it most likely posts to a Supabase Edge Function given the project's
   use of Supabase storage elsewhere, but I have no proof. The rebuild plan will need a
   fresh email-sending implementation regardless (per your brief, via Resend or
   similar) — flagging only so you know there's no existing backend to "migrate."
7. No typos spotted in the Croatian copy during transcription — nothing to flag there.

This file, plus `_inventory/media/`, `_inventory/screenshots/`, and
`_inventory/data/media-map.json`, form the complete Phase 0 deliverable.
