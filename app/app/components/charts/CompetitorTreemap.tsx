"use client";
import { ResponsiveContainer, Treemap } from "recharts";
import { usePalette } from "./chartColors";
import { competitorsEnriched } from "../../lib/data";

export function CompetitorTreemap({ height = 320 }: { height?: number }) {
  const { palette } = usePalette();
  const data = competitorsEnriched.map((c) => ({
    name: c.name,
    size: c.niche_share,
    growth: c.growth_rate,
  }));
  function bucket(g: number) {
    const idx = Math.min(palette.heat.length - 1, Math.max(0, Math.floor((g / 20) * palette.heat.length)));
    return palette.heat[idx];
  }
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <Treemap
          data={data}
          dataKey="size"
          stroke="rgba(255,255,255,0.10)"
          fill={palette.primary}
          content={<Node bucket={bucket} />}
        />
      </ResponsiveContainer>
    </div>
  );
}

interface NP {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  name?: string;
  growth?: number;
  size?: number;
  bucket?: (n: number) => string;
}
function Node(props: NP) {
  const { x = 0, y = 0, width = 0, height = 0, name, growth, size, bucket } = props;
  const fill = bucket ? bucket(growth ?? 5) : "#F7931A";
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx={4} ry={4} style={{ fill, stroke: "rgba(255,255,255,0.10)" }} />
      {width > 90 && height > 36 && (
        <>
          <text x={x + 8} y={y + 20} fill="#fff" fontSize={12} fontWeight={600}>
            {name}
          </text>
          <text x={x + 8} y={y + 36} fill="rgba(255,255,255,0.75)" fontSize={10}>
            share {size?.toFixed(1)}% · growth {growth?.toFixed(1)}%
          </text>
        </>
      )}
    </g>
  );
}
