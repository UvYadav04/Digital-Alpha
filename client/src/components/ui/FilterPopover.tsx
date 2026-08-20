"use client";

import { Button } from "@/components/ui/Button";
import { usePopoverState } from "@/lib/hooks/usePopoverState";

export function FilterPopover({
  label,
  active = false,
  children,
}: {
  label: string;
  active?: boolean;
  children: (close: () => void) => React.ReactNode;
}) {
  const { isOpen, setIsOpen, ref } = usePopoverState();

  return (
    <div className="relative" ref={ref}>
      <Button
        type="button"
        variant={active ? "primary" : "secondary"}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {label}
      </Button>
      {isOpen && (
        <div className="scrollbar-hide absolute left-0 z-20 mt-2 max-w-[calc(100vw-2rem)] overflow-x-auto rounded-lg border border-border bg-surface p-3 shadow-lg">
          {children(() => setIsOpen(false))}
        </div>
      )}
    </div>
  );
}
