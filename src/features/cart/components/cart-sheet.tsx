"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBagIcon, XIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { openWhatsAppCheckout } from "@/features/checkout/lib/whatsapp";
import type { Dealer } from "@/features/perfumes/types";
import { formatPrice } from "@/lib/format";
import { useCart } from "../store/cart-context";
import type { CartItem } from "../types";
import { QuantityStepper } from "./quantity-stepper";

function groupByDealer(items: CartItem[]) {
  const groups = new Map<string, { dealer: Dealer; items: CartItem[] }>();
  items.forEach((item) => {
    const group = groups.get(item.dealer.id) ?? { dealer: item.dealer, items: [] };
    group.items.push(item);
    groups.set(item.dealer.id, group);
  });
  return [...groups.values()];
}

export function CartSheet() {
  const { items, totalItems, subtotal, hydrated, setQuantity, removeItem } = useCart();
  const groups = groupByDealer(items);
  const savings = items.reduce((sum, i) => sum + (i.mrp - i.price) * i.quantity, 0);

  const checkout = (dealer: Dealer, dealerItems: CartItem[]) =>
    openWhatsAppCheckout({
      dealer,
      lines: dealerItems.map((i) => ({
        id: `${i.perfumeId}-${i.variantId}`,
        name: i.name,
        size: i.sizeLabel,
        price: i.price,
        quantity: i.quantity,
      })),
    });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="lg" className="h-10 gap-2 px-4" aria-label={`Cart, ${totalItems} items`}>
          <ShoppingBagIcon data-icon="inline-start" />
          <span>Cart</span>
          {hydrated && totalItems > 0 && (
            <Badge className="h-5 min-w-5 justify-center rounded-full bg-primary-foreground px-1.5 text-[11px] text-primary tabular-nums">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="flex w-full flex-col gap-0 sm:max-w-md">
        <SheetHeader className="border-b">
          <SheetTitle>Your cart</SheetTitle>
          <SheetDescription>
            {totalItems} {totalItems === 1 ? "item" : "items"}
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
            <ShoppingBagIcon className="size-10 text-muted-foreground" />
            <p className="text-muted-foreground">Your cart is empty.</p>
            <SheetClose asChild>
              <Button asChild size="lg" className="h-10 px-5">
                <Link href="/#perfumes">Browse perfumes</Link>
              </Button>
            </SheetClose>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-6 overflow-y-auto p-4">
              {groups.map(({ dealer, items: dealerItems }) => (
                <div key={dealer.id} className="space-y-4">
                  {groups.length > 1 && (
                    <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
                      Sold by {dealer.name}
                    </p>
                  )}
                  <ul className="space-y-4">
                    {dealerItems.map((item) => (
                      <li key={item.lineId} className="flex gap-3">
                        <SheetClose asChild>
                          <Link
                            href={`/perfumes/${item.slug}`}
                            className="relative size-20 shrink-0 overflow-hidden rounded-md border bg-muted"
                          >
                            <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover" />
                          </Link>
                        </SheetClose>
                        <div className="flex flex-1 flex-col gap-2">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {item.sizeLabel} &middot; {formatPrice(item.price)}{" "}
                                {item.mrp > item.price && <s className="text-muted-foreground/70">{formatPrice(item.mrp)}</s>}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              aria-label={`Remove ${item.name}`}
                              onClick={() => removeItem(item.lineId)}
                            >
                              <XIcon />
                            </Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <QuantityStepper
                              size="sm"
                              quantity={item.quantity}
                              max={item.stock}
                              onChange={(q) => setQuantity(item.lineId, q)}
                              className="h-8 w-28"
                            />
                            <span className="text-sm font-semibold">{formatPrice(item.price * item.quantity)}</span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  {groups.length > 1 && (
                    <Button variant="outline" size="lg" className="h-10 w-full" onClick={() => checkout(dealer, dealerItems)}>
                      Checkout with {dealer.name}
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <SheetFooter className="border-t">
              <div className="flex items-center justify-between text-base">
                <span>Subtotal</span>
                <span className="font-semibold">{formatPrice(subtotal)}</span>
              </div>
              {savings > 0 && (
                <div className="flex items-center justify-between text-sm text-gold">
                  <span>You save</span>
                  <span className="font-medium">{formatPrice(savings)}</span>
                </div>
              )}
              {groups.length === 1 ? (
                <Button size="lg" className="h-12 w-full text-base" onClick={() => checkout(groups[0].dealer, groups[0].items)}>
                  Proceed to checkout
                </Button>
              ) : (
                <p className="text-xs text-muted-foreground">
                  Your cart has items from {groups.length} dealers. Check out with each dealer above.
                </p>
              )}
              <p className="text-xs text-muted-foreground">Orders are confirmed with the dealer on WhatsApp.</p>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
