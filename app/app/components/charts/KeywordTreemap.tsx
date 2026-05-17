"use client";
import { ResponsiveContainer, Treemap } from "recharts";
import { usePalette } from "./chartColors";
import { KEYWORDS_EXTENDED } from "../../lib/data";

interface TmDatum {
  name: string;
  size: number;
  opportunity: number;
}

export function KeywordTreemap({ height = 340 }: { height?: number }) {
  const { palette } = usePalette();
  const data: TmDatum[] = KEYWORDS_EXTENDED.map((k) => ({
    name: k.keyword,
    size: k.volume,
    opportunity: k.opportunity_score,
  }));
  const heat = palette.heat;
  function bucket(opp: number) {
    const idx = Math.min(heat.length - 1, Math.max(0, Math.floor((opp / 100) * heat.length)));
    return heat[idx];
  }
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <Treemap
          data={data}
          dataKey="size"
          stroke="rgba(255,255,255,0.10)"
          fill={palette.primary}
          aspectRatio={4 / 3}
          content={<TreemapNode bucket={bucket} />}
        />
      </ResponsiveContainer>
    </div>
  );
}

interface NodeProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  name?: string;
  opportunity?: number;
  size?: number;
  bucket?: (n: number) => string;
}

function TreemapNode(props: NodeProps) {
  const { x = 0, y = 0, width = 0, height = 0, name, opportunity, size, bucket } = props;
  const fill = bucket ? bucket(opportunity ?? 50) : "#6750A4";
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={6}
        ry={6}
        style={{ fill, stroke: "rgba(0,0,0,0.10)", strokeWidth: 1 }}
      />
      {width > 80 && height > 40 && (
        <>
          <text x={x + 10} y={y + 22} fill="#fff" fontSize={12} fontWeight={600}>
            {name}
          </text>
          <text x={x + 10} y={y + 38} fill="rgba(255,255,255,0.75)" fontSize={10}>
            vol {Intl.NumberFormat().format(size ?? 0)} · opp {opportunity}
          </text>
        </>
      )}
    </g>
  );
}
