export function Input({ className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`rounded-md border border-border bg-surface px-3 py-1.5 text-sm outline-none focus:border-brand ${className}`}
      {...props}
    />
  );
}
