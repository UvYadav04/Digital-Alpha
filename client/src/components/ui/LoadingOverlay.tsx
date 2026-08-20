export function LoadingOverlay({ show, label = "Updating data…" }: { show: boolean; label?: string }) {
  if (!show) return null;

  return (
    <>
      <div className="absolute inset-0 z-30 rounded-xl bg-surface/30 backdrop-blur-[2px]" />
      <div className="fixed top-1/2 left-1/2 z-40 -translate-x-1/2 -translate-y-1/2 rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium shadow-lg">
        {label}
      </div>
    </>
  );
}
