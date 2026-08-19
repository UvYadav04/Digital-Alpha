import { CoinBalanceBadge } from "./CoinBalanceBadge";

export function Header() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-surface px-4 md:px-6">
      <span className="text-lg font-semibold tracking-tight">Digital Alpha</span>
      <CoinBalanceBadge />
    </header>
  );
}
