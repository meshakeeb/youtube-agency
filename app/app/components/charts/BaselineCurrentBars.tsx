"use client";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { usePalette } from "./chartColors";
import { unified } from "../../lib/data";

export function BaselineCurrentBars({ height = 260 }: { height?: number }) {
  const { palette, isWeb3 } = usePalette();
  const b = unified.client.baseline;
  const c = unified.metrics.current;
  const data = [
    { metric: "CTR %", baseline: b.ctr, current: c.ctr },
    { metric: "AVD (s)", baseline: b.avd_seconds, current: c.avd_seconds },
    { metric: "View Vel /30d (K)", baseline: Math.round(b.view_velocity_30d / 1000), current: Math.round(c.view_velocity_30d / 1000) },
    { metric: "Subs (K)", baseline: Math.round(b.subs / 1000), current: Math.round(c.subs / 1000) },
  ];
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart layout="vertical" data={data} margin={{ top: 6, right: 24, left: 12, bottom: 6 }}>
          <CartesianGrid stroke={palette.grid} horizontal={false} />
          <XAxis type="number" tick={{ fontSize: 11, fill: palette.axis }} axisLine={false} tickLine={false} />
          <YAxis type="category" dataKey="metric" tick={{ fontSize: 11, fill: palette.axis }} axisLine={false} tickLine={false} width={120} />
          <Tooltip
            contentStyle={{
              background: isWeb3 ? "rgba(0,0,0,0.85)" : "#fff",
              border: `1px solid ${isWeb3 ? "rgba(255,255,255,0.10)" : "rgba(103,80,164,0.20)"}`,
              borderRadius: 12,
              fontSize: 12,
            }}
          />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Bar dataKey="baseline" name="baseline" fill={isWeb3 ? "rgba(255,255,255,0.20)" : palette.tertiary} radius={[0, 4, 4, 0]} barSize={14} />
          <Bar dataKey="current" name="current" fill={palette.primary} radius={[0, 4, 4, 0]} barSize={14} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
