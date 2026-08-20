"use client";

import { RewardType } from "@/api/rewards";
import { Badge, BadgeTone } from "@/components/ui/Badge";
import { useRedemptions } from "@/lib/hooks/useRedemptions";

const TYPE_LABEL: Record<RewardType, string> = {
  voucher: "Voucher",
  cashback: "Cashback",
  subscription: "Subscription",
  other: "Reward",
};

const TYPE_TONE: Record<RewardType, BadgeTone> = {
  voucher: "neutral",
  cashback: "success",
  subscription: "warning",
  other: "neutral",
};

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function MySubscriptions() {
  const { data: redemptions, isLoading } = useRedemptions();

  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-sm font-medium text-foreground/70">My subscriptions</h2>

      {isLoading && <p className="text-sm text-foreground/40">Loading…</p>}

      {redemptions && redemptions.length === 0 && (
        <p className="text-sm text-foreground/40">You haven&apos;t redeemed anything yet.</p>
      )}

      {redemptions && redemptions.length > 0 && (
        <div className="flex flex-col divide-y divide-border rounded-xl border border-border bg-surface">
          {redemptions.map((redemption) => (
            <div key={redemption.id} className="flex items-center justify-between gap-3 px-4 py-3">
              <div className="flex items-center gap-3">
                <Badge tone={TYPE_TONE[redemption.type]}>{TYPE_LABEL[redemption.type]}</Badge>
                <div>
                  <p className="text-sm font-medium">{redemption.name}</p>
                  <p className="text-xs text-foreground/40">{formatDate(redemption.redeemed_at)}</p>
                </div>
              </div>
              <span className="text-sm font-semibold text-foreground/70">
                🪙 {redemption.coins_spent.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
