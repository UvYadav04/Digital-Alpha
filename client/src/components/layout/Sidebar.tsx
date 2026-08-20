import { NAV_ITEMS, SETTINGS_ITEM } from "@/lib/nav";
import { NavLink } from "./NavLink";

export function Sidebar() {
  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-border bg-surface p-4 md:flex">
      <nav className="flex flex-1 flex-col gap-1">
        {NAV_ITEMS.map((item) => (
          <NavLink key={item.href} {...item} />
        ))}
      </nav>
      <div className="mt-auto border-t border-border pt-2">
        <NavLink {...SETTINGS_ITEM} />
      </div>
    </aside>
  );
}
