"use client";
import { useMemo, useState } from "react";
import { Filter } from "lucide-react";
import { useTheme } from "../components/theme/ThemeProvider";
import { ThemedCard } from "../components/ui/ThemedCard";
import { RunRateAreaChart } from "../components/charts/RunRateAreaChart";
import { AgentTimelineCard } from "../components/ui/AgentTimelineCard";
import { agentRunsEnriched } from "../lib/data";
import type { Team } from "../lib/types";
import { cn } from "../lib/utils";

const TEAMS: ("all" | Team)[] = ["all", "intelligence", "onboarding", "production", "growth", "operations"];

export default function AgentActivityPage() {
  const { theme } = useTheme();
  const isWeb3 = theme === "web3";
  const [teamFilter, setTeamFilter] = useState<"all" | Team>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "completed" | "failed">("all");

  const filtered = useMemo(() => {
    return agentRunsEnriched
      .filter((r) => (teamFilter === "all" ? true : r.team === teamFilter))
      .filter((r) => (statusFilter === "all" ? true : r.status === statusFilter))
      .slice()
      .reverse();
  }, [teamFilter, statusFilter]);

  const totalTokens = agentRunsEnriched.reduce((s, r) => s + r.tokens, 0);
  const totalCost = agentRunsEnriched.reduce((s, r) => s + r.cost_usd, 0);
  const totalDuration = agentRunsEnriched.reduce((s, r) => s + r.duration_ms, 0);

  return (
    <div>
      <header className="mb-6">
        <h1 className={cn("text-2xl md:text-3xl font-semibold", isWeb3 && "font-heading text-gradient-orange")}>
          Agent Activity Logs
        </h1>
        <p className="text-sm text-[rgb(var(--muted))] mt-1">
          {agentRunsEnriched.length} runs · {totalTokens.toLocaleString()} tokens · ${totalCost.toFixed(2)} · {(totalDuration / 1000).toFixed(1)}s wall time
        </p>
      </header>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <Filter size={14} className="text-[rgb(var(--muted))]" />
        <span className={cn("text-xs uppercase tracking-wider text-[rgb(var(--muted))]", isWeb3 && "mono")}>team</span>
        {TEAMS.map((t) => (
          <button
            key={t}
            onClick={() => setTeamFilter(t)}
            className={cn(
              "rounded-full px-3 py-1 text-xs transition-colors",
              teamFilter === t
                ? isWeb3
                  ? "bg-gradient-to-r from-[#F7931A] to-[#FFD600] text-black"
                  : "bg-[rgb(var(--primary))] text-white"
                : isWeb3
                  ? "border border-white/10 text-white/70"
                  : "bg-[rgb(var(--secondary))] text-[rgb(var(--primary))]",
            )}
          >
            {t}
          </button>
        ))}
        <span className={cn("ml-3 text-xs uppercase tracking-wider text-[rgb(var(--muted))]", isWeb3 && "mono")}>status</span>
        {(["all", "completed", "failed"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={cn(
              "rounded-full px-3 py-1 text-xs transition-colors",
              statusFilter === s
                ? isWeb3
                  ? "bg-gradient-to-r from-[#F7931A] to-[#FFD600] text-black"
                  : "bg-[rgb(var(--primary))] text-white"
                : isWeb3
                  ? "border border-white/10 text-white/70"
                  : "bg-[rgb(var(--secondary))] text-[rgb(var(--primary))]",
            )}
          >
            {s}
          </button>
        ))}
      </div>

      <ThemedCard title="Run rate — last 24h" subtitle="stacked by team, hourly buckets" className="mb-6">
        <RunRateAreaChart height={240} />
      </ThemedCard>

      <ThemedCard title={`Timeline · ${filtered.length} runs`} subtitle="most recent first · click any card to expand">
        <div className="relative pl-7">
          <div
            className={cn(
              "absolute left-2 top-0 bottom-0 w-px",
              isWeb3
                ? "bg-gradient-to-b from-[#F7931A] via-[#FFD600] to-transparent"
                : "bg-[rgb(var(--border)/0.30)]",
            )}
          />
          <div className="space-y-3">
            {filtered.map((r) => (
              <AgentTimelineCard key={r.agent + r.started_at} run={r} />
            ))}
          </div>
        </div>
      </ThemedCard>
    </div>
  );
}
