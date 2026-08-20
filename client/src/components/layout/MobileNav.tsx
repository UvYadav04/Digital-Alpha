"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { NAV_ITEMS, SETTINGS_ITEM } from "@/lib/nav";
import { usePopoverState } from "@/lib/hooks/usePopoverState";

const ITEMS = [...NAV_ITEMS, SETTINGS_ITEM];

export function MobileNav() {
  const { isOpen, setIsOpen, ref } = usePopoverState();
  const pathname = usePathname();

  return (
    <div className="relative md:hidden" ref={ref}>
      <button
        type="button"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border text-base"
      >
        {isOpen ? "✕" : "☰"}
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-30 mt-2 w-48 rounded-lg border border-border bg-surface p-1.5 shadow-lg">
          {ITEMS.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-brand text-brand-foreground"
                    : "text-foreground/70 hover:bg-surface-muted hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
