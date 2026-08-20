"use client";

import { useState } from "react";

import { ChartCarousel } from "@/components/charts/ChartCarousel";
import { MonthlyTrendChart } from "@/components/charts/MonthlyTrendChart";
import { SpendByCategoryChart } from "@/components/charts/SpendByCategoryChart";
import { LoadingOverlay } from "@/components/ui/LoadingOverlay";
import { Pagination } from "@/components/ui/Pagination";
import { TransactionsFilters } from "@/components/transactions/TransactionsFilters";
import { TransactionsTable } from "@/components/transactions/TransactionsTable";
import { monthBounds } from "@/lib/date";
import { useDebouncedValue } from "@/lib/hooks/useDebouncedValue";
import { useTransactions } from "@/lib/hooks/useTransactions";
import { useTransactionsSummary } from "@/lib/hooks/useTransactionsSummary";
import { DEFAULT_TRANSACTION_FILTERS, TransactionFilters } from "@/lib/transactionFilters";

const PAGE_SIZE = 20;
const FILTER_DEBOUNCE_MS = 1000;

export default function Home() {
  const [filters, setFilters] = useState<TransactionFilters>(DEFAULT_TRANSACTION_FILTERS);
  const [page, setPage] = useState(1);

  const debouncedFilters = useDebouncedValue(filters, FILTER_DEBOUNCE_MS);

  const handleFiltersChange = (patch: Partial<TransactionFilters>) => {
    setFilters((prev) => ({ ...prev, ...patch }));
    setPage(1);
  };

  const sharedFilters = {
    sort_by: debouncedFilters.sort_by,
    sort_dir: debouncedFilters.sort_dir,
    date_from: debouncedFilters.date_from || undefined,
    date_to: debouncedFilters.date_to || undefined,
    amount_min: debouncedFilters.amount_min ? Number(debouncedFilters.amount_min) : undefined,
    amount_max: debouncedFilters.amount_max ? Number(debouncedFilters.amount_max) : undefined,
    search: debouncedFilters.search || undefined,
  };

  // Chart summaries stay independent of the category / status filters so that
  // clicking a chart segment narrows the table without collapsing the chart itself.
  const {
    data,
    isFetching: isTableFetching,
    isError,
    error,
  } = useTransactions({
    ...sharedFilters,
    category: debouncedFilters.category || undefined,
    status: debouncedFilters.status || undefined,
    page,
    limit: PAGE_SIZE,
  });

  const { data: summary, isFetching: isSummaryFetching } = useTransactionsSummary(sharedFilters);

  const isUpdating = isTableFetching || isSummaryFetching;

  const selectedMonth = (() => {
    if (!filters.date_from || !filters.date_to) return "";
    const month = filters.date_from.slice(0, 7);
    const bounds = monthBounds(month);
    return bounds.from === filters.date_from && bounds.to === filters.date_to ? month : "";
  })();

  const handleMonthClick = (month: string) => {
    if (!month) {
      handleFiltersChange({ date_from: "", date_to: "" });
      return;
    }
    const bounds = monthBounds(month);
    handleFiltersChange({ date_from: bounds.from, date_to: bounds.to });
  };

  return (
    <div className="relative flex flex-col gap-4 px-4 pb-4 md:px-6 md:pb-6">
      <LoadingOverlay show={isUpdating} />

      <section className="mt-4 h-[274px] rounded-xl border border-border bg-surface p-4 md:mt-6 md:h-[304px]">
        <ChartCarousel
          slides={[
            {
              key: "category",
              title: "Spend by category",
              content: summary && (
                <SpendByCategoryChart
                  data={summary.by_category}
                  selectedCategory={filters.category}
                  onCategoryClick={(category) => handleFiltersChange({ category })}
                />
              ),
            },
            {
              key: "trend",
              title: "Monthly spend trend",
              content: summary && (
                <MonthlyTrendChart
                  data={summary.by_month}
                  selectedMonth={selectedMonth}
                  onMonthClick={handleMonthClick}
                />
              ),
            },
          ]}
        />
      </section>

      <section className="sticky top-0 z-10 flex flex-col gap-3 bg-background py-2">
        {/* <h2 className="text-sm font-medium text-foreground/70">Transactions</h2> */}

        {isError && (
          <p className="text-sm text-red-500">
            Failed to load transactions: {error instanceof Error ? error.message : "unknown error"}
          </p>
        )}

        <TransactionsFilters filters={filters} onChange={handleFiltersChange} />

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
