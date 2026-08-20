import { CoinBalanceBadge } from "./CoinBalanceBadge";
import { MobileNav } from "./MobileNav";

export function Header() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border bg-surface px-3 sm:px-4 md:px-6">
      <MobileNav />
      <span className="flex-1 truncate text-base font-semibold tracking-tight sm:text-lg">Digital Alpha</span>
      <CoinBalanceBadge />
    </header>
  );
}
