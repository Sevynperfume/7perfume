import { siteConfig } from "@/config/site";
import type { Perfume } from "@/features/perfumes/types";
import type { Review } from "@/features/reviews/types";
import { SITE_OG_NAME, ogImagePath } from "@/lib/og-paths";

/** Absolute URL for a site path, e.g. absoluteUrl("/perfumes/daddy"). */
export function absoluteUrl(path = "/") {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

const ORG_ID = absoluteUrl("/#organization");

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "OnlineStore",
    "@id": ORG_ID,
    name: siteConfig.name,
    alternateName: siteConfig.alternateNames,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/icon-512.png"),
    image: absoluteUrl(ogImagePath(SITE_OG_NAME)),
    description: siteConfig.description,
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone,
    address: { "@type": "PostalAddress", addressLocality: "Mumbai", addressCountry: "IN" },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: siteConfig.contact.phone,
      email: siteConfig.contact.email,
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: siteConfig.name,
    alternateName: siteConfig.alternateNames,
    url: absoluteUrl("/"),
    inLanguage: siteConfig.locale,
    publisher: { "@id": ORG_ID },
  };
}

/** The catalogue on the home page, so search engines can find every product. */
export function collectionJsonLd(perfumes: Perfume[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${siteConfig.name} collection`,
    numberOfItems: perfumes.length,
    itemListElement: perfumes.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absoluteUrl(`/perfumes/${p.slug}`),
      name: p.name,
    })),
  };
}

export function productJsonLd(perfume: Perfume, reviews: Review[]) {
  const url = absoluteUrl(`/perfumes/${perfume.slug}`);
  const prices = perfume.variants.map((v) => v.price);
  const availability = perfume.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock";
  const notes = perfume.notes.map((n) => n.name).join(", ");

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name: `${perfume.name} ${perfume.concentration}`,
    description: perfume.description,
    sku: perfume.id,
    url,
    // Share image is a PNG (search engines do not index the SVG gallery images).
    image: [absoluteUrl(ogImagePath(perfume.slug))],
    brand: { "@type": "Brand", name: perfume.brand },
    category: "Health & Beauty > Personal Care > Cosmetics > Perfume & Cologne",
    audience: {
      "@type": "PeopleAudience",
      suggestedGender: perfume.gender === "For Her" ? "female" : "unisex",
    },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Concentration", value: perfume.concentration },
      { "@type": "PropertyValue", name: "Fragrance notes", value: notes },
    ],
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: siteConfig.currency,
      lowPrice: Math.min(...prices),
      highPrice: Math.max(...prices),
      offerCount: perfume.variants.length,
      availability,
      url,
      seller: { "@id": ORG_ID },
      offers: perfume.variants.map((v) => ({
        "@type": "Offer",
        name: `${perfume.name} ${v.sizeLabel}`,
        price: v.price,
        priceCurrency: siteConfig.currency,
        availability,
        itemCondition: "https://schema.org/NewCondition",
        url,
      })),
    },
    ...(perfume.reviewCount > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: perfume.rating,
        reviewCount: perfume.reviewCount,
        bestRating: 5,
        worstRating: 1,
      },
    }),
    review: reviews.slice(0, 5).map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      datePublished: r.createdAt.slice(0, 10),
      name: r.title,
      reviewBody: r.comment,
      reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5, worstRating: 1 },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
