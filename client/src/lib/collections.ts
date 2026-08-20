export function dedupeCaseInsensitive(values: string[]) {
  const seen = new Map<string, string>();
  for (const value of values) {
    const trimmed = value.trim();
    const key = trimmed.toLowerCase();
    if (!seen.has(key)) {
      seen.set(key, trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase());
    }
  }
  return Array.from(seen.values()).sort();
}
