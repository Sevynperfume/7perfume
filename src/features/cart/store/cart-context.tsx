"use client";

import { createContext, useContext, useEffect, useMemo, useReducer } from "react";

import type { Perfume, PerfumeVariant, VariantId } from "@/features/perfumes/types";
import type { CartItem } from "../types";

// v2: cart lines are per size. Carts saved by the old version (no sizes, old prices) are dropped.
const STORAGE_KEY = "7seven-cart-v2";

export const lineIdOf = (perfumeId: string, variantId: VariantId) => `${perfumeId}:${variantId}`;

type Action =
  | { type: "hydrate"; items: CartItem[] }
  | { type: "add"; perfume: Perfume; variant: PerfumeVariant; quantity: number }
  | { type: "setQuantity"; lineId: string; quantity: number }
  | { type: "remove"; lineId: string }
  | { type: "clear"; dealerId?: string };

function clamp(quantity: number, stock: number) {
  return Math.max(0, Math.min(quantity, stock));
}

interface CartState {
  items: CartItem[];
  /** False until localStorage has been read on the client. */
  hydrated: boolean;
}

function reducer(state: CartState, action: Action): CartState {
  if (action.type === "hydrate") return { items: action.items, hydrated: true };
  return { ...state, items: itemsReducer(state.items, action) };
}

function itemsReducer(items: CartItem[], action: Exclude<Action, { type: "hydrate" }>): CartItem[] {
  switch (action.type) {
    case "add": {
      const { perfume, variant } = action;
      const lineId = lineIdOf(perfume.id, variant.id);
      const existing = items.find((i) => i.lineId === lineId);
      if (existing) {
        return items.map((i) =>
          i.lineId === lineId ? { ...i, quantity: clamp(i.quantity + action.quantity, i.stock) } : i,
        );
      }
      const quantity = clamp(action.quantity, perfume.stock);
      if (!quantity) return items;
      return [
        ...items,
        {
          lineId,
          perfumeId: perfume.id,
          variantId: variant.id,
          slug: perfume.slug,
          name: perfume.name,
          image: variant.images[0]?.src ?? perfume.images[0]?.src ?? "",
          sizeLabel: variant.sizeLabel,
          price: variant.price,
          mrp: variant.mrp,
          stock: perfume.stock,
          dealer: perfume.dealer,
          quantity,
        },
      ];
    }
    case "setQuantity":
      return items
        .map((i) => (i.lineId === action.lineId ? { ...i, quantity: clamp(action.quantity, i.stock) } : i))
        .filter((i) => i.quantity > 0);
    case "remove":
      return items.filter((i) => i.lineId !== action.lineId);
    case "clear":
      return action.dealerId ? items.filter((i) => i.dealer.id !== action.dealerId) : [];
  }
}

interface CartContextValue {
  items: CartItem[];
  hydrated: boolean;
  totalItems: number;
  subtotal: number;
  getQuantity: (perfumeId: string, variantId: VariantId) => number;
  addItem: (perfume: Perfume, variant: PerfumeVariant, quantity?: number) => void;
  setQuantity: (lineId: string, quantity: number) => void;
  removeItem: (lineId: string) => void;
  clearCart: (dealerId?: string) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [{ items, hydrated }, dispatch] = useReducer(reducer, { items: [], hydrated: false });

  // Load after mount so server and client render the same (empty) cart first.
  useEffect(() => {
    let saved: CartItem[] = [];
    try {
      saved = (JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as CartItem[]).filter((i) => i.lineId);
      localStorage.removeItem("7seven-cart");
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
    dispatch({ type: "hydrate", items: saved });
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      hydrated,
      totalItems: items.reduce((sum, i) => sum + i.quantity, 0),
      subtotal: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      getQuantity: (perfumeId, variantId) =>
        items.find((i) => i.lineId === lineIdOf(perfumeId, variantId))?.quantity ?? 0,
      addItem: (perfume, variant, quantity = 1) => dispatch({ type: "add", perfume, variant, quantity }),
      setQuantity: (lineId, quantity) => dispatch({ type: "setQuantity", lineId, quantity }),
      removeItem: (lineId) => dispatch({ type: "remove", lineId }),
      clearCart: (dealerId) => dispatch({ type: "clear", dealerId }),
    }),
    [items, hydrated],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within <CartProvider>");
  return context;
}
