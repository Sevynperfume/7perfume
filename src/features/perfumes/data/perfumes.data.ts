import { perfumeImage } from "@/lib/perfume-image";
import type { Dealer, FragranceNote, NoteFamily, NoteLayer, Perfume, PerfumeImage, PerfumeVariant, VariantId } from "../types";

// Mock data. Replace with a database query inside perfume.service.ts.
// Notes come from the SEVYN fragrance sheets in /public/seven_perfumes/*_fragnance.svg.
// Stock is a placeholder: update it with the real values.

type View = { file: string; label: string };

// Real product photos per size, relative to /images/perfumes/<slug>/. The first one is the cover
// used on cards, the carousel and the cart.
const PHOTOS: Record<VariantId, View[]> = {
  "50ml": [
    { file: "photo.svg", label: "bottle with box" },
    { file: "bottle.svg", label: "bottle close-up" },
  ],
  "30ml": [
    { file: "30ml/photo.svg", label: "bottle with box" },
    { file: "bottle.svg", label: "bottle close-up" },
  ],
  pocket: [{ file: "pocket/photo.svg", label: "pocket spray" }],
};

// Generated cards shown after the photos, taken from each size's own folder.
const CARDS: View[] = [
  { file: "notes.svg", label: "fragrance notes" },
  { file: "4.svg", label: "scent profile" },
];

/** Images live in /images/perfumes/<slug>/ (50 ml), .../30ml/ and .../pocket/. */
function gallery(slug: string, name: string, size: string, dir: string, photos: View[]): PerfumeImage[] {
  const cards = CARDS.map((card) => ({ ...card, file: dir ? `${dir}/${card.file}` : card.file }));
  return [...photos, ...cards].map((view) => ({
    src: perfumeImage(slug, view.file),
    alt: `${name}, ${size}, ${view.label}`,
  }));
}

/** Same sizes and prices for every perfume. mrp is the regular price shown struck through. */
const SIZES = [
  { id: "50ml", label: "50 ml", sizeLabel: "50 ml", mrp: 1200, price: 699, dir: "" },
  { id: "30ml", label: "30 ml", sizeLabel: "30 ml", mrp: 800, price: 350, dir: "30ml" },
  { id: "pocket", label: "Pocket", sizeLabel: "Pocket size", mrp: 250, price: 150, dir: "pocket" },
] as const;

/** Variants plus the default size's gallery. `photos` replaces the standard photos of a size. */
function media(slug: string, name: string, photos: Partial<Record<VariantId, View[]>> = {}) {
  const variants: PerfumeVariant[] = SIZES.map(({ dir, ...size }) => ({
    ...size,
    images: gallery(slug, name, size.sizeLabel, dir, photos[size.id] ?? PHOTOS[size.id]),
  }));
  return { variants, images: variants[0].images };
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
    ...media("beach-please", "Beach Please"),
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
      "Loud in the best way. Bombastic starts with sparkling bergamot and crackling black pepper, then pours on dark rum and warm cinnamon. The base is pure night-out: supple leather, incense smoke and earthy patchouli.",
    stock: 18,
    gender: "Unisex",
    family: "amber",
    tint: "#9b2c33",
    ...media("bombastic", "Bombastic"),
    notes: notes({
      top: ["Bergamot:citrus", "Black Pepper:spicy"],
      heart: ["Rum:sweet", "Cinnamon:spicy"],
      base: ["Leather:woody", "Incense:spicy", "Patchouli:green"],
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
    tagline: "Cool mint, lavender and sandalwood",
    description:
      "Clean, confident and effortlessly polished. Daddy opens with cool mint, bright bergamot and lavender, moves into airy seagrass and a warm kick of ginger, then settles on soft musk and creamy sandalwood.",
    stock: 22,
    gender: "Unisex",
    family: "fresh",
    tint: "#3d5a78",
    ...media("daddy", "Daddy"),
    notes: notes({
      top: ["Mint:fresh", "Bergamot:citrus", "Lavender:floral"],
      heart: ["Seagrass:fresh", "Ginger:spicy"],
      base: ["Musk:musky", "Sandalwood:woody"],
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
    ...media("pista-la-vista", "Pista La Vista"),
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
    ...media("plump-me-up", "Plump Me Up"),
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
    ...media("rizz-aro", "Rizz-Aro"),
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
    ...media("sweet-talk", "Sweet Talk", {
      "30ml": [
        { file: "30ml/photo.svg", label: "bottle with box" },
        { file: "30ml/photo-2.svg", label: "bottle with box, side view" },
        { file: "bottle.svg", label: "bottle close-up" },
      ],
    }),
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
