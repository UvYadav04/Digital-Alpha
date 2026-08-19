const TONE_CLASSES = {
  success: "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400",
  warning: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  danger: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
  neutral: "bg-surface-muted text-foreground/60",
} as const;

export type BadgeTone = keyof typeof TONE_CLASSES;

export function Badge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: BadgeTone;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize ${TONE_CLASSES[tone]}`}
    >
      {children}
    </span>
  );
}
