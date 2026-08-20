"use client";

import { useState } from "react";

import { Reward, RewardType } from "@/api/rewards";
import { Badge, BadgeTone } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useCoinBalance } from "@/lib/hooks/useCoinBalance";
import { useRedeemReward } from "@/lib/hooks/useRedeemReward";

const TYPE_LABEL: Record<RewardType, string> = {
  voucher: "Voucher",
  cashback: "Cashback",
  subscription: "Subscription",
  other: "Reward",
};

const TYPE_TONE: Record<RewardType, BadgeTone> = {
  voucher: "sunsetPlum",
  cashback: "sunsetGold",
  subscription: "sunsetOrange",
  other: "neutral",
};

type CardState = "idle" | "confirming" | "success" | "error";

export function RewardCard({ reward }: { reward: Reward }) {
  const [state, setState] = useState<CardState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const { data: wallet } = useCoinBalance();
  const redeem = useRedeemReward();

  const canAfford = wallet ? wallet.coin_balance >= reward.cost_in_coins : true;
  const isProcessing = redeem.isPending;

  const startConfirm = () => setState("confirming");
  const backToIdle = () => setState("idle");

  const confirmRedeem = () => {
    redeem.mutate(reward.id, {
      onSuccess: () => {
        setState("success");
        window.setTimeout(() => setState("idle"), 1500);
      },
      onError: (err) => {
        setErrorMessage(err instanceof Error ? err.message : "Redemption failed");
        setState("error");
      },
    });
  };

  return (
    <div className="group relative flex flex-col gap-3 rounded-xl border border-border bg-surface p-4">
      <div className="flex items-start justify-between gap-2">
        <Badge tone={TYPE_TONE[reward.type]}>{TYPE_LABEL[reward.type]}</Badge>
        <span className="flex items-center gap-1 text-sm font-semibold text-foreground/80">
          🪙 {reward.cost_in_coins.toLocaleString()}
        </span>
      </div>

      <div>
        <h3 className="text-sm font-semibold">{reward.name}</h3>
        <p className="mt-1 text-xs text-foreground/50">{reward.description}</p>
      </div>

      {/* Hover / focus reveal layer */}
      <div className="pointer-events-none absolute inset-0 flex items-end justify-center rounded-xl bg-surface/95 p-4 opacity-0 transition-opacity duration-150 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
        {state === "idle" && (
          <Button variant="primary" className="w-full" disabled={!canAfford} onClick={startConfirm}>
            {canAfford ? "Redeem" : "Not enough coins"}
          </Button>
        )}

        {state === "confirming" && !isProcessing && (
          <div className="flex w-full flex-col gap-2">
            <p className="text-center text-xs text-foreground/70">
              Redeem for {reward.cost_in_coins.toLocaleString()} coins?
            </p>
            <div className="flex gap-2">
              <Button variant="ghost" className="flex-1" onClick={backToIdle}>
                Back
              </Button>
              <Button variant="primary" className="flex-1" onClick={confirmRedeem}>
                Confirm
              </Button>
            </div>
          </div>
        )}

        {state === "confirming" && isProcessing && (
          <div className="flex w-full items-center justify-center gap-2 text-sm font-medium text-foreground/70">
            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-foreground/30 border-t-brand" />
            Processing…
          </div>
        )}

        {state === "success" && (
          <p className="text-center text-sm font-medium text-green-600 dark:text-green-400">Redeemed ✓</p>
        )}

        {state === "error" && (
          <div className="flex w-full flex-col gap-2">
            <p className="text-center text-xs text-red-500">{errorMessage}</p>
            <Button variant="secondary" className="w-full" onClick={backToIdle}>
              Try again
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
