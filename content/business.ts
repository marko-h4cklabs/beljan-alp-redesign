/**
 * Shared business facts used across the footer, contact sections, and JSON-LD.
 * Sourced verbatim from the live site inventory (_inventory/SITE_MAP.md).
 */
export const business = {
  name: "Vrtna oaza Beljan",
  legalForm: "Obrt za rušenje drveća i hortikulturu",
  owner: "Alfonz Beljan",
  ownerPrefixed: "vl. Alfonz Beljan",
  address: {
    street: "Železna Gora 166",
    city: "Železna Gora",
    region: "Međimurska županija",
    country: "HR",
  },
  phoneDisplay: "098 137 5774",
  phoneE164: "+385981375774",
  email: "vrtnaoazabeljan@gmail.com",
  whatsappUrl: "https://wa.me/385981375774",
  messengerUrl: "https://m.me/rusenjeteskodostupnogdrveca",
  facebookUrl: "https://www.facebook.com/rusenjeteskodostupnogdrveca",
  maticniBroj: "98952048",
  oib: "98109732423",
  vatNote: "Obrt nije u sustavu PDV-a prema čl.90. Zakona o PDV-u",
  registryNote:
    "Obrt je upisan u Obrtni registar u upravnom odjelu za gospodarstvo, poljoprivredu i turizam, Odsjek za obrt i poduzetništvo u Međimurskoj županiji.",
  rating: {
    value: 5.0,
    count: 24,
  },
} as const;
