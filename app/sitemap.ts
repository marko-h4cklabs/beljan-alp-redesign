import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/siteConfig";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: SITE_URL, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/galerija`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/izbornik`, lastModified, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/politika-privatnosti`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}
