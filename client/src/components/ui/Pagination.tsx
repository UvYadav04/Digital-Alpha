export function Pagination({
  page,
  totalCount,
  limit,
  onPageChange,
}: {
  page: number;
  totalCount: number;
  limit: number;
  onPageChange: (page: number) => void;
}) {
  const totalPages = Math.max(1, Math.ceil(totalCount / limit));

  return (
    <div className="flex shrink-0 items-center justify-center gap-3 border-t border-border pt-3 text-sm">
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="rounded-md border border-border px-3 py-1 font-medium disabled:cursor-not-allowed disabled:opacity-40"
      >
        Prev
      </button>
      <span className="min-w-6 text-center font-medium text-foreground/70">{page}</span>
      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className="rounded-md border border-border px-3 py-1 font-medium disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}
