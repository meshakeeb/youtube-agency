"use client";
import { Target, RefreshCw } from "lucide-react";
import { useTheme } from "../components/theme/ThemeProvider";
import { ThemedCard } from "../components/ui/ThemedCard";
import { CompetitorTreemap } from "../components/charts/CompetitorTreemap";
import { StrategyRadar } from "../components/charts/StrategyRadar";
import { competitorsEnriched, keywordGapMatrix } from "../lib/data";
import { cn, fmtNum } from "../lib/utils";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

export default function CompetitorAnalysisPage() {
  const { theme } = useTheme();
  const isWeb3 = theme === "web3";
  return (
    <div>
      <header className="mb-6 flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className={cn("text-2xl md:text-3xl font-semibold", isWeb3 && "font-heading text-gradient-orange")}>
            Competitor Analysis
          </h1>
          <p className="text-sm text-[rgb(var(--muted))] mt-1">
            Niche: Trading Education — Options · {competitorsEnriched.length} tracked
          </p>
        </div>
        <button
          className={cn(
            "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
            isWeb3
              ? "bg-gradient-to-r from-[#F7931A] to-[#FFD600] text-black"
              : "bg-[rgb(var(--primary))] text-white hover:opacity-90",
          )}
        >
          <RefreshCw size={14} /> Refresh competitor data
        </button>
      </header>

      <ThemedCard title="Niche leaderboard" subtitle="ranked by subscriber count" className="mb-4">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className={cn("text-[11px] uppercase tracking-wider text-[rgb(var(--muted))]", isWeb3 && "mono")}>
                <th className="py-2 pr-3 text-left">Rank</th>
                <th className="py-2 pr-3 text-left">Channel</th>
                <th className="py-2 pr-3 text-right">Subs</th>
                <th className="py-2 pr-3 text-right">Niche share</th>
                <th className="py-2 pr-3 text-right">Growth</th>
                <th className="py-2 pr-3 text-right">Overlap</th>
                <th className="py-2 pr-3">Weekly views</th>
              </tr>
            </thead>
            <tbody>
              {competitorsEnriched.map((c, i) => (
                <tr key={c.id} className={cn("border-t transition-colors", isWeb3 ? "border-white/5 hover:bg-[#F7931A]/5" : "border-[rgb(var(--border)/0.15)] hover:bg-[rgb(var(--surface-low))]")}>
                  <td className={cn("py-2.5 pr-3 font-semibold", isWeb3 && "mono text-[#FFD600]")}>{String(i + 1).padStart(2, "0")}</td>
                  <td className="py-2.5 pr-3">
                    <div className="flex items-center gap-2">
                      <div className={cn("h-7 w-7 rounded-full grid place-items-center text-[10px] font-semibold", isWeb3 ? "bg-gradient-to-br from-[#F7931A] to-[#FFD600] text-black" : "bg-[rgb(var(--secondary))] text-[rgb(var(--primary))]")}>
                        {c.name.slice(0, 2).toUpperCase()}
                      </div>
                      <span className={cn("font-medium", isWeb3 && "mono")}>{c.name}</span>
                    </div>
                  </td>
                  <td className={cn("py-2.5 pr-3 text-right", isWeb3 && "mono")}>{fmtNum(c.subs)}</td>
                  <td className="py-2.5 pr-3 text-right">{c.niche_share.toFixed(1)}%</td>
                  <td className={cn("py-2.5 pr-3 text-right", c.growth_rate >= 10 ? "text-emerald-500" : "text-[rgb(var(--muted))]", isWeb3 && "mono")}>
                    +{c.growth_rate.toFixed(1)}%
                  </td>
                  <td className="py-2.5 pr-3 text-right">{(c.overlap_score * 100).toFixed(0)}%</td>
                  <td className="py-2.5 pr-3 w-32">
                    <div className="h-8">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={Array.from({ length: 8 }, (_, k) => ({
                            v: Math.max(1, Math.round(c.subs * 0.0009 + Math.sin((k + i) * 0.6) * 800)),
                          }))}
                        >
                          <defs>
                            <linearGradient id={`g${i}`} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor={isWeb3 ? "#F7931A" : "#6750A4"} stopOpacity={0.6} />
                              <stop offset="100%" stopColor={isWeb3 ? "#F7931A" : "#6750A4"} stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <Area dataKey="v" stroke={isWeb3 ? "#F7931A" : "#6750A4"} fill={`url(#g${i})`} strokeWidth={1.5} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ThemedCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <ThemedCard title="Niche share" subtitle="size = share · color = growth">
          <CompetitorTreemap height={320} />
        </ThemedCard>
        <ThemedCard title="Strategy comparison" subtitle="You vs top two competitors, normalized">
          <StrategyRadar height={320} />
        </ThemedCard>
      </div>

      <ThemedCard title="Keyword gap matrix" subtitle="lower rank = better; gap = your rank − top competitor's" className="mb-4">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className={cn("text-[11px] uppercase tracking-wider text-[rgb(var(--muted))]", isWeb3 && "mono")}>
                <th className="py-2 pr-3 text-left">Keyword</th>
                <th className="py-2 pr-3 text-right">Your rank</th>
                <th className="py-2 pr-3 text-right">Top comp rank</th>
                <th className="py-2 pr-3 text-right">Gap</th>
                <th className="py-2 pr-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {keywordGapMatrix.map((row) => {
                const gapColor =
                  row.gap === 0
                    ? isWeb3 ? "bg-[#FFD600]/15 text-[#FFD600]" : "bg-emerald-100 text-emerald-700"
                    : row.gap <= 4
                      ? "bg-emerald-500/15 text-emerald-500"
                      : row.gap <= 8
                        ? "bg-amber-500/15 text-amber-500"
                        : "bg-red-500/15 text-red-500";
                return (
                  <tr key={row.keyword} className={cn("border-t", isWeb3 ? "border-white/5" : "border-[rgb(var(--border)/0.15)]")}>
                    <td className="py-2.5 pr-3 font-medium">{row.keyword}</td>
                    <td className={cn("py-2.5 pr-3 text-right", isWeb3 && "mono")}>{row.you || "—"}</td>
                    <td className={cn("py-2.5 pr-3 text-right", isWeb3 && "mono")}>{row.top_comp || "—"}</td>
                    <td className={cn("py-2.5 pr-3 text-right font-semibold", isWeb3 && "mono")}>
                      <span className={cn("inline-block rounded-full px-2 py-0.5 text-[11px]", gapColor)}>
                        {row.gap === 0 ? "open" : `+${row.gap}`}
                      </span>
                    </td>
                    <td className="py-2.5 pr-3 text-xs text-[rgb(var(--muted))]">
                      {row.gap === 0 ? "empty space — claim it" : row.gap <= 4 ? "competitive" : row.gap <= 8 ? "needs investment" : "underweight"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </ThemedCard>

      <ThemedCard
        title="Per-video differentiation brief"
        subtitle="from competitor-analyst · vid_143"
        right={<Target size={16} className={cn(isWeb3 ? "text-[#FFD600]" : "text-[rgb(var(--primary))]")} />}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <h4 className={cn("font-semibold mb-2", isWeb3 && "mono uppercase tracking-widest text-[#FFD600] text-xs")}>
              Top 5 ranking videos for "iron condor strategy"
            </h4>
            <ol className="space-y-2 text-sm">
              {["InTheMoney — Iron Condors Explained Simply (2.3M)", "tastylive — How to Trade Iron Condors (1.1M)", "Project Finance — Iron Condor Strategy Guide (980K)", "Benjamin — Selling Iron Condors Weekly (620K)", "OptionsPlay — Iron Condor Setup (310K)"].map((t, i) => (
                <li key={t} className="flex items-start gap-2">
                  <span className={cn("h-5 w-5 grid place-items-center rounded-full text-[10px] font-semibold shrink-0", isWeb3 ? "border border-white/10 mono text-[#FFD600]" : "bg-[rgb(var(--secondary))] text-[rgb(var(--primary))]")}>
                    {i + 1}
                  </span>
                  <span>{t}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h4 className={cn("font-semibold mb-2", isWeb3 && "mono uppercase tracking-widest text-[#FFD600] text-xs")}>
              Our differentiation angle
            </h4>
            <p className="text-sm leading-relaxed text-[rgb(var(--fg))]/85">
              Lead with verified <strong>real October P&L</strong> ($14,212) — none of the top-5 show
              live broker statements. Pair the educational "iron condor" anchor keyword with a
              documentary frame and trade-by-trade transparency for the returning, intermediate viewer.
            </p>
            <ul className="mt-3 space-y-1.5 text-xs">
              {[
                "Verified P&L (broker screenshots) vs simulated diagrams",
                "Trade journal disclosure (entry, adjustment, exit)",
                "Marcus-persona framing (post-market evening watch)",
                "Compliance-clean voice with explicit risk disclaimer",
              ].map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <span className={cn("mt-1 h-1.5 w-1.5 rounded-full shrink-0", isWeb3 ? "bg-[#FFD600]" : "bg-[rgb(var(--primary))]")} />
                  <span className="text-[rgb(var(--fg))]/90">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </ThemedCard>
    </div>
  );
}
