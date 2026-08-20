"use client";

import { Bar, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { MonthSummary } from "@/api/transactions";
import { formatMonthLabel } from "@/lib/date";

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
  payload?: Array<{ payload: MonthSummary }>;
}) {
  if (!active || !payload?.length) return null;
  const point = payload[0].payload;

  return (
    <div className="rounded-md border border-border bg-surface px-3 py-2 text-xs shadow-lg">
      <p className="font-semibold text-[var(--viz-text-primary)]">{formatRupees(point.total)}</p>
      <p className="text-[var(--viz-text-secondary)]">{formatMonthLabel(point.month)}</p>
    </div>
  );
}

export function MonthlyTrendChart({
  data,
  selectedMonth,
  onMonthClick,
}: {
  data: MonthSummary[];
  selectedMonth: string;
  onMonthClick: (month: string) => void;
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
        <ComposedChart data={data} margin={{ top: 24, right: 8, bottom: 8, left: 16 }}>
          <CartesianGrid vertical={false} stroke="var(--viz-gridline)" />
          <XAxis
            type="category"
            dataKey="month"
            tickFormatter={(value) => formatMonthLabel(String(value))}
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
            fill="transparent"
            cursor="pointer"
            onClick={(item) => {
              const point = item.payload as MonthSummary;
              onMonthClick(point.month === selectedMonth ? "" : point.month);
            }}
          />
          <Line
            dataKey="total"
            stroke="var(--viz-series-1)"
            strokeWidth={2}
            dot={(props) => {
              const point = props.payload as MonthSummary;
              const isSelected = !selectedMonth || point.month === selectedMonth;
              return (
                <circle
                  key={point.month}
                  cx={props.cx}
                  cy={props.cy}
                  r={4}
                  fill="var(--viz-series-1)"
                  stroke="var(--surface)"
                  strokeWidth={1.5}
                  opacity={isSelected ? 1 : 0.35}
                  pointerEvents="none"
                />
              );
            }}
            activeDot={{ r: 6 }}
            isAnimationActive={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
