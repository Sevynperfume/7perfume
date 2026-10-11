export type NoteFamily =
  | "citrus"
  | "floral"
  | "woody"
  | "spicy"
  | "fresh"
  | "sweet"
  | "musky"
  | "green"
  | "fruity";

export type NoteLayer = "top" | "heart" | "base";

export type FragranceFamily = "floral" | "woody" | "fresh" | "amber";

export interface FragranceNote {
  name: string;
  family: NoteFamily;
  layer: NoteLayer;
}

export interface PerfumeImage {
  src: string;
  alt: string;
}

export interface Dealer {
  id: string;
  name: string;
  /** International format, digits only, e.g. 919876543210 */
  whatsappNumber: string;
}

export type VariantId = "50ml" | "30ml" | "pocket";

/** One bottle size of a perfume, with its own price and pictures (a future `perfume_variants` table). */
export interface PerfumeVariant {
  id: VariantId;
  /** Short tab label, e.g. "50 ml" or "Pocket". */
  label: string;
  /** Size as shown to customers and in WhatsApp orders, e.g. "50 ml" or "Pocket size". */
  sizeLabel: string;
  /** Regular price, shown struck through. */
  mrp: number;
  /** Selling price. */
  price: number;
  /** Gallery for this size; the first image is the cover. */
  images: PerfumeImage[];
}

/**
 * Shape mirrors a future `perfumes` table. Keep fields flat and serialisable
 * so the same type works for mock data, a REST API or an ORM model.
 */
export interface Perfume {
  id: string;
  slug: string;
  name: string;
  brand: string;
  tagline: string;
  description: string;
  /** Sizes on sale. The first one is the default shown on cards and the carousel. */
  variants: PerfumeVariant[];
  /** Units in stock */
  stock: number;
  concentration: "Extrait de Parfum" | "Eau de Parfum" | "Eau de Toilette" | "Parfum" | "Attar";
  gender: "For Her" | "Unisex";
  family: FragranceFamily;
  /** Brand colour of the scent, used for page tints and accents. */
  tint: string;
  /** Gallery of the default size. First image is the cover used on cards, carousel and cart. */
  images: PerfumeImage[];
  notes: FragranceNote[];
  dealer: Dealer;
  featured: boolean;
  rating: number;
  reviewCount: number;
  createdAt: string;
}
