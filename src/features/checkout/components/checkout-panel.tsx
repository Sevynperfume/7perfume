"use client";

import { CheckIcon, ShoppingBagIcon } from "lucide-react";
import { useState } from "react";

import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { Button } from "@/components/ui/button";
import { QuantityStepper } from "@/features/cart/components/quantity-stepper";
import { lineIdOf, useCart } from "@/features/cart/store/cart-context";
import type { Perfume, PerfumeVariant } from "@/features/perfumes/types";
import { formatPrice } from "@/lib/format";
import { openWhatsAppCheckout } from "../lib/whatsapp";

/** Quantity picker, then separate "Add to cart" and "Proceed to checkout" buttons. */
export function CheckoutPanel({ perfume, variant }: { perfume: Perfume; variant: PerfumeVariant }) {
  const { getQuantity, addItem, setQuantity } = useCart();
  const [quantity, setLocalQuantity] = useState(1);
  const soldOut = perfume.stock <= 0;
  const inCart = getQuantity(perfume.id, variant.id);

  // Puts exactly the chosen quantity in the cart (adds the line, or updates it).
  const handleAddToCart = () => {
    if (inCart > 0) setQuantity(lineIdOf(perfume.id, variant.id), quantity);
    else addItem(perfume, variant, quantity);
  };

  const handleCheckout = () =>
    openWhatsAppCheckout({
      dealer: perfume.dealer,
      lines: [
        {
          id: `${perfume.id}-${variant.id}`,
          name: perfume.name,
          size: variant.sizeLabel,
          price: variant.price,
          quantity,
        },
      ],
      pageUrl: window.location.href,
    });

  const cartLabel = soldOut ? "Sold out" : inCart === 0 ? "Add to cart" : inCart === quantity ? "Added to cart" : "Update cart";

  return (
    <div className="space-y-4">
      {!soldOut && (
        <div className="space-y-2">
          <h3 className="text-xs tracking-widest text-muted-foreground uppercase">Quantity</h3>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <QuantityStepper
              quantity={quantity}
              min={1}
              max={perfume.stock}
              onChange={setLocalQuantity}
              className="h-11 w-36"
            />
            <p className="text-sm text-muted-foreground">
              {quantity} x {formatPrice(variant.price)} ={" "}
              <span className="font-semibold text-foreground">{formatPrice(variant.price * quantity)}</span>
            </p>
          </div>
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        <Button
          size="lg"
          variant="outline"
          className="h-12 w-full text-base"
          disabled={soldOut}
          onClick={handleAddToCart}
        >
          {inCart > 0 && inCart === quantity ? <CheckIcon data-icon="inline-start" /> : <ShoppingBagIcon data-icon="inline-start" />}
          {cartLabel}
        </Button>
        <Button size="lg" className="h-12 w-full text-base" disabled={soldOut} onClick={handleCheckout}>
          {!soldOut && <WhatsAppIcon />}
          {soldOut ? "Out of stock" : "Proceed to checkout"}
        </Button>
      </div>

      {inCart > 0 && (
        <p className="text-sm text-muted-foreground">
          {inCart} x {variant.sizeLabel} in your cart.
        </p>
      )}
      <p className="text-xs text-muted-foreground">
        Checkout opens WhatsApp with your order details pre-filled for {perfume.dealer.name}.
      </p>
    </div>
  );
}
