"use client";
import {
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts";
import { usePalette } from "./chartColors";

export function SeoHealthGauge({ score, height = 240 }: { score: number; height?: number }) {
  const { palette, isWeb3 } = usePalette();
  const data = [{ name: "score", value: score, fill: palette.primary }];
  const tier = score >= 85 ? "Excellent" : score >= 70 ? "Good" : score >= 40 ? "Needs Work" : "Critical";
  return (
    <div className="relative" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          innerRadius="72%"
          outerRadius="100%"
          data={data}
          startAngle={225}
          endAngle={-45}
        >
          <defs>
            <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={isWeb3 ? "#EA580C" : "#B3261E"} />
              <stop offset="50%" stopColor={isWeb3 ? "#F7931A" : "#7D5260"} />
              <stop offset="100%" stopColor={isWeb3 ? "#FFD600" : "#6750A4"} />
            </linearGradient>
          </defs>
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
          <RadialBar
            background={{ fill: isWeb3 ? "rgba(255,255,255,0.05)" : "rgba(103,80,164,0.12)" }}
            dataKey="value"
            cornerRadius={20}
            fill="url(#gaugeGrad)"
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 grid place-items-center pointer-events-none">
        <div className="text-center">
          <div
            className={
              isWeb3
                ? "text-5xl font-heading font-bold text-gradient-orange leading-none"
                : "text-5xl font-bold text-[rgb(var(--primary))] leading-none"
            }
          >
            {score}
          </div>
          <div
            className={
              isWeb3
                ? "mono uppercase tracking-widest text-[11px] mt-2 text-[#FFD600]"
                : "text-xs mt-2 text-[rgb(var(--muted))]"
            }
          >
            {tier}
          </div>
        </div>
      </div>
    </div>
  );
}
