export function Table({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full rounded-lg border border-border">
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  );
}

export function TableHead({ children }: { children: React.ReactNode }) {
  return <thead className="sticky top-0 z-10 bg-surface-muted">{children}</thead>;
}

export function TableBody({ children }: { children: React.ReactNode }) {
  return <tbody className="divide-y divide-border">{children}</tbody>;
}

export function TableRow({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <tr
      onClick={onClick}
      className={`transition-colors hover:bg-surface-muted/60 ${onClick ? "cursor-pointer" : ""}`}
    >
      {children}
    </tr>
  );
}

export function TableHeaderCell({
  children,
  align = "center",
  className = "",
}: {
  children: React.ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
}) {
  const alignClass = align === "left" ? "text-left" : align === "right" ? "text-right" : "text-center";
  return (
    <th
      className={`border-b-2 border-border px-4 py-3 font-semibold text-foreground/70 [&:not(:last-child)]:border-r [&:not(:last-child)]:border-border ${alignClass} ${className}`}
    >
      {children}
    </th>
  );
}

export function TableCell({
  children,
  align = "center",
  className = "",
}: {
  children: React.ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
}) {
  const alignClass = align === "left" ? "text-left" : align === "right" ? "text-right" : "text-center";
  return (
    <td
      className={`px-4 py-2.5 [&:not(:last-child)]:border-r [&:not(:last-child)]:border-border ${alignClass} ${className}`}
    >
      {children}
    </td>
  );
}
