import { AmountRangeFilter } from "@/components/transactions/AmountRangeFilter";
import { DateRangeFilter } from "@/components/transactions/DateRangeFilter";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { useFilterOptions } from "@/lib/hooks/useFilterOptions";
import { DEFAULT_TRANSACTION_FILTERS, TransactionFilters } from "@/lib/transactionFilters";

const SORT_OPTIONS = [
  { value: "date_desc", label: "Newest first" },
  { value: "date_asc", label: "Oldest first" },
  { value: "amount_desc", label: "Highest amount" },
  { value: "amount_asc", label: "Lowest amount" },
] as const;

export function TransactionsFilters({
  filters,
  onChange,
}: {
  filters: TransactionFilters;
  onChange: (patch: Partial<TransactionFilters>) => void;
}) {
  const { data: options } = useFilterOptions();

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl border border-border bg-surface p-3">
      <Input
        type="text"
        placeholder="Search merchant"
        value={filters.search}
        onChange={(e) => onChange({ search: e.target.value })}
        className="w-40"
      />

      <Select value={filters.category} onChange={(e) => onChange({ category: e.target.value })}>
        <option value="">All categories</option>
        {options?.categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </Select>

      <Select value={filters.status} onChange={(e) => onChange({ status: e.target.value })}>
        <option value="">All statuses</option>
        {options?.statuses.map((status) => (
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
          const [sortBy, sortDir] = e.target.value.split("_") as [TransactionFilters["sort_by"], TransactionFilters["sort_dir"]];
          onChange({ sort_by: sortBy, sort_dir: sortDir });
        }}
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>

      <Button variant="ghost" onClick={() => onChange(DEFAULT_TRANSACTION_FILTERS)}>
        Clear filters
      </Button>
    </div>
  );
}
