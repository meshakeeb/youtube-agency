"use client";
import { useState } from "react";
import { Filter, Sparkles } from "lucide-react";
import { useTheme } from "../components/theme/ThemeProvider";
import { ThemedCard } from "../components/ui/ThemedCard";
import { KeywordTreemap } from "../components/charts/KeywordTreemap";
import { KeywordRadar } from "../components/charts/KeywordRadar";
import { IntentDonut } from "../components/charts/IntentDonut";
import { TrendingScatter } from "../components/charts/TrendingScatter";
import { ChipCloud } from "../components/ui/ChipCloud";
import { KEYWORDS_EXTENDED } from "../lib/data";
import { cn } from "../lib/utils";

const FILTERS = ["All", "Primary", "Long-tail", "Transactional", "Trending"];

export default function KeywordIntelligencePage() {
  const { theme } = useTheme();
  const isWeb3 = theme === "web3";
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [filter, setFilter] = useState("All");
  const selected = KEYWORDS_EXTENDED[selectedIdx];

  const filtered = KEYWORDS_EXTENDED.filter((k) => {
    if (filter === "All") return true;
    if (filter === "Primary") return k.tier === "primary";
    if (filter === "Long-tail") return k.tier === "long_tail";
    if (filter === "Transactional") return k.intent === "transactional";
    if (filter === "Trending") return k.growth_rate > 15;
    return true;
  });

  return (
    <div>
      <header className="mb-6">
        <h1 className={cn("text-2xl md:text-3xl font-semibold", isWeb3 && "font-heading text-gradient-orange")}>
          Keyword Intelligence
        </h1>
        <p className="text-sm text-[rgb(var(--muted))] mt-1">
          {KEYWORDS_EXTENDED.length} keywords · {KEYWORDS_EXTENDED.reduce((s, k) => s + k.volume, 0).toLocaleString()} monthly searches
        </p>
      </header>

      <div className="flex items-center gap-2 flex-wrap mb-4">
        <Filter size={14} className="text-[rgb(var(--muted))]" />
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-full px-3 py-1 text-xs transition-colors",
              filter === f
                ? isWeb3
                  ? "bg-gradient-to-r from-[#F7931A] to-[#FFD600] text-black"
                  : "bg-[rgb(var(--primary))] text-white"
                : isWeb3
                  ? "border border-white/10 text-white/70 hover:border-[#F7931A]/40"
                  : "bg-[rgb(var(--secondary))] text-[rgb(var(--primary))]",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <ThemedCard title="Keyword universe" subtitle="size = volume · color = opportunity" className="mb-4">
        <KeywordTreemap height={340} />
      </ThemedCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <ThemedCard className="lg:col-span-2" title="Keyword table" subtitle="click a row to update the radar">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className={cn("text-[11px] uppercase tracking-wider text-[rgb(var(--muted))]", isWeb3 && "mono")}>
                  <th className="py-2 pr-3 text-left">Keyword</th>
                  <th className="py-2 pr-3 text-right">Volume</th>
                  <th className="py-2 pr-3 text-right">Difficulty</th>
                  <th className="py-2 pr-3 text-right">Growth</th>
                  <th className="py-2 pr-3 text-right">Opportunity</th>
                  <th className="py-2 pr-3 text-left">Intent</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((k) => {
                  const idx = KEYWORDS_EXTENDED.indexOf(k);
                  const isSel = idx === selectedIdx;
                  return (
                    <tr
                      key={k.keyword}
                      onClick={() => setSelectedIdx(idx)}
                      className={cn(
                        "border-t cursor-pointer transition-colors",
                        isWeb3 ? "border-white/5" : "border-[rgb(var(--border)/0.15)]",
                        isSel && (isWeb3 ? "bg-[#F7931A]/10" : "bg-[rgb(var(--secondary))]"),
                      )}
                    >
                      <td className="py-2.5 pr-3">
                        <div className={cn("font-medium", isWeb3 && "mono")}>{k.keyword}</div>
                        <div className="text-[11px] text-[rgb(var(--muted))] uppercase tracking-wider">{k.tier}</div>
                      </td>
                      <td className={cn("py-2.5 pr-3 text-right", isWeb3 && "mono")}>{k.volume.toLocaleString()}</td>
                      <td className="py-2.5 pr-3 text-right">{k.difficulty}</td>
                      <td className={cn("py-2.5 pr-3 text-right", isWeb3 && "mono")}>+{k.growth_rate.toFixed(1)}%</td>
                      <td className="py-2.5 pr-3 text-right">
                        <span
                          className={cn(
                            "inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold",
                            k.opportunity_score >= 70
                              ? isWeb3 ? "bg-[#FFD600] text-black" : "bg-[rgb(var(--primary))] text-white"
                              : k.opportunity_score >= 40
                                ? isWeb3 ? "bg-[#F7931A]/20 text-[#F7931A]" : "bg-[rgb(var(--secondary))] text-[rgb(var(--primary))]"
                                : isWeb3 ? "bg-white/5 text-white/60" : "bg-[rgb(var(--surface-low))] text-[rgb(var(--muted))]",
                          )}
                        >
                          {k.opportunity_score}
                        </span>
                      </td>
                      <td className="py-2.5 pr-3 text-xs text-[rgb(var(--muted))]">{k.intent}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </ThemedCard>
        <ThemedCard
          title="Scoring radar"
          subtitle={selected.keyword}
          right={
            <button
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium",
                isWeb3 ? "border border-[#FFD600]/40 text-[#FFD600] mono" : "bg-[rgb(var(--secondary))] text-[rgb(var(--primary))]",
              )}
            >
              <Sparkles size={11} /> add to calendar
            </button>
          }
        >
          <KeywordRadar keyword={selected} height={250} />
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
            <div className={cn("rounded-lg px-2 py-1", isWeb3 ? "border border-white/10" : "bg-[rgb(var(--surface-low))]")}>
              <div className="text-[10px] text-[rgb(var(--muted))] uppercase">Volume</div>
              <div className={cn("font-semibold", isWeb3 && "mono")}>{selected.volume.toLocaleString()}</div>
            </div>
            <div className={cn("rounded-lg px-2 py-1", isWeb3 ? "border border-white/10" : "bg-[rgb(var(--surface-low))]")}>
              <div className="text-[10px] text-[rgb(var(--muted))] uppercase">Difficulty</div>
              <div className={cn("font-semibold", isWeb3 && "mono")}>{selected.difficulty}/100</div>
            </div>
          </div>
        </ThemedCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <ThemedCard title="Intent distribution" subtitle="across selected universe">
          <IntentDonut height={220} />
        </ThemedCard>
        <ThemedCard className="lg:col-span-2" title="Trending vs evergreen" subtitle="x = volume · y = growth · size = opportunity">
          <TrendingScatter height={260} />
        </ThemedCard>
      </div>

      <ThemedCard title={`Long-tail expansions for "${selected.keyword}"`} subtitle="from keyword-researcher agent">
        <ChipCloud chips={selected.long_tail} />
      </ThemedCard>
    </div>
  );
}
