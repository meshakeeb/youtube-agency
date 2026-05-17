"use client";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { cn } from "../../lib/utils";
import { useTheme } from "../theme/ThemeProvider";

interface KpiProps {
  label: string;
  value: string;
  delta?: number;
  deltaLabel?: string;
  sparkData?: { v: number }[];
  accent?: "primary" | "secondary" | "tertiary";
}

export function KpiCard({ label, value, delta, deltaLabel, sparkData, accent = "primary" }: KpiProps) {
  const { theme } = useTheme();
  const isWeb3 = theme === "web3";
  const positive = (delta ?? 0) >= 0;

  const sparkColor = isWeb3
    ? accent === "tertiary"
      ? "#FFD600"
      : accent === "secondary"
        ? "#EA580C"
        : "#F7931A"
    : accent === "tertiary"
      ? "#7D5260"
      : accent === "secondary"
        ? "#9A8AC3"
        : "#6750A4";

  return (
    <div className="themed-card p-5 relative overflow-hidden">
      <div className="flex items-center justify-between mb-2">
        <span
          className={cn(
            "text-xs uppercase tracking-wider text-[rgb(var(--muted))]",
            isWeb3 && "mono",
          )}
        >
          {label}
        </span>
        {typeof delta === "number" && (
          <div
            className={cn(
              "flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium",
              positive
                ? isWeb3
                  ? "bg-gradient-to-r from-[#EA580C] to-[#F7931A] text-black"
                  : "bg-[rgb(var(--secondary))] text-[rgb(var(--primary))]"
                : isWeb3
                  ? "border border-white/20 text-white/70"
                  : "bg-[rgb(var(--surface-low))] text-[rgb(var(--muted))]",
            )}
          >
            {positive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
            {positive ? "+" : ""}
            {delta.toFixed(1)}%
          </div>
        )}
      </div>
      <div
        className={cn(
          "text-3xl font-semibold tracking-tight",
          isWeb3 ? "font-heading text-white" : "text-[rgb(var(--fg))]",
        )}
      >
        {value}
      </div>
      {deltaLabel && (
        <div
          className={cn(
            "text-[11px] mt-1 text-[rgb(var(--muted))]",
            isWeb3 && "mono uppercase tracking-wider",
          )}
        >
          {deltaLabel}
        </div>
      )}
      {sparkData && sparkData.length > 0 && (
        <div className="absolute right-0 bottom-0 h-12 w-1/2 opacity-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sparkData} margin={{ left: 0, right: 0, top: 4, bottom: 0 }}>
              <defs>
                <linearGradient id={`spark-${label}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={sparkColor} stopOpacity={0.45} />
                  <stop offset="100%" stopColor={sparkColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="v"
                stroke={sparkColor}
                strokeWidth={2}
                fill={`url(#spark-${label})`}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
