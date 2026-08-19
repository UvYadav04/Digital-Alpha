"use client";

import { useCoinBalance } from "@/lib/hooks/useCoinBalance";

export function CoinBalanceBadge() {
  const { data, isLoading, isError } = useCoinBalance();

  return (
    <div className="flex items-center gap-1.5 rounded-full border border-border bg-surface-muted px-3 py-1.5 text-sm font-medium">
      <span aria-hidden>🪙</span>
      {isLoading && <span className="text-foreground/50">Loading…</span>}
      {isError && <span className="text-foreground/50">--</span>}
      {data && <span>{data.coin_balance.toLocaleString()} coins</span>}
    </div>
  );
}
