"use client";
import {
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
import { usePalette } from "./chartColors";
import { KEYWORDS_EXTENDED } from "../../lib/data";

export function TrendingScatter({ height = 260 }: { height?: number }) {
  const { palette, isWeb3 } = usePalette();
  const data = KEYWORDS_EXTENDED.map((k) => ({
    name: k.keyword,
    volume: k.volume,
    growth: k.growth_rate,
    opp: k.opportunity_score,
  }));
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 10, right: 16, left: 0, bottom: 10 }}>
          <CartesianGrid stroke={palette.grid} />
          <XAxis
            dataKey="volume"
            name="volume"
            tick={{ fontSize: 10, fill: palette.axis }}
            label={{ value: "search volume", fontSize: 11, fill: palette.axis, position: "insideBottom", offset: -2 }}
          />
          <YAxis
            dataKey="growth"
            name="growth %"
            tick={{ fontSize: 10, fill: palette.axis }}
            label={{ value: "growth %", fontSize: 11, fill: palette.axis, angle: -90, position: "insideLeft" }}
          />
          <ZAxis dataKey="opp" range={[40, 320]} />
          <Tooltip
            cursor={{ stroke: palette.primary, strokeWidth: 1, strokeDasharray: "3 3" }}
            contentStyle={{
              background: isWeb3 ? "rgba(0,0,0,0.85)" : "#fff",
              border: `1px solid ${isWeb3 ? "rgba(255,255,255,0.10)" : "rgba(103,80,164,0.20)"}`,
              borderRadius: 12,
              fontSize: 12,
            }}
            formatter={(v: number, k: string) => [v, k]}
            labelFormatter={() => ""}
          />
          <Scatter data={data} fill={palette.primary} fillOpacity={0.75} stroke={palette.tertiary} />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
