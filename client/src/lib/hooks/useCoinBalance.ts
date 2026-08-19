"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchCoinBalance } from "@/api/wallet";

export function useCoinBalance() {
  return useQuery({
    queryKey: ["coins", "balance"],
    queryFn: fetchCoinBalance,
  });
}
