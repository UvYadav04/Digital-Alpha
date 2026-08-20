"use client";

import { useCoinBalance } from "@/lib/hooks/useCoinBalance";

export function CoinBalanceBadge() {
  const { data, isLoading, isError } = useCoinBalance();

  return (
    <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-surface-muted px-2.5 py-1.5 text-xs font-medium sm:px-3 sm:text-sm">
      <span aria-hidden>🪙</span>
      {isLoading && <span className="text-foreground/50">Loading…</span>}
      {isError && <span className="text-foreground/50">--</span>}
      {data && (
        <span>
          {data.coin_balance.toLocaleString()}
          <span className="hidden sm:inline"> coins</span>
        </span>
      )}
    </div>
  );
}
