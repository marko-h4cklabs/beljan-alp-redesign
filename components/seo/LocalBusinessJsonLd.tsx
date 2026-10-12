import { business } from "@/content/business";
import { services, testimonials } from "@/content/home";
import { SITE_URL } from "@/lib/siteConfig";

/**
 * Site-wide LocalBusiness structured data (rendered once in the root
 * layout). Schema.org has no dedicated "tree service" type, so this uses
 * HomeAndConstructionBusiness — the closest fit in its type hierarchy —
 * alongside the generic LocalBusiness type.
 *
 * Every value here is sourced from content already live on the site
 * (content/business.ts, the homepage's services and testimonials) —
 * nothing invented. Opening hours are deliberately omitted: they aren't
 * published anywhere on the site, and guessing them would be worse than
 * leaving the field out.
 */
export function LocalBusinessJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["HomeAndConstructionBusiness", "LocalBusiness"],
    name: business.name,
    legalName: business.legalForm,
    image: `${SITE_URL}/images/home/work-01-rusenje-visokog-stabla.jpg`,
    url: SITE_URL,
    telephone: business.phoneE164,
    email: business.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      postalCode: business.address.postalCode,
      addressLocality: business.address.city,
      addressRegion: business.address.region,
      addressCountry: business.address.country,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: business.address.region,
    },
    sameAs: [business.facebookUrl],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: business.rating.value,
      reviewCount: business.rating.count,
    },
    review: testimonials.items.map((t) => ({
      "@type": "Review",
      author: { "@type": "Person", name: t.name },
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody: t.quote,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: services.heading,
      itemListElement: services.items.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
        },
      })),
    },
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
  );
}
