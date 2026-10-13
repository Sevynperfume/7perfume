import { perfumeImage } from "@/lib/perfume-image";
import type { Dealer, FragranceNote, NoteFamily, NoteLayer, Perfume, PerfumeImage, PerfumeVariant } from "../types";

// Mock data. Replace with a database query inside perfume.service.ts.
// Notes come from the SEVYN fragrance sheets in /public/seven_perfumes/*_fragnance.svg.
// Stock is a placeholder: update it with the real values.

// Gallery order: the first image is the cover used on cards, the carousel and the cart.
const views = [
  { file: "1.svg", label: "front view" },
  { file: "notes.svg", label: "fragrance notes" },
  { file: "2.svg", label: "editorial portrait" },
  { file: "3.svg", label: "studio shot" },
  { file: "4.svg", label: "scent profile" },
];

/** Images live in /images/perfumes/<slug>/ (50 ml), .../30ml/ and .../pocket/. */
function gallery(slug: string, name: string, dir = "", size = "50 ml"): PerfumeImage[] {
  return views.map((view) => ({
    src: perfumeImage(slug, dir ? `${dir}/${view.file}` : view.file),
    alt: `${name}, ${size}, ${view.label}`,
  }));
}

/** Same sizes and prices for every perfume. mrp is the regular price shown struck through. */
const SIZES = [
  { id: "50ml", label: "50 ml", sizeLabel: "50 ml", mrp: 1200, price: 699, dir: "" },
  { id: "30ml", label: "30 ml", sizeLabel: "30 ml", mrp: 800, price: 350, dir: "30ml" },
  { id: "pocket", label: "Pocket", sizeLabel: "Pocket size", mrp: 250, price: 150, dir: "pocket" },
] as const;

function variants(slug: string, name: string): PerfumeVariant[] {
  return SIZES.map(({ dir, ...size }) => ({ ...size, images: gallery(slug, name, dir, size.sizeLabel) }));
}

/** Builds the notes list from "Name:family" pairs per layer. */
function notes(layers: Record<NoteLayer, string[]>): FragranceNote[] {
  return (Object.entries(layers) as [NoteLayer, string[]][]).flatMap(([layer, items]) =>
    items.map((item) => {
      const [name, family] = item.split(":");
      return { name, family: family as NoteFamily, layer };
    }),
  );
}

const mainDealer: Dealer = {
  id: "dealer-1",
  name: "SEVYN Perfumes",
  whatsappNumber: "917757902771",
};

const shared = {
  brand: "SEVYN",
  concentration: "Extrait de Parfum",
  dealer: mainDealer,
} as const;

