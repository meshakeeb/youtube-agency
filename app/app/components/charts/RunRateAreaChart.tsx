"use client";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { usePalette } from "./chartColors";
import { agentRunsEnriched } from "../../lib/data";
import type { Team } from "../../lib/types";

const TEAMS: Team[] = ["intelligence", "onboarding", "production", "growth", "operations"];

export function RunRateAreaChart({ height = 240 }: { height?: number }) {
  const { palette, isWeb3 } = usePalette();
  // Bucket by 15-min over the 24h prior to last run.
  const last = Math.max(...agentRunsEnriched.map((r) => new Date(r.ended_at).getTime()));
  const start = last - 24 * 3600 * 1000;
  const buckets: Record<string, Record<string, number> & { time: string }> = {};
  for (let t = start; t <= last; t += 60 * 60 * 1000) {
    const key = new Date(t).toISOString().slice(11, 16);
    const row: Record<string, number> & { time: string } = { time: key } as never;
    TEAMS.forEach((tm) => (row[tm] = 0));
    buckets[key] = row;
  }
  // Fake distribute across the 24h based on order to fill area chart.
  agentRunsEnriched.forEach((r, i) => {
    const offset = ((i * 73) % 24) * 60 * 60 * 1000;
    const key = new Date(start + offset).toISOString().slice(11, 16);
    if (buckets[key]) {
      buckets[key][r.team] = (buckets[key][r.team] || 0) + 1;
    }
  });
  const data = Object.values(buckets);
  const teamColors = isWeb3
    ? { intelligence: "#EA580C", onboarding: "#F7931A", production: "#FB923C", growth: "#FCD34D", operations: "#FFD600" }
    : { intelligence: "#6750A4", onboarding: "#7D5260", production: "#9A8AC3", growth: "#B69DD8", operations: "#D0BCFF" };
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
          <CartesianGrid stroke={palette.grid} vertical={false} />
          <XAxis dataKey="time" tick={{ fontSize: 10, fill: palette.axis }} axisLine={false} tickLine={false} interval={2} />
          <YAxis tick={{ fontSize: 11, fill: palette.axis }} axisLine={false} tickLine={false} width={36} />
          <Tooltip
            contentStyle={{
              background: isWeb3 ? "rgba(0,0,0,0.85)" : "#fff",
              border: `1px solid ${isWeb3 ? "rgba(255,255,255,0.10)" : "rgba(103,80,164,0.20)"}`,
              borderRadius: 12,
              fontSize: 12,
            }}
          />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          {TEAMS.map((t) => (
            <Area
              key={t}
              type="monotone"
              dataKey={t}
              stackId="1"
              stroke={teamColors[t]}
              fill={teamColors[t]}
              fillOpacity={0.55}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
