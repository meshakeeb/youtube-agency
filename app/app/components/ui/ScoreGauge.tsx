"use client";
import { RadialBar, RadialBarChart, ResponsiveContainer } from "recharts";
import { usePalette } from "../charts/chartColors";

export function ScoreGauge({ score, label }: { score: number; label?: string }) {
  const { palette, isWeb3 } = usePalette();
  return (
    <div className="relative h-40">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          innerRadius="74%"
          outerRadius="100%"
          data={[{ name: "s", value: score, fill: palette.primary }]}
          startAngle={90}
          endAngle={-270}
        >
          <RadialBar
            background={{ fill: isWeb3 ? "rgba(255,255,255,0.05)" : "rgba(103,80,164,0.10)" }}
            dataKey="value"
            cornerRadius={20}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 grid place-items-center pointer-events-none">
        <div className="text-center">
          <div className={isWeb3 ? "text-4xl font-heading font-bold text-gradient-orange" : "text-4xl font-bold text-[rgb(var(--primary))]"}>
            {score}
          </div>
          {label && (
            <div className={isWeb3 ? "mono uppercase tracking-widest text-[10px] mt-1 text-[#FFD600]" : "text-[11px] mt-1 text-[rgb(var(--muted))]"}>
              {label}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
