import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

interface PriceTagProps {
  price: number;
  /** Regular price, shown struck through when higher than the selling price. */
  mrp?: number;
  size?: "sm" | "md" | "lg";
  /** Show the "x% off" badge. */
  showSaving?: boolean;
  className?: string;
}

const sizes = {
  sm: { price: "text-lg", mrp: "text-sm", badge: "text-[10px] px-1.5" },
  md: { price: "text-xl", mrp: "text-sm", badge: "text-[11px] px-2" },
  lg: { price: "text-3xl", mrp: "text-lg", badge: "text-xs px-2.5 py-0.5" },
};

/** Selling price with the regular price struck through, e.g. ~~₹1,200~~ ₹699 42% off. */
export function PriceTag({ price, mrp, size = "md", showSaving = true, className }: PriceTagProps) {
  const discounted = mrp !== undefined && mrp > price;
  const off = discounted ? Math.round(((mrp - price) / mrp) * 100) : 0;
  const s = sizes[size];

  return (
    <span className={cn("inline-flex flex-wrap items-baseline gap-x-2 gap-y-1", className)}>
      <span className={cn("font-semibold tabular-nums", s.price)}>{formatPrice(price)}</span>
      {discounted && (
        <>
          <s className={cn("text-muted-foreground tabular-nums", s.mrp)} aria-label={`Regular price ${formatPrice(mrp)}`}>
            {formatPrice(mrp)}
          </s>
          {showSaving && (
            <span className={cn("self-center rounded-full bg-gold/15 py-0.5 font-medium text-gold", s.badge)}>{off}% off</span>
          )}
        </>
      )}
    </span>
  );
}
