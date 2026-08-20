export function parseIsoDate(value: string) {
  return value ? new Date(`${value}T00:00:00`) : undefined;
}

export function toIsoDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatShortDate(value: string) {
  const date = parseIsoDate(value);
  if (!date) return "";
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

export function formatMonthLabel(month: string) {
  const date = new Date(`${month}-01T00:00:00`);
  if (Number.isNaN(date.getTime())) return month;
  return date.toLocaleDateString("en-IN", { month: "short", year: "numeric" });
}

export function monthBounds(month: string) {
  const [year, mon] = month.split("-").map(Number);
  if (!year || !mon) return { from: "", to: "" };
  const from = `${month}-01`;
  const lastDay = new Date(year, mon, 0).getDate();
  const to = `${month}-${String(lastDay).padStart(2, "0")}`;
  return { from, to };
}
