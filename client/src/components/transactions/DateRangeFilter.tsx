"use client";

import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

import { Button } from "@/components/ui/Button";
import { FilterPopover } from "@/components/ui/FilterPopover";
import { formatShortDate, parseIsoDate, toIsoDate } from "@/lib/date";

export function DateRangeFilter({
  dateFrom,
  dateTo,
  onChange,
}: {
  dateFrom: string;
  dateTo: string;
  onChange: (patch: { date_from: string; date_to: string }) => void;
}) {
  const selected: DateRange | undefined =
    dateFrom || dateTo ? { from: parseIsoDate(dateFrom), to: parseIsoDate(dateTo) } : undefined;

  const label =
    dateFrom || dateTo
      ? `${formatShortDate(dateFrom) || "…"} – ${formatShortDate(dateTo) || "…"}`
      : "Date range";

  return (
    <FilterPopover label={label} active={Boolean(dateFrom || dateTo)}>
      {(close) => (
        <div className="flex flex-col gap-2">
          <DayPicker
            mode="range"
            numberOfMonths={2}
            selected={selected}
            onSelect={(range) =>
              onChange({
                date_from: range?.from ? toIsoDate(range.from) : "",
                date_to: range?.to ? toIsoDate(range.to) : "",
              })
            }
          />
          <div className="flex justify-end gap-2 border-t border-border pt-2">
            <Button variant="ghost" onClick={() => onChange({ date_from: "", date_to: "" })}>
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
