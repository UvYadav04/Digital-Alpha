const VARIANT_CLASSES = {
  primary: "bg-brand text-brand-foreground hover:bg-brand/90",
  secondary: "border border-border hover:bg-surface-muted",
  ghost: "text-foreground/70 hover:bg-surface-muted",
} as const;

export function Button({
  variant = "secondary",
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: keyof typeof VARIANT_CLASSES }) {
  return (
    <button
      className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${VARIANT_CLASSES[variant]} ${className}`}
      {...props}
    />
  );
}
