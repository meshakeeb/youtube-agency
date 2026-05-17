"use client";
import { useState } from "react";
import { CADENCE_HEATMAP } from "../../lib/data";
import { usePalette } from "./chartColors";

const DOW = ["S", "M", "T", "W", "T", "F", "S"];

export function CadenceHeatmap() {
  const { palette } = usePalette();
  const [hover, setHover] = useState<{ x: number; y: number; cell: typeof CADENCE_HEATMAP[number] } | null>(null);
  const cell = 12;
  const gap = 2;
  const cols = 52;
  const rows = 7;
  const width = cols * (cell + gap);
  const height = rows * (cell + gap);
  const max = Math.max(...CADENCE_HEATMAP.map((c) => c.value));
  function colorFor(v: number) {
    if (v === 0) return palette.heat[0];
    const ramp = palette.heat.slice(1);
    const idx = Math.min(ramp.length - 1, Math.floor((v / max) * ramp.length));
    return ramp[idx];
  }
  return (
    <div className="overflow-x-auto">
      <div className="relative" style={{ width, minWidth: width, height: height + 30 }}>
        <svg width={width} height={height} className="block">
          {CADENCE_HEATMAP.map((c) => (
            <rect
              key={`${c.week}-${c.dow}`}
              x={c.week * (cell + gap)}
              y={c.dow * (cell + gap)}
              width={cell}
              height={cell}
              rx={2}
              ry={2}
              fill={colorFor(c.value)}
              stroke={c.value > 0 ? "rgba(255,255,255,0.10)" : "transparent"}
              onMouseEnter={(e) => {
                const r = (e.target as SVGRectElement).getBoundingClientRect();
                setHover({ x: r.left, y: r.top, cell: c });
              }}
              onMouseLeave={() => setHover(null)}
              style={{ cursor: "pointer" }}
            />
          ))}
        </svg>
        <div className="absolute left-[-12px] top-0 grid grid-rows-7 gap-[2px] text-[9px] text-[rgb(var(--muted))]" style={{ height }}>
          {DOW.map((d, i) => (
            <span key={i} style={{ lineHeight: `${cell}px` }} className="text-right pr-0.5">
              {i % 2 === 1 ? d : ""}
            </span>
          ))}
        </div>
        <div className="absolute left-0 right-0 text-[10px] text-[rgb(var(--muted))] flex justify-between px-1" style={{ top: height + 6 }}>
          <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Nov</span>
        </div>
        {hover && (
          <div
            className="pointer-events-none fixed z-50 rounded-md px-2 py-1 text-[11px]"
            style={{
              left: hover.x + 18,
              top: hover.y - 10,
              background: "rgba(0,0,0,0.85)",
              color: "#fff",
              border: "1px solid rgba(247,147,26,0.30)",
            }}
          >
            <div>{hover.cell.date}</div>
            <div>velocity: {hover.cell.value > 0 ? hover.cell.value.toLocaleString() : "no upload"}</div>
          </div>
        )}
      </div>
    </div>
  );
}
