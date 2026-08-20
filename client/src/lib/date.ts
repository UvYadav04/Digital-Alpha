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
