"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { resetWallet } from "@/api/wallet";

export function useResetWallet() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: resetWallet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coins", "balance"] });
      queryClient.invalidateQueries({ queryKey: ["redemptions"] });
    },
  });
}
