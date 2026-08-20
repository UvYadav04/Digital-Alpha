import { apiGet } from "@/lib/api";

export type Transaction = {
  id: number;
  merchant: string;
  amount: number;
  date: string;
  category: string;
  status: string;
  description: string | null;
};

export type TransactionsQuery = {
  category?: string;
  status?: string;
  date_from?: string;
  date_to?: string;
  amount_min?: number;
  amount_max?: number;
  search?: string;
  sort_by?: "date" | "amount";
  sort_dir?: "asc" | "desc";
  page?: number;
  limit?: number;
  include_summary?: boolean;
};

export type TransactionsPage = {
  rows: Transaction[];
  page: number;
  limit: number;
  total_count: number;
};

export type CategorySummary = {
  category: string;
  total: number;
  count: number;
};

export type MonthSummary = {
  month: string;
  total: number;
};

export type TransactionsSummary = {
  by_category: CategorySummary[];
  by_month: MonthSummary[];
} | null;

export type TransactionsResponse = {
  transactions: TransactionsPage;
  summary: TransactionsSummary;
};

export function fetchTransactions(query: TransactionsQuery = {}) {
  return apiGet<TransactionsResponse>("/transactions", query);
}

export type TransactionFilterOptions = {
  categories: string[];
  statuses: string[];
};

export function fetchFilterOptions() {
  return apiGet<TransactionFilterOptions>("/transactions/filters");
}
