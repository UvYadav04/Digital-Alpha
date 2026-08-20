export type TransactionFilters = {
  search: string;
  category: string;
  status: string;
  date_from: string;
  date_to: string;
  amount_min: string;
  amount_max: string;
  sort_by: "date" | "amount";
  sort_dir: "asc" | "desc";
};

export const DEFAULT_TRANSACTION_FILTERS: TransactionFilters = {
  search: "",
  category: "",
  status: "",
  date_from: "",
  date_to: "",
  amount_min: "",
  amount_max: "",
  sort_by: "date",
  sort_dir: "desc",
};
