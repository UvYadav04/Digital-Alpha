"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchTransactions, TransactionsQuery } from "@/api/transactions";

export function useTransactions(query: TransactionsQuery) {
  return useQuery({
    queryKey: ["transactions", query],
    queryFn: () => fetchTransactions(query),
    placeholderData: keepPreviousData,
  });
}
