"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { redeemReward } from "@/api/wallet";

export function useRedeemReward() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (rewardId: number) => redeemReward(rewardId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coins", "balance"] });
      queryClient.invalidateQueries({ queryKey: ["redemptions"] });
    },
  });
}