export const perfumes: Perfume[] = [
  {
    ...shared,
    id: "p-001",
    slug: "beach-please",
    name: "Beach Please",
    tagline: "Citrus, mint and a salty breeze",
    description:
      "A day on the coast in a bottle. Beach Please opens with a bright splash of citron, lemon and cool mint, softens into sun-ripened apricot and fresh basil, then dries down to creamy fig and the soft, skin-like musk of ambrette. Light, carefree and made for warm days.",
    stock: 25,
    gender: "Unisex",
    family: "fresh",
    tint: "#3a9cc4",
    variants: variants("beach-please", "Beach Please"),
    images: gallery("beach-please", "Beach Please"),
    notes: notes({
      top: ["Citron:citrus", "Lemon:citrus", "Mint:fresh"],
      heart: ["Apricot:fruity", "Basil:green"],
      base: ["Fig:fruity", "Ambrette:musky"],
    }),
    featured: true,
    rating: 4.6,
    reviewCount: 112,
    createdAt: "2026-03-10",
  },
  {
    ...shared,
    id: "p-002",
    slug: "bombastic",
    name: "Bombastic",
    tagline: "Rum, leather and smoky incense",
    description:
      "Loud in the best way. Bombastic starts with sparkling bergamot, crackling black pepper and bay leaf, then pours on dark rum and cinnamon warmed by clary sage, African geranium and woods. The base is pure night-out: supple leather, incense smoke, resinous benzoin, patchouli and cedar.",
    stock: 18,
    gender: "Unisex",
    family: "amber",
    tint: "#9b2c33",
    variants: variants("bombastic", "Bombastic"),
    images: gallery("bombastic", "Bombastic"),
    notes: notes({
      top: ["Bergamot:citrus", "Black Pepper:spicy", "Bay Leaf:green"],
      heart: ["Rum:sweet", "Cinnamon:spicy", "Clary Sage:green", "African Geranium:floral", "Woody Notes:woody"],
      base: ["Leather:woody", "Incense:spicy", "Benzoin:sweet", "Patchouli:green", "Cedar:woody"],
    }),
    featured: true,
    rating: 4.8,
    reviewCount: 164,
    createdAt: "2026-04-02",
  },
  {
    ...shared,
    id: "p-003",
    slug: "daddy",
    name: "Daddy",
    tagline: "Crisp citrus over sandalwood and amber",
    description:
      "Clean, confident and effortlessly polished. Daddy opens with mint, sparkling aldehydes, lavender and a bright citrus burst of bergamot, mandarin and lemon, lifted by artemisia and neroli. The heart blends airy seagrass and ginger with jasmine, geranium, rosewood, cyclamen and rose, before settling on musk, sandalwood, cedar, guaiac wood and amber.",
    stock: 22,
    gender: "Unisex",
    family: "fresh",
    tint: "#3d5a78",
    variants: variants("daddy", "Daddy"),
    images: gallery("daddy", "Daddy"),
    notes: notes({
      top: [
        "Mint:fresh", "Aldehydes:fresh", "Lavender:floral", "Bergamot:citrus",
        "Mandarin Orange:citrus", "Lemon:citrus", "Artemisia:green", "Neroli:floral",
      ],
      heart: [
        "Seagrass:fresh", "Ginger:spicy", "Jasmine:floral", "Geranium:floral",
        "Brazilian Rosewood:woody", "Cyclamen:floral", "Rose:floral",
      ],
      base: ["Musk:musky", "Sandalwood:woody", "Cedar:woody", "Guaiac Wood:woody", "Amber:sweet"],
    }),
    featured: true,
    rating: 4.7,
    reviewCount: 198,
    createdAt: "2026-02-14",
  },
  {
    ...shared,
    id: "p-004",
    slug: "pista-la-vista",
    name: "Pista La Vista",
    tagline: "Pineapple, apple and warm amber",
    description:
      "Juicy and playful from the first spray. Pista La Vista bursts with lemon, herbal armoise and ripe pineapple, moves into crisp apple and powdery violet with a touch of resinous labdanum, and finishes on a warm, earthy trail of amber and patchouli.",
    stock: 30,
    gender: "Unisex",
    family: "fresh",
    tint: "#7d9a3c",
    variants: variants("pista-la-vista", "Pista La Vista"),
    images: gallery("pista-la-vista", "Pista La Vista"),
    notes: notes({
      top: ["Lemon:citrus", "Armoise:green", "Pineapple:fruity"],
      heart: ["Apple:fruity", "Violet:floral", "Labdanum:sweet"],
      base: ["Amber:sweet", "Patchouli:green"],
    }),
    featured: true,
    rating: 4.5,
    reviewCount: 87,
    createdAt: "2026-05-20",
  },
  {
    ...shared,
    id: "p-005",
    slug: "plump-me-up",
    name: "Plump Me Up",
    tagline: "Sweet orange, saffron and oud",
    description:
      "Rich, spiced and quietly opulent. Plump Me Up opens with fresh, sweet orange, then turns warm with spicy pink peppercorn and leathery saffron. Deep, woody agarwood (oud) carries it for hours, made for evenings and special occasions.",
    stock: 12,
    gender: "For Her",
    family: "woody",
    tint: "#75469a",
    variants: variants("plump-me-up", "Plump Me Up"),
    images: gallery("plump-me-up", "Plump Me Up"),
    notes: notes({
      top: ["Sweet Orange:citrus"],
      heart: ["Pink Peppercorn:spicy", "Saffron:spicy"],
      base: ["Agarwood (Oud):woody"],
    }),
    featured: true,
    rating: 4.8,
    reviewCount: 96,
    createdAt: "2026-06-12",
  },
  {
    ...shared,
    id: "p-006",
    slug: "rizz-aro",
    name: "Rizz-Aro",
    tagline: "Cardamom, toffee and amberwood",
    description:
      "Charm, bottled. Rizz-Aro opens with aromatic cardamom, melts into a smooth toffee and caramel accord, and settles on warm, glowing amberwood. Sweet without being sugary, it is a close, cosy gourmand for date nights.",
    stock: 20,
    gender: "Unisex",
    family: "amber",
    tint: "#b8863b",
    variants: variants("rizz-aro", "Rizz-Aro"),
    images: gallery("rizz-aro", "Rizz-Aro"),
    notes: notes({
      top: ["Cardamom:spicy"],
      heart: ["Toffee (Caramel):sweet"],
      base: ["Amberwood:woody"],
    }),
    featured: true,
    rating: 4.6,
    reviewCount: 74,
    createdAt: "2026-07-08",
  },
  {
    ...shared,
    id: "p-007",
    slug: "sweet-talk",
    name: "Sweet Talk",
    tagline: "White peach, jasmine and vanilla",
    description:
      "Soft, romantic and impossible to ignore. Sweet Talk opens with velvety white peach and tangy black currant, blooms into violet and Egyptian jasmine, and dries down to creamy Madagascar vanilla wrapped in clean white musk.",
    stock: 28,
    gender: "For Her",
    family: "floral",
    tint: "#c98b86",
    variants: variants("sweet-talk", "Sweet Talk"),
    images: gallery("sweet-talk", "Sweet Talk"),
    notes: notes({
      top: ["White Peach:fruity", "Black Currant:fruity"],
      heart: ["Violet:floral", "Egyptian Jasmine:floral"],
      base: ["Madagascar Vanilla:sweet", "White Musk:musky"],
    }),
    featured: true,
    rating: 4.7,
    reviewCount: 143,
    createdAt: "2026-08-01",
  },
];
