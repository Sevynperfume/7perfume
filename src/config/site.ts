export const siteConfig = {
  name: "SEVYN Perfumes",
  shortName: "SEVYN",
  description:
    "Shop SEVYN Extrait de Parfum online in India. Long-lasting luxury perfumes for her and unisex scents in 50 ml, 30 ml and pocket sizes from Rs 150. Order on WhatsApp.",
  /** Public URL without a trailing slash. Set NEXT_PUBLIC_SITE_URL before building for production. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/+$/, ""),
  /** Other names people search for, used in metadata and structured data. */
  alternateNames: ["SEVYN", "Sevyn Perfumes", "7EVYN"],
  keywords: [
    "SEVYN perfumes",
    "Sevyn perfume",
    "extrait de parfum India",
    "luxury perfume online",
    "long lasting perfume",
    "perfume for women",
    "unisex perfume",
    "pocket perfume",
    "perfume gift",
    "buy perfume Mumbai",
  ],
  ogLocale: "en_IN",
  currency: "INR",
  locale: "en-IN",
  /** Fallback dealer number (international format, digits only) used when a perfume has no dealer of its own. */
  defaultWhatsAppNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "917757902771",
  contact: {
    email: "sevynperfumes7@gmail.com",
    phone: "+91 77579 02771",
    address: "Mumbai, India",
  },
  nav: [
    { label: "Home", href: "/#top" },
    { label: "Collection", href: "/#collection" },
    { label: "All Perfumes", href: "/#perfumes" },
    { label: "Contact", href: "/#contact" },
  ],
} as const;
