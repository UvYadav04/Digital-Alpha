"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchTransactions, TransactionsQuery } from "@/api/transactions";

type SummaryFilters = Omit<TransactionsQuery, "page" | "limit" | "include_summary">;

export function useTransactionsSummary(filters: SummaryFilters) {
  return useQuery({
    queryKey: ["transactions", "summary", filters],
    queryFn: () => fetchTransactions({ ...filters, page: 1, limit: 1, include_summary: true }),
    select: (data) => data.summary,
  });
}
