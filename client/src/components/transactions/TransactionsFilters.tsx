"use client";

import { useState } from "react";

import { AmountRangeFilter } from "@/components/transactions/AmountRangeFilter";
import { DateRangeFilter } from "@/components/transactions/DateRangeFilter";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { Select } from "@/components/ui/Select";
import { dedupeCaseInsensitive } from "@/lib/collections";
import { useFilterOptions } from "@/lib/hooks/useFilterOptions";
import { useViewport } from "@/lib/hooks/useViewport";
import { DEFAULT_TRANSACTION_FILTERS, TransactionFilters } from "@/lib/transactionFilters";

const SORT_OPTIONS = [
  { value: "date_desc", label: "Newest first" },
  { value: "date_asc", label: "Oldest first" },
  { value: "amount_desc", label: "Highest amount" },
  { value: "amount_asc", label: "Lowest amount" },
] as const;

function activeFilterCount(filters: TransactionFilters) {
  let count = 0;
  if (filters.search) count += 1;
  if (filters.category) count += 1;
  if (filters.status) count += 1;
  if (filters.date_from || filters.date_to) count += 1;
  if (filters.amount_min || filters.amount_max) count += 1;
  return count;
}

function FilterControls({
  filters,
  categories,
  statuses,
  onChange,
  stacked,
}: {
  filters: TransactionFilters;
  categories: string[];
  statuses: string[];
  onChange: (patch: Partial<TransactionFilters>) => void;
  stacked: boolean;
}) {
  const controlClass = stacked ? "w-full" : "w-full sm:w-40";

  return (
    <div className={stacked ? "flex flex-col gap-3" : "flex flex-wrap items-center gap-2"}>
      <Input
        type="text"
        placeholder="Search merchant"
        value={filters.search}
        onChange={(e) => onChange({ search: e.target.value })}
        className={controlClass}
      />

      <Select
        value={filters.category}
        onChange={(e) => onChange({ category: e.target.value })}
        className={stacked ? "w-full" : undefined}
      >
        <option value="">All categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </Select>

      <Select
        value={filters.status}
        onChange={(e) => onChange({ status: e.target.value })}
        className={stacked ? "w-full" : undefined}
      >
        <option value="">All statuses</option>
        {statuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </Select>

      <DateRangeFilter
        dateFrom={filters.date_from}
        dateTo={filters.date_to}
        onChange={(patch) => onChange(patch)}
      />

      <AmountRangeFilter
        amountMin={filters.amount_min}
        amountMax={filters.amount_max}
        onChange={(patch) => onChange(patch)}
      />

      <Select
        value={`${filters.sort_by}_${filters.sort_dir}`}
        onChange={(e) => {
          const [sortBy, sortDir] = e.target.value.split("_") as [
            TransactionFilters["sort_by"],
            TransactionFilters["sort_dir"],
          ];
          onChange({ sort_by: sortBy, sort_dir: sortDir });
        }}
        className={stacked ? "w-full" : undefined}
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>

      <div className={stacked ? "border-t border-border pt-3" : "contents"}>
        <Button
          variant="ghost"
          className={stacked ? "w-full" : undefined}
          onClick={() => onChange(DEFAULT_TRANSACTION_FILTERS)}
        >
          Clear filters
        </Button>
      </div>
    </div>
  );
}

export function TransactionsFilters({
  filters,
  onChange,
}: {
  filters: TransactionFilters;
  onChange: (patch: Partial<TransactionFilters>) => void;
}) {
  const { data: options } = useFilterOptions();
  const categories = options ? dedupeCaseInsensitive(options.categories) : [];
  const statuses = options ? dedupeCaseInsensitive(options.statuses) : [];
  const { isWeb } = useViewport();
  const [modalOpen, setModalOpen] = useState(false);

  if (isWeb) {
    return (
      <div className="rounded-xl border border-border bg-surface p-3">
        <FilterControls
          filters={filters}
          categories={categories}
          statuses={statuses}
          onChange={onChange}
          stacked={false}
        />
      </div>
    );
  }

  const activeCount = activeFilterCount(filters);

  return (
    <div className="py-2">
      <Button
        variant={activeCount > 0 ? "primary" : "secondary"}
        className="w-fit"
        onClick={() => setModalOpen(true)}
      >
        <span className="flex items-center gap-1.5">
          Filters{activeCount > 0 ? ` (${activeCount})` : ""}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
        </span>
      </Button>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Filters">
        <FilterControls
          filters={filters}
          categories={categories}
          statuses={statuses}
          onChange={onChange}
          stacked
        />
      </Modal>
    </div>
  );
}
