/**
 * Verbatim transcription of _inventory/politika-privatnosti.md — the
 * official privacy policy text. Do not reword, shorten, or "fix" anything
 * here without checking with the business owner first; this is a legal
 * document, not marketing copy.
 */

export type PrivacyBlock =
  | { kind: "p"; text: string }
  | { kind: "p-strong"; text: string }
  | { kind: "lines"; lines: string[] }
  | { kind: "list"; items: Array<{ strong?: string; text: string }> }
  | { kind: "table"; headers: string[]; rows: string[][] };

export type PrivacySection = {
  id: string;
  number: number;
  heading: string;
  blocks: PrivacyBlock[];
};

export const privacy = {
  heading: "Politika privatnosti",
  companyLine: "Vrtna oaza Beljan",
  effectiveDate: "Datum stupanja na snagu: 11. listopada 2026.",
  intro:
    'Zaštita vaših osobnih podataka nam je važna. Ova Politika privatnosti objašnjava koje osobne podatke prikupljamo kada posjećujete našu web stranicu www.beljan-alp.com ili nas kontaktirate, u koje ih svrhe koristimo, koliko ih dugo čuvamo te koja prava imate. Osobne podatke obrađujemo u skladu s Općom uredbom o zaštiti podataka (Uredba (EU) 2016/679, „GDPR") i Zakonom o provedbi Opće uredbe o zaštiti podataka (NN 42/18).',

  sections: [
    {
      id: "s1",
      number: 1,
      heading: "Voditelj obrade",
      blocks: [
        { kind: "p", text: "Voditelj obrade vaših osobnih podataka je:" },
        {
          kind: "p-strong",
          text: "Vrtna oaza Beljan, obrt za rušenje drveća i hortikulturu, vl. Alfonz Beljan, Železna Gora, Železna Gora 166",
        },
        {
          kind: "lines",
          lines: [
            "Adresa: Železna Gora 166, 40313 Železna Gora",
            "OIB: 98109732423",
            "MBO: 98952048",
            "E-mail: vrtnaoazabeljan@gmail.com",
            "Telefon: 098 137 5774",
          ],
        },
        {
          kind: "p",
          text: "Za sva pitanja u vezi s obradom osobnih podataka možete nam se obratiti na navedene kontakte.",
        },
      ],
    },
    {
      id: "s2",
      number: 2,
      heading: "Koje osobne podatke prikupljamo",
      blocks: [
        { kind: "p-strong", text: "a) Podaci koje nam sami dostavite putem kontakt obrasca" },
        {
          kind: "p",
          text: "Kada ispunite kontakt obrazac na našoj web stranici, prikupljamo podatke koje unesete, primjerice: ime i prezime, e-mail adresu, broj telefona te sadržaj vaše poruke (npr. opis usluge, lokaciju radova i druge informacije koje sami navedete).",
        },
        { kind: "p-strong", text: "b) Podaci koje nam dostavite izravnim kontaktom" },
        {
          kind: "p",
          text: "Kada nas kontaktirate telefonom, e-mailom, putem WhatsAppa, Facebook Messengera ili Facebook stranice, obrađujemo podatke koje nam pritom dostavite (npr. ime, broj telefona, e-mail adresu, korisničko ime, sadržaj poruke te fotografije koje nam pošaljete).",
        },
        { kind: "p-strong", text: "c) Tehnički podaci" },
        {
          kind: "p",
          text: "Prilikom posjeta web stranici, poslužitelj našeg pružatelja usluge smještaja (hostinga) automatski bilježi određene tehničke podatke nužne za sigurno i ispravno funkcioniranje stranice, kao što su IP adresa, vrsta preglednika i uređaja, datum i vrijeme pristupa te zatražena stranica.",
        },
        {
          kind: "p",
          text: "Ne prikupljamo posebne kategorije osobnih podataka i molimo vas da nam ih ne dostavljate.",
        },
      ],
    },
    {
      id: "s3",
      number: 3,
      heading: "Svrhe i pravna osnova obrade",
      blocks: [
        {
          kind: "table",
          headers: ["Svrha", "Pravna osnova"],
          rows: [
            [
              "Odgovaranje na vaše upite i izrada ponude",
              "Poduzimanje radnji na vaš zahtjev prije sklapanja ugovora (čl. 6. st. 1. t. (b) GDPR-a)",
            ],
            [
              "Izvršenje ugovorene usluge (dogovor termina, izvođenje radova, komunikacija)",
              "Izvršenje ugovora (čl. 6. st. 1. t. (b) GDPR-a)",
            ],
            [
              "Izdavanje računa i ispunjavanje zakonskih obveza (npr. računovodstvenih i poreznih)",
              "Pravna obveza (čl. 6. st. 1. t. (c) GDPR-a)",
            ],
            [
              "Osiguravanje sigurnosti i ispravnog rada web stranice",
              "Legitimni interes (čl. 6. st. 1. t. (f) GDPR-a)",
            ],
          ],
        },
        {
          kind: "p",
          text: "Vaše podatke ne koristimo za automatizirano donošenje odluka ni profiliranje te ih ne prodajemo trećim stranama.",
        },
      ],
    },
    {
      id: "s4",
      number: 4,
      heading: "Primatelji osobnih podataka",
      blocks: [
        {
          kind: "p",
          text: "Vaše podatke možemo podijeliti isključivo s pouzdanim pružateljima usluga koji ih obrađuju u naše ime i prema našim uputama (izvršitelji obrade), i to u mjeri potrebnoj za pružanje njihovih usluga:",
        },
        {
          kind: "list",
          items: [
            { strong: "pružatelj usluge smještaja web stranice (hosting):", text: " Vercel Inc.;" },
            {
              strong: "pružatelj usluge slanja e-pošte",
              text: " putem kojeg nam se dostavljaju poruke iz kontakt obrasca: Resend;",
            },
            { strong: "knjigovodstveni servis", text: ", u mjeri potrebnoj za ispunjavanje zakonskih obveza." },
          ],
        },
        {
          kind: "p",
          text: "Kada nas kontaktirate putem WhatsAppa, Facebook Messengera ili Facebook stranice, te usluge pruža Meta Platforms, koja vaše podatke obrađuje i kao samostalni voditelj obrade u skladu sa svojim pravilima o privatnosti. Preporučujemo da se s njima upoznate.",
        },
        {
          kind: "p",
          text: "Osobne podatke možemo otkriti i nadležnim tijelima kada smo na to zakonski obvezni.",
        },
      ],
    },
    {
      id: "s5",
      number: 5,
      heading: "Prijenos podataka izvan Europskog gospodarskog prostora",
      blocks: [
        {
          kind: "p",
          text: "Pojedini naši pružatelji usluga (npr. Vercel) mogu obrađivati podatke izvan Europskog gospodarskog prostora, uključujući SAD. U tim slučajevima prijenos se temelji na odgovarajućim zaštitnim mjerama predviđenim GDPR-om, poput Okvira za privatnost podataka EU-a i SAD-a (EU-U.S. Data Privacy Framework) ili standardnih ugovornih klauzula Europske komisije.",
        },
      ],
    },
    {
      id: "s6",
      number: 6,
      heading: "Rok čuvanja podataka",
      blocks: [
        {
          kind: "list",
          items: [
            {
              strong: "Upiti koji nisu rezultirali suradnjom:",
              text: " čuvamo ih najviše 12 mjeseci od posljednje komunikacije, nakon čega ih brišemo.",
            },
            {
              strong: "Podaci vezani uz izvršene usluge i račune:",
              text: " čuvamo ih onoliko dugo koliko to propisuju računovodstveni i porezni propisi (u pravilu 11 godina za račune i poslovnu dokumentaciju).",
            },
            {
              strong: "Tehnički podaci (logovi poslužitelja):",
              text: " čuvaju se kratko, u skladu s postavkama pružatelja usluge smještaja, i to samo koliko je potrebno za sigurnost i ispravan rad stranice.",
            },
          ],
        },
      ],
    },
    {
      id: "s7",
      number: 7,
      heading: "Kolačići",
      blocks: [
        {
          kind: "p",
          text: "Naša web stranica ne koristi kolačiće za praćenje, oglašavanje ni analitiku. Mogu se koristiti samo tehnički nužni mehanizmi bez kojih stranica ne bi ispravno radila, za koje nije potrebna vaša privola.",
        },
        {
          kind: "p",
          text: "Ako u budućnosti uvedemo analitičke ili marketinške kolačiće, prethodno ćemo zatražiti vašu privolu i ažurirati ovu Politiku privatnosti.",
        },
        {
          kind: "p",
          text: "Klikom na poveznice prema vanjskim servisima (npr. Facebook, WhatsApp, Messenger) napuštate našu stranicu, a na te servise primjenjuju se njihova pravila o privatnosti i kolačićima.",
        },
      ],
    },
    {
      id: "s8",
      number: 8,
      heading: "Vaša prava",
      blocks: [
        { kind: "p", text: "U skladu s GDPR-om imate pravo:" },
        {
          kind: "list",
          items: [
            { strong: "na pristup", text: " svojim osobnim podacima i dobivanje kopije podataka koje obrađujemo;" },
            { strong: "na ispravak", text: " netočnih ili nepotpunih podataka;" },
            {
              strong: "na brisanje",
              text: ' podataka („pravo na zaborav"), kada za njihovu obradu više ne postoji pravna osnova;',
            },
            { strong: "na ograničenje obrade", text: " u slučajevima propisanim GDPR-om;" },
            {
              strong: "na prenosivost podataka",
              text: " koje ste nam dostavili, u strukturiranom i strojno čitljivom obliku;",
            },
            { strong: "na prigovor", text: " na obradu koja se temelji na našem legitimnom interesu." },
          ],
        },
        {
          kind: "p",
          text: "Za ostvarivanje svojih prava obratite nam se na e-mail vrtnaoazabeljan@gmail.com. Na vaš zahtjev odgovorit ćemo bez nepotrebnog odgađanja, a najkasnije u roku od mjesec dana od zaprimanja zahtjeva. Radi zaštite vaših podataka možemo zatražiti potvrdu vašeg identiteta.",
        },
        { kind: "p-strong", text: "Pravo na pritužbu nadzornom tijelu" },
        {
          kind: "p",
          text: "Ako smatrate da obradom vaših osobnih podataka kršimo propise o zaštiti podataka, imate pravo podnijeti pritužbu Agenciji za zaštitu osobnih podataka (AZOP):",
        },
        {
          kind: "lines",
          lines: [
            "Agencija za zaštitu osobnih podataka, Selska cesta 136, 10000 Zagreb",
            "www.azop.hr | azop@azop.hr",
          ],
        },
      ],
    },
    {
      id: "s9",
      number: 9,
      heading: "Sigurnost podataka",
      blocks: [
        {
          kind: "p",
          text: "Primjenjujemo odgovarajuće tehničke i organizacijske mjere kako bismo vaše osobne podatke zaštitili od neovlaštenog pristupa, gubitka, uništenja ili zlouporabe. Web stranica koristi šifriranu vezu (HTTPS), a pristup podacima imaju isključivo osobe kojima je to potrebno za obavljanje posla.",
        },
      ],
    },
    {
      id: "s10",
      number: 10,
      heading: "Djeca",
      blocks: [
        {
          kind: "p",
          text: "Naše usluge nisu namijenjene osobama mlađima od 16 godina i svjesno ne prikupljamo njihove osobne podatke.",
        },
      ],
    },
    {
      id: "s11",
      number: 11,
      heading: "Izmjene Politike privatnosti",
      blocks: [
        {
          kind: "p",
          text: "Ovu Politiku privatnosti možemo povremeno ažurirati, primjerice zbog promjena u našem poslovanju ili propisima. Važeća verzija uvijek je objavljena na ovoj stranici, uz naznačen datum stupanja na snagu.",
        },
      ],
    },
    {
      id: "s12",
      number: 12,
      heading: "Kontakt",
      blocks: [
        {
          kind: "p",
          text: "Za sva pitanja u vezi s ovom Politikom privatnosti ili obradom vaših osobnih podataka obratite nam se:",
        },
        {
          kind: "p-strong",
          text: "Vrtna oaza Beljan, obrt za rušenje drveća i hortikulturu, vl. Alfonz Beljan, Železna Gora, Železna Gora 166",
        },
        {
          kind: "lines",
          lines: [
            "Železna Gora 166, 40313 Železna Gora",
            "E-mail: vrtnaoazabeljan@gmail.com",
            "Telefon: 098 137 5774",
          ],
        },
      ],
    },
  ] satisfies PrivacySection[],
};
