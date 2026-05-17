"use client";
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { usePalette } from "./chartColors";
import { DAILY_90 } from "../../lib/data";

export function SubscriberVelocityChart({ height = 300 }: { height?: number }) {
  const { palette, isWeb3 } = usePalette();
  // Aggregate to weekly for a cleaner read.
  const weekly = (() => {
    const buckets: { week: string; subs: number; views: number }[] = [];
    for (let i = 0; i < DAILY_90.length; i += 7) {
      const slice = DAILY_90.slice(i, i + 7);
      if (slice.length === 0) continue;
      const w = slice[slice.length - 1];
      const views = slice.reduce((s, d) => s + d.views, 0);
      buckets.push({ week: w.day.slice(5), subs: w.subs, views });
    }
    return buckets;
  })();
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={weekly} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="subsGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={palette.primary} stopOpacity={0.5} />
              <stop offset="100%" stopColor={palette.primary} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke={palette.grid} vertical={false} />
          <XAxis dataKey="week" tick={{ fontSize: 11, fill: palette.axis }} axisLine={false} tickLine={false} />
          <YAxis yAxisId="subs" tick={{ fontSize: 11, fill: palette.axis }} axisLine={false} tickLine={false} width={50} />
          <YAxis
            yAxisId="views"
            orientation="right"
            tick={{ fontSize: 11, fill: palette.axis }}
            axisLine={false}
            tickLine={false}
            width={50}
          />
          <Tooltip
            contentStyle={{
              background: isWeb3 ? "rgba(0,0,0,0.85)" : "#fff",
              border: `1px solid ${isWeb3 ? "rgba(255,255,255,0.10)" : "rgba(103,80,164,0.20)"}`,
              borderRadius: 12,
              fontSize: 12,
            }}
            labelStyle={{ color: isWeb3 ? "#FFD600" : "#6750A4" }}
          />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Bar yAxisId="views" dataKey="views" fill={palette.secondary} radius={[3, 3, 0, 0]} barSize={10} name="weekly views" />
          <Area
            yAxisId="subs"
            type="monotone"
            dataKey="subs"
            stroke={palette.primary}
            strokeWidth={2}
            fill="url(#subsGrad)"
            name="subscribers"
          />
          <ReferenceLine
            yAxisId="subs"
            y={41940}
            stroke={palette.tertiary}
            strokeDasharray="4 4"
            label={{ value: "current", fill: palette.tertiary, fontSize: 10, position: "right" }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
