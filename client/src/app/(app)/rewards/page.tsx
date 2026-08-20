"use client";

import { useState } from "react";

import { RewardType } from "@/api/rewards";
import { MySubscriptions } from "@/components/rewards/MySubscriptions";
import { RewardCard } from "@/components/rewards/RewardCard";
import { Button } from "@/components/ui/Button";
import { useRewards } from "@/lib/hooks/useRewards";

const TYPE_TABS: { value: RewardType | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "voucher", label: "Vouchers" },
  { value: "cashback", label: "Cashback" },
  { value: "subscription", label: "Subscriptions" },
];

export default function Rewards() {
  const [typeFilter, setTypeFilter] = useState<RewardType | "all">("all");
  const { data: rewards, isLoading, isError } = useRewards();

  const filteredRewards = rewards?.filter((reward) => typeFilter === "all" || reward.type === typeFilter) ?? [];

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <div>
        <h1 className="text-lg font-semibold">Rewards</h1>
        <p className="mt-1 text-sm text-foreground/50">Hover a reward to redeem it with your coins.</p>
      </div>

      <section className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-2">
          {TYPE_TABS.map((tab) => (
            <Button
              key={tab.value}
              variant={typeFilter === tab.value ? "primary" : "secondary"}
              onClick={() => setTypeFilter(tab.value)}
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {isLoading && <p className="text-sm text-foreground/40">Loading rewards…</p>}
        {isError && <p className="text-sm text-red-500">Failed to load rewards.</p>}

        {rewards && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filteredRewards.map((reward) => (
              <RewardCard key={reward.id} reward={reward} />
            ))}
          </div>
        )}
      </section>

      <MySubscriptions />
    </div>
  );
}
