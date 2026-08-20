"use client";

import { Bar, BarChart, CartesianGrid, Cell, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { CategorySummary } from "@/api/transactions";

function formatRupees(value: unknown) {
  const numeric = typeof value === "number" ? value : Number(value);
  if (Number.isNaN(numeric)) return "";
  return `₹${numeric.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
}

function ChartTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: CategorySummary }>;
}) {
  if (!active || !payload?.length) return null;
  const point = payload[0].payload;

  return (
    <div className="rounded-md border border-border bg-surface px-3 py-2 text-xs shadow-lg">
      <p className="font-semibold text-[var(--viz-text-primary)]">{formatRupees(point.total)}</p>
      <p className="text-[var(--viz-text-secondary)]">
        {point.category} · {point.count} txns
      </p>
    </div>
  );
}

export function SpendByCategoryChart({
  data,
  selectedCategory,
  onCategoryClick,
}: {
  data: CategorySummary[];
  selectedCategory: string;
  onCategoryClick: (category: string) => void;
}) {
  if (data.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-foreground/40">
        No data for the current filters.
      </div>
    );
  }

  return (
    <div className="viz-root h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 24, right: 8, bottom: 8, left: 16 }}>
          <CartesianGrid vertical={false} stroke="var(--viz-gridline)" />
          <XAxis
            type="category"
            dataKey="category"
            interval={0}
            angle={-20}
            textAnchor="end"
            height={48}
            tick={{ fill: "var(--viz-text-secondary)", fontSize: 12 }}
            axisLine={{ stroke: "var(--viz-baseline)" }}
            tickLine={false}
          />
          <YAxis
            type="number"
            tickFormatter={formatRupees}
            width={72}
            tick={{ fill: "var(--viz-muted)", fontSize: 12 }}
            axisLine={{ stroke: "var(--viz-baseline)" }}
            tickLine={false}
          />
          <Tooltip content={<ChartTooltip />} cursor={{ fill: "var(--viz-gridline)", opacity: 0.4 }} />
          <Bar
            dataKey="total"
            radius={[4, 4, 0, 0]}
            maxBarSize={40}
            cursor="pointer"
            background={{ fill: "transparent", cursor: "pointer" }}
            onClick={(item) => {
              const point = item.payload as CategorySummary;
              onCategoryClick(point.category === selectedCategory ? "" : point.category);
            }}
          >
            {data.map((entry) => (
              <Cell
                key={entry.category}
                fill="var(--viz-series-1)"
                opacity={!selectedCategory || entry.category === selectedCategory ? 1 : 0.35}
              />
            ))}
            <LabelList dataKey="total" position="top" formatter={formatRupees} fill="var(--viz-text-secondary)" fontSize={12} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
