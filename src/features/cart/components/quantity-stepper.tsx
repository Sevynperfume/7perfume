"use client";

import { MinusIcon, PlusIcon, Trash2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface QuantityStepperProps {
  quantity: number;
  max: number;
  /** Lowest value. With 0 (default) the minus button becomes "remove" at 1. */
  min?: number;
  onChange: (quantity: number) => void;
  size?: "sm" | "lg";
  className?: string;
}

/** With min 0, decreasing below 1 calls onChange(0), which removes the item from the cart. */
export function QuantityStepper({ quantity, max, min = 0, onChange, size = "lg", className }: QuantityStepperProps) {
  const iconSize = size === "lg" ? "icon-lg" : "icon-sm";
  const removes = min === 0 && quantity <= 1;

  return (
    <div className={cn("flex items-center justify-between rounded-lg border bg-background", className)}>
      <Button
        variant="ghost"
        size={iconSize}
        aria-label={removes ? "Remove from cart" : "Decrease quantity"}
        disabled={min > 0 && quantity <= min}
        onClick={() => onChange(quantity - 1)}
      >
        {removes ? <Trash2Icon /> : <MinusIcon />}
      </Button>
      <span className="min-w-8 text-center text-sm font-medium tabular-nums" aria-live="polite">
        {quantity}
      </span>
      <Button
        variant="ghost"
        size={iconSize}
        aria-label="Increase quantity"
        disabled={quantity >= max}
        onClick={() => onChange(quantity + 1)}
      >
        <PlusIcon />
      </Button>
    </div>
  );
}
