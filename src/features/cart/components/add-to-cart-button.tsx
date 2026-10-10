"use client";

import { ShoppingBagIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Perfume, PerfumeVariant } from "@/features/perfumes/types";
import { cn } from "@/lib/utils";
import { lineIdOf, useCart } from "../store/cart-context";
import { QuantityStepper } from "./quantity-stepper";

interface AddToCartButtonProps {
  perfume: Perfume;
  /** Size to add; defaults to the perfume's first (default) size. */
  variant?: PerfumeVariant;
  size?: "sm" | "lg";
  className?: string;
}

/** Shows "Add to cart" until the item is in the cart, then swaps to a quantity stepper. */
export function AddToCartButton({ perfume, variant = perfume.variants[0], size = "lg", className }: AddToCartButtonProps) {
  const { getQuantity, addItem, setQuantity } = useCart();
  const quantity = getQuantity(perfume.id, variant.id);
  const soldOut = perfume.stock <= 0;
  const height = size === "lg" ? "h-12" : "h-9";

  if (quantity > 0) {
    return (
      <QuantityStepper
        quantity={quantity}
        max={perfume.stock}
        onChange={(q) => setQuantity(lineIdOf(perfume.id, variant.id), q)}
        size={size}
        className={cn(height, className)}
      />
    );
  }

  return (
    <Button
      size="lg"
      variant={size === "lg" ? "outline" : "default"}
      disabled={soldOut}
      onClick={() => addItem(perfume, variant)}
      className={cn(height, "px-4", className)}
    >
      <ShoppingBagIcon data-icon="inline-start" />
      {soldOut ? "Sold out" : "Add to cart"}
    </Button>
  );
}
