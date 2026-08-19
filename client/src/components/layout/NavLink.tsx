"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLink({
  href,
  label,
  compact = false,
}: {
  href: string;
  label: string;
  compact?: boolean;
}) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={[
        "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        compact ? "justify-center px-2 py-1.5 text-xs" : "",
        isActive
          ? "bg-brand text-brand-foreground"
          : "text-foreground/70 hover:bg-surface-muted hover:text-foreground",
      ].join(" ")}
    >
      <span>{label}</span>
    </Link>
  );
}
