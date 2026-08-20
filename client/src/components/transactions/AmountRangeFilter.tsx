"use client";

import { useState } from "react";

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
  const [localMin, setLocalMin] = useState(amountMin);
  const [localMax, setLocalMax] = useState(amountMax);
  const [syncedMin, setSyncedMin] = useState(amountMin);
  const [syncedMax, setSyncedMax] = useState(amountMax);

  if (amountMin !== syncedMin || amountMax !== syncedMax) {
    setSyncedMin(amountMin);
    setSyncedMax(amountMax);
    setLocalMin(amountMin);
    setLocalMax(amountMax);
  }

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
              value={localMin}
              onChange={(e) => setLocalMin(e.target.value)}
              className="w-24"
            />
            <span className="text-foreground/40">–</span>
            <Input
              type="number"
              inputMode="numeric"
              placeholder="Max"
              value={localMax}
              onChange={(e) => setLocalMax(e.target.value)}
              className="w-24"
            />
          </div>
          <div className="flex justify-end gap-2 border-t border-border pt-2">
            <Button
              variant="ghost"
              onClick={() => {
                setLocalMin("");
                setLocalMax("");
                onChange({ amount_min: "", amount_max: "" });
              }}
            >
              Clear
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                onChange({ amount_min: localMin, amount_max: localMax });
                close();
              }}
            >
              Done
            </Button>
          </div>
        </div>
      )}
    </FilterPopover>
  );
}
