"use client";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { usePalette } from "./chartColors";

export function QcBreakdownBars({
  breakdown,
  height = 220,
}: {
  breakdown: { keyword: number; brand_voice: number; structure: number; ctr_potential: number };
  height?: number;
}) {
  const { palette, isWeb3 } = usePalette();
  const data = [
    { name: "Keyword", v: breakdown.keyword },
    { name: "Brand Voice", v: breakdown.brand_voice },
    { name: "Structure", v: breakdown.structure },
    { name: "CTR Potential", v: breakdown.ctr_potential },
  ];
  const colors = palette.series.slice(0, 4);
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart layout="vertical" data={data} margin={{ top: 6, right: 28, left: 12, bottom: 6 }}>
          <CartesianGrid stroke={palette.grid} horizontal={false} />
          <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: palette.axis }} axisLine={false} tickLine={false} />
          <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: palette.axis }} axisLine={false} tickLine={false} width={92} />
          <Tooltip
            contentStyle={{
              background: isWeb3 ? "rgba(0,0,0,0.85)" : "#fff",
              border: `1px solid ${isWeb3 ? "rgba(255,255,255,0.10)" : "rgba(103,80,164,0.20)"}`,
              borderRadius: 12,
              fontSize: 12,
            }}
          />
          <Bar dataKey="v" radius={[0, 6, 6, 0]} barSize={18}>
            {data.map((_, i) => (
              <Cell key={i} fill={colors[i]} />
            ))}
            <LabelList dataKey="v" position="right" style={{ fontSize: 11, fill: palette.axis }} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
