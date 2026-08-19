"use client";

import { useState } from "react";

import { Pagination } from "@/components/ui/Pagination";
import { TransactionsTable } from "@/components/transactions/TransactionsTable";
import { useTransactions } from "@/lib/hooks/useTransactions";

const PAGE_SIZE = 20;

export default function Home() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useTransactions({
    page,
    limit: PAGE_SIZE,
    sort_by: "date",
    sort_dir: "desc",
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
