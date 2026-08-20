"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchFilterOptions } from "@/api/transactions";

export function useFilterOptions() {
  return useQuery({
    queryKey: ["transactions", "filters"],
    queryFn: fetchFilterOptions,
    staleTime: 5 * 60_000,
  });
}
