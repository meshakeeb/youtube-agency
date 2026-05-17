"use client";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { usePalette } from "./chartColors";
import { DAILY_90 } from "../../lib/data";

export function AvdTrendChart({ height = 240 }: { height?: number }) {
  const { palette, isWeb3 } = usePalette();
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={DAILY_90} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="avdGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={palette.secondary} stopOpacity={0.45} />
              <stop offset="100%" stopColor={palette.secondary} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke={palette.grid} vertical={false} />
          <XAxis
            dataKey="day"
            tickFormatter={(d: string) => d.slice(5)}
            tick={{ fontSize: 10, fill: palette.axis }}
            axisLine={false}
            tickLine={false}
            interval={9}
          />
          <YAxis
            tickFormatter={(v: number) => `${Math.floor(v / 60)}m`}
            tick={{ fontSize: 11, fill: palette.axis }}
            axisLine={false}
            tickLine={false}
            width={42}
          />
          <Tooltip
            contentStyle={{
              background: isWeb3 ? "rgba(0,0,0,0.85)" : "#fff",
              border: `1px solid ${isWeb3 ? "rgba(255,255,255,0.10)" : "rgba(103,80,164,0.20)"}`,
              borderRadius: 12,
              fontSize: 12,
            }}
            formatter={(v: number) => `${Math.floor(v / 60)}m ${v % 60}s`}
          />
          <Area
            type="monotone"
            dataKey="avd"
            stroke={palette.secondary}
            strokeWidth={2}
            fill="url(#avdGrad)"
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
