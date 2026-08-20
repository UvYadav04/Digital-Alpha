"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchRedemptions } from "@/api/wallet";

export function useRedemptions() {
  return useQuery({
    queryKey: ["redemptions"],
    queryFn: fetchRedemptions,
  });
}
