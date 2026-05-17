"use client";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { usePalette } from "./chartColors";
import { competitorsEnriched, youStrategy } from "../../lib/data";

export function StrategyRadar({ height = 320 }: { height?: number }) {
  const { palette, isWeb3 } = usePalette();
  const c1 = competitorsEnriched[1]; // InTheMoney
  const c2 = competitorsEnriched[5]; // Joe Burgoyne
  const axes: { axis: string; key: keyof typeof youStrategy }[] = [
    { axis: "Cadence (vid/wk)", key: "cadence" },
    { axis: "Avg Length (min)", key: "avg_length_min" },
    { axis: "Thumb Depth", key: "thumb_depth" },
    { axis: "Desc Depth", key: "desc_depth" },
    { axis: "Community Rate", key: "community_rate" },
  ];
  // Normalize each axis to 0-100 against the max.
  function norm(name: string, val: number): number {
    const all = [
      youStrategy[name as keyof typeof youStrategy] as number,
      (c1 as unknown as Record<string, number>)[name],
      (c2 as unknown as Record<string, number>)[name],
    ];
    const max = Math.max(...all);
    return Math.round((val / max) * 100);
  }
  const data = axes.map(({ axis, key }) => ({
    axis,
    you: norm(key, youStrategy[key] as number),
    inTheMoney: norm(key, (c1 as unknown as Record<string, number>)[key]),
    joeBurgoyne: norm(key, (c2 as unknown as Record<string, number>)[key]),
  }));
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} outerRadius="72%">
          <PolarGrid stroke={palette.grid} />
          <PolarAngleAxis dataKey="axis" tick={{ fontSize: 10, fill: palette.axis }} />
          <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 100]} />
          <Radar
            name={youStrategy.name}
            dataKey="you"
            stroke={palette.primary}
            fill={palette.primary}
            fillOpacity={isWeb3 ? 0.30 : 0.30}
            strokeWidth={2}
          />
          <Radar
            name={c1.name}
            dataKey="inTheMoney"
            stroke={palette.secondary}
            fill={palette.secondary}
            fillOpacity={0.18}
            strokeWidth={1.5}
          />
          <Radar
            name={c2.name}
            dataKey="joeBurgoyne"
            stroke={isWeb3 ? "#94A3B8" : palette.tertiary}
            fill={isWeb3 ? "#94A3B8" : palette.tertiary}
            fillOpacity={0.10}
            strokeWidth={1.5}
          />
          <Legend wrapperStyle={{ fontSize: 11 }} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
