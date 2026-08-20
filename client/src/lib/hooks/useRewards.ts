"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchRewards } from "@/api/rewards";

export function useRewards() {
  return useQuery({
    queryKey: ["rewards"],
    queryFn: fetchRewards,
  });
}
