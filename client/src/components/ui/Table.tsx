export function Table({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-border md:overflow-visible">
      <table className="w-full min-w-[640px] border-collapse text-xs sm:text-sm md:min-w-0">{children}</table>
    </div>
  );
}

export function TableHead({
  children,
  stickyOffset = 60,
}: {
  children: React.ReactNode;
  stickyOffset?: number;
}) {
  return (
    <thead className="sticky z-10 bg-surface-muted" style={{ top: stickyOffset }}>
      {children}
    </thead>
  );
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
      className={`border-b-2 border-border px-2 py-2 font-semibold text-foreground/70 sm:px-4 sm:py-3 [&:not(:last-child)]:border-r [&:not(:last-child)]:border-border ${alignClass} ${className}`}
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
      className={`px-2 py-2 sm:px-4 sm:py-2.5 [&:not(:last-child)]:border-r [&:not(:last-child)]:border-border ${alignClass} ${className}`}
    >
      {children}
    </td>
  );
}
