"use client";

import { useState } from "react";
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
  const [localFrom, setLocalFrom] = useState(dateFrom);
  const [localTo, setLocalTo] = useState(dateTo);
  const [syncedFrom, setSyncedFrom] = useState(dateFrom);
  const [syncedTo, setSyncedTo] = useState(dateTo);

  if (dateFrom !== syncedFrom || dateTo !== syncedTo) {
    setSyncedFrom(dateFrom);
    setSyncedTo(dateTo);
    setLocalFrom(dateFrom);
    setLocalTo(dateTo);
  }

  const selected: DateRange | undefined =
    localFrom || localTo ? { from: parseIsoDate(localFrom), to: parseIsoDate(localTo) } : undefined;

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
            numberOfMonths={1}
            selected={selected}
            onSelect={(range) => {
              setLocalFrom(range?.from ? toIsoDate(range.from) : "");
              setLocalTo(range?.to ? toIsoDate(range.to) : "");
            }}
          />
          <div className="flex justify-end gap-2 border-t border-border pt-2">
            <Button
              variant="ghost"
              onClick={() => {
                setLocalFrom("");
                setLocalTo("");
                onChange({ date_from: "", date_to: "" });
              }}
            >
              Clear
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                onChange({ date_from: localFrom, date_to: localTo });
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
