"use client";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { usePalette } from "./chartColors";

export function QcDonut({
  breakdown,
  height = 220,
}: {
  breakdown: { keyword: number; brand_voice: number; structure: number; ctr_potential: number };
  height?: number;
}) {
  const { palette, isWeb3 } = usePalette();
  const data = [
    { name: "Keyword", value: breakdown.keyword },
    { name: "Brand Voice", value: breakdown.brand_voice },
    { name: "Structure", value: breakdown.structure },
    { name: "CTR Potential", value: breakdown.ctr_potential },
  ];
  const colors = palette.series.slice(0, 4);
  const aggregate = Math.round((data.reduce((s, d) => s + d.value, 0) / data.length) * 10) / 10;
  return (
    <div className="relative" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            innerRadius="62%"
            outerRadius="90%"
            paddingAngle={3}
            dataKey="value"
            startAngle={90}
            endAngle={-270}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={colors[i]} stroke="transparent" />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: isWeb3 ? "rgba(0,0,0,0.85)" : "#fff",
              border: `1px solid ${isWeb3 ? "rgba(255,255,255,0.10)" : "rgba(103,80,164,0.20)"}`,
              borderRadius: 12,
              fontSize: 12,
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 grid place-items-center pointer-events-none">
        <div className="text-center">
          <div className={isWeb3 ? "text-4xl font-heading font-bold text-gradient-orange" : "text-4xl font-bold text-[rgb(var(--primary))]"}>
            {aggregate}
          </div>
          <div className={isWeb3 ? "mono uppercase tracking-widest text-[10px] text-white/60" : "text-[11px] text-[rgb(var(--muted))]"}>
            avg QC
          </div>
        </div>
      </div>
    </div>
  );
}
