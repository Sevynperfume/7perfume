import type { Dealer, VariantId } from "@/features/perfumes/types";

/**
 * A snapshot of the perfume size at the time it was added. When a database is
 * added, persist `perfumeId` + `variantId` + `quantity` per user and re-read
 * price/stock from the server before checkout.
 */
export interface CartItem {
  /** Unique per perfume and size: "<perfumeId>:<variantId>". */
  lineId: string;
  perfumeId: string;
  variantId: VariantId;
  slug: string;
  name: string;
  image: string;
  /** e.g. "50 ml" or "Pocket size" */
  sizeLabel: string;
  price: number;
  mrp: number;
  stock: number;
  dealer: Dealer;
  quantity: number;
}
