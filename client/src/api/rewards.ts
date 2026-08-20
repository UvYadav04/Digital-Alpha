import { apiGet } from "@/lib/api";

export type RewardType = "voucher" | "cashback" | "subscription" | "other";

export type Reward = {
  id: number;
  name: string;
  type: RewardType;
  description: string;
  cost_in_coins: number;
};

export function fetchRewards() {
  return apiGet<Reward[]>("/rewards");
}
