"use client";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import { usePalette } from "./chartColors";
import type { Keyword } from "../../lib/types";

export function KeywordRadar({
  keyword,
  height = 280,
}: {
  keyword: Keyword & { opportunity_score: number; growth_rate: number };
  height?: number;
}) {
  const { palette, isWeb3 } = usePalette();
  const data = [
    { axis: "Volume", value: Math.min(100, Math.log10(keyword.volume + 1) * 22) },
    { axis: "Inv. Difficulty", value: 100 - keyword.difficulty },
    { axis: "Intent Match", value: 78 },
    { axis: "Brand Fit", value: keyword.tier === "primary" ? 92 : keyword.tier === "secondary" ? 78 : 66 },
    { axis: "Seasonality", value: 60 + (keyword.growth_rate || 8) },
    { axis: "CTR Potential", value: keyword.opportunity_score },
  ];
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} outerRadius="78%">
          <PolarGrid stroke={palette.grid} />
          <PolarAngleAxis dataKey="axis" tick={{ fontSize: 10, fill: palette.axis }} />
          <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 100]} />
          <Radar
            name="score"
            dataKey="value"
            stroke={palette.primary}
            fill={palette.primary}
            fillOpacity={isWeb3 ? 0.22 : 0.30}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
