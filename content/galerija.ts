import type { WorkItem } from "./types";

export const galerija = {
  eyebrow: "GALERIJA",
  heading: "Galerija Radova",
  intro: "Pogledajte naše uspješno završene projekte rušenja, orezivanja i njege drveća.",
  backLinkLabel: "Natrag na početnu",
  lightboxHint: "Kliknite na sliku za povećani prikaz",
  items: [
    {
      image: "/images/gallery/07-rad-s-dizalicom.jpg",
      alt: "Rad s Dizalicom",
      tag: "RUŠENJE DRVEĆA",
      caption: "Rad s Dizalicom",
    },
    {
      image: "/images/gallery/08-penjanje-na-smreku.jpg",
      alt: "Penjanje na Smreku",
      tag: "ALPINISTIČKO RUŠENJE",
      caption: "Penjanje na Smreku",
    },
    {
      image: "/images/gallery/09-rusenje-breze.jpg",
      alt: "Rušenje Breze",
      tag: "RUŠENJE DRVEĆA",
      caption: "Rušenje Breze",
    },
    {
      image: "/images/gallery/10-rad-u-krosnji.jpg",
      alt: "Rad u Krošnji",
      tag: "RUŠENJE DRVEĆA",
      caption: "Rad u Krošnji",
    },
    {
      // Same file as home's work gallery #3, different alt/caption here —
      // preserved exactly as the live site had it (see SITE_MAP.md).
      image: "/images/home/work-03-alpinisticko-rusenje.jpg",
      alt: "Visinski Rad",
      tag: "ALPINISTIČKO RUŠENJE",
      caption: "Visinski Rad",
    },
    {
      // Same file as home's work gallery #2, different alt/caption here —
      // preserved exactly as the live site had it (see SITE_MAP.md).
      image: "/images/home/work-02-rad-na-visini.jpg",
      alt: "Uklanjanje Stabla",
      tag: "RUŠENJE DRVEĆA",
      caption: "Uklanjanje Stabla",
    },
  ] satisfies WorkItem[],
};
