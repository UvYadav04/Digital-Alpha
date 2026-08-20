import { apiGet, apiPost } from "@/lib/api";
import { RewardType } from "@/api/rewards";

export type Wallet = {
  id: number;
  coin_balance: number;
};

export type Redemption = {
  id: number;
  reward_id: number;
  name: string;
  type: RewardType;
  coins_spent: number;
  redeemed_at: string;
};

export type RedeemResponse = {
  redemption: {
    id: number;
    reward_id: number;
    name: string;
    type: RewardType;
    coins_spent: number;
    redeemed_at: string;
  };
  coin_balance: number;
};

export function fetchCoinBalance() {
  return apiGet<Wallet>("/coins/balance");
}

export function fetchRedemptions() {
  return apiGet<Redemption[]>("/redemptions");
}

export function redeemReward(rewardId: number) {
  return apiPost<RedeemResponse>("/redeem", { reward_id: rewardId });
}

export function resetWallet() {
  return apiPost<{ status: string }>("/admin/reset", {});
}
