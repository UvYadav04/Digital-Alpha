export function Select({
  className = "",
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={`rounded-md border border-border bg-surface px-3 py-1.5 text-sm outline-none focus:border-brand ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}
