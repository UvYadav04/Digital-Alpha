"use client";

import { useState } from "react";

import { Pagination } from "@/components/ui/Pagination";
import { TransactionsFilters } from "@/components/transactions/TransactionsFilters";
import { TransactionsTable } from "@/components/transactions/TransactionsTable";
import { useDebouncedValue } from "@/lib/hooks/useDebouncedValue";
import { useTransactions } from "@/lib/hooks/useTransactions";
import { DEFAULT_TRANSACTION_FILTERS, TransactionFilters } from "@/lib/transactionFilters";

const PAGE_SIZE = 20;

export default function Home() {
  const [filters, setFilters] = useState<TransactionFilters>(DEFAULT_TRANSACTION_FILTERS);
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebouncedValue(filters.search, 300);

  const handleFiltersChange = (patch: Partial<TransactionFilters>) => {
    setFilters((prev) => ({ ...prev, ...patch }));
    setPage(1);
  };

  const { data, isLoading, isError, error } = useTransactions({
    page,
    limit: PAGE_SIZE,
    sort_by: filters.sort_by,
    sort_dir: filters.sort_dir,
    category: filters.category || undefined,
    status: filters.status || undefined,
    date_from: filters.date_from || undefined,
    date_to: filters.date_to || undefined,
    amount_min: filters.amount_min ? Number(filters.amount_min) : undefined,
    amount_max: filters.amount_max ? Number(filters.amount_max) : undefined,
    search: debouncedSearch || undefined,
  });

  return (
    <div className="flex flex-col gap-4 p-4 md:p-6">
      <section className="h-72 rounded-xl border border-border bg-surface p-4 md:h-80">
        <h2 className="text-sm font-medium text-foreground/70">Spend by category</h2>
        <div className="flex h-[calc(100%-1.5rem)] items-center justify-center text-sm text-foreground/40">
          Chart goes here
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-medium text-foreground/70">Transactions</h2>

        <TransactionsFilters filters={filters} onChange={handleFiltersChange} />

        {isLoading && <p className="text-sm text-foreground/40">Loading…</p>}
        {isError && (
          <p className="text-sm text-red-500">
            Failed to load transactions: {error instanceof Error ? error.message : "unknown error"}
          </p>
        )}
        {data && <TransactionsTable rows={data.transactions.rows} />}

        {data && (
          <Pagination
            page={page}
            totalCount={data.transactions.total_count}
            limit={PAGE_SIZE}
            onPageChange={setPage}
          />
        )}
      </section>
    </div>
  );
}
