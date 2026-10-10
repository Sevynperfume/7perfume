"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronLeftIcon } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckoutPanel } from "@/features/checkout/components/checkout-panel";
import { RatingStars } from "@/features/reviews/components/rating-stars";
import { formatPrice } from "@/lib/format";
import type { Perfume, VariantId } from "../types";
import { FragranceNotes } from "./fragrance-notes";
import { PerfumeGallery } from "./perfume-gallery";
import { PriceTag } from "./price-tag";
import { StockBadge } from "./stock-badge";

export function PerfumeDetails({ perfume }: { perfume: Perfume }) {
  const [variantId, setVariantId] = useState<VariantId>(perfume.variants[0].id);
  const variant = perfume.variants.find((v) => v.id === variantId) ?? perfume.variants[0];

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: `radial-gradient(ellipse at 15% 0%, color-mix(in oklch, ${perfume.tint} 28%, transparent), transparent 55%), radial-gradient(ellipse at 100% 30%, color-mix(in oklch, ${perfume.tint} 16%, transparent), transparent 50%)`,
      }}
    >
      <Container className="pt-6 pb-14 md:pt-8 md:pb-20">
        <Link
          href="/#perfumes"
          className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeftIcon className="size-4" />
          Back to collection
        </Link>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Left: image gallery */}
          <Reveal variant="scale" className="lg:sticky lg:top-24 lg:self-start">
            {/* key: start from the first picture whenever the size changes */}
            <PerfumeGallery key={variant.id} images={variant.images} />
          </Reveal>

          {/* Right: details */}
          <div className="flex flex-col gap-8">
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{perfume.gender}</Badge>
                <Badge variant="secondary">{perfume.concentration}</Badge>
              </div>
              <h1 className="font-heading text-4xl font-semibold md:text-5xl">{perfume.name}</h1>
              <p className="text-muted-foreground">{perfume.tagline}</p>
              <a href="#reviews" className="flex w-fit items-center gap-2 text-sm hover:underline">
                <RatingStars rating={perfume.rating} />
                <span className="font-medium">{perfume.rating.toFixed(1)}</span>
                <span className="text-muted-foreground">({perfume.reviewCount} reviews)</span>
              </a>
            </div>

            <Separator />

            <div className="space-y-2">
              <h3 className="text-xs tracking-widest text-muted-foreground uppercase">Choose size</h3>
              <Tabs value={variant.id} onValueChange={(v) => setVariantId(v as VariantId)}>
                <TabsList className="h-auto! w-fit gap-1 p-1">
                  {perfume.variants.map((v) => (
                    <TabsTrigger key={v.id} value={v.id} className="h-8 gap-1.5 px-3 text-xs sm:px-4 sm:text-sm">
                      <span className="font-semibold">{v.label}</span>
                      <span className="font-normal opacity-70">{formatPrice(v.price)}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            <dl className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <dt className="text-xs tracking-widest text-muted-foreground uppercase">Price</dt>
                <dd>
                  <PriceTag price={variant.price} mrp={variant.mrp} size="lg" />
                </dd>
                <dd className="text-xs text-muted-foreground">
                  {variant.sizeLabel}, inclusive of taxes &middot; you save {formatPrice(variant.mrp - variant.price)}
                </dd>
              </div>
              <div className="space-y-1">
                <dt className="text-xs tracking-widest text-muted-foreground uppercase">Quantity available</dt>
                <dd className="text-3xl font-semibold tabular-nums">{perfume.stock}</dd>
                <dd>
                  <StockBadge stock={perfume.stock} />
                </dd>
              </div>
            </dl>

            <Separator />

            <div className="space-y-2">
              <h3 className="text-sm font-semibold tracking-widest uppercase">Description</h3>
              <p className="leading-relaxed text-muted-foreground">{perfume.description}</p>
            </div>

            <FragranceNotes notes={perfume.notes} />

            <Separator />

            <CheckoutPanel perfume={perfume} variant={variant} />
          </div>
        </div>
      </Container>
    </section>
  );
}
