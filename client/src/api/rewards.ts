import { apiGet } from "@/lib/api";

export type Reward = {
  id: number;
  name: string;
  description: string;
  cost_in_coins: number;
};

export function fetchRewards() {
  return apiGet<Reward[]>("/rewards");
}
