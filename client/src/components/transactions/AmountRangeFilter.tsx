"use client";

import { Button } from "@/components/ui/Button";
import { FilterPopover } from "@/components/ui/FilterPopover";
import { Input } from "@/components/ui/Input";

export function AmountRangeFilter({
  amountMin,
  amountMax,
  onChange,
}: {
  amountMin: string;
  amountMax: string;
  onChange: (patch: { amount_min: string; amount_max: string }) => void;
}) {
  const label =
    amountMin || amountMax
      ? `₹${amountMin || "0"} – ₹${amountMax || "any"}`
      : "Amount range";

  return (
    <FilterPopover label={label} active={Boolean(amountMin || amountMax)}>
      {(close) => (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Input
              type="number"
              inputMode="numeric"
              placeholder="Min"
              value={amountMin}
              onChange={(e) => onChange({ amount_min: e.target.value, amount_max: amountMax })}
              className="w-24"
            />
            <span className="text-foreground/40">–</span>
            <Input
              type="number"
              inputMode="numeric"
              placeholder="Max"
              value={amountMax}
              onChange={(e) => onChange({ amount_min: amountMin, amount_max: e.target.value })}
              className="w-24"
            />
          </div>
          <div className="flex justify-end gap-2 border-t border-border pt-2">
            <Button variant="ghost" onClick={() => onChange({ amount_min: "", amount_max: "" })}>
              Clear
            </Button>
            <Button variant="primary" onClick={close}>
              Done
            </Button>
          </div>
        </div>
      )}
    </FilterPopover>
  );
}
