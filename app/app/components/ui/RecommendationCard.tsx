"use client";
import { ArrowRight } from "lucide-react";
import { cn } from "../../lib/utils";
import { useTheme } from "../theme/ThemeProvider";
import type { Team } from "../../lib/types";

const ownerLabel: Record<Team, string> = {
  intelligence: "Intel",
  onboarding: "Onb",
  production: "Prod",
  growth: "Growth",
  operations: "Ops",
};

export function RecommendationCard({
  rank,
  action,
  owner,
  effort,
}: {
  rank: number;
  action: string;
  owner: Team;
  effort: "low" | "medium" | "high";
}) {
  const { theme } = useTheme();
  const isWeb3 = theme === "web3";
  return (
    <div
      className={cn(
        "group flex items-start gap-3 rounded-xl border p-3 transition-all cursor-pointer",
        isWeb3
          ? "border-white/5 hover:border-[#F7931A]/40 bg-black/20"
          : "border-[rgb(var(--border)/0.15)] bg-[rgb(var(--bg))]/50 hover:bg-[rgb(var(--secondary))]",
      )}
    >
      <div
        className={cn(
          "grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-semibold",
          isWeb3 ? "bg-gradient-to-br from-[#F7931A] to-[#FFD600] text-black mono" : "bg-[rgb(var(--primary))] text-white",
        )}
      >
        {rank}
      </div>
      <div className="flex-1 min-w-0">
        <div className={cn("text-sm leading-snug", isWeb3 ? "text-white" : "text-[rgb(var(--fg))]")}>{action}</div>
        <div className="mt-1 flex items-center gap-1.5 flex-wrap">
          <span
            className={cn(
              "rounded-full px-1.5 py-0.5 text-[10px] uppercase tracking-wider",
              isWeb3 ? "mono border border-white/10 text-white/70" : "bg-[rgb(var(--surface-low))] text-[rgb(var(--muted))]",
            )}
          >
            {ownerLabel[owner]}
          </span>
          <span
            className={cn(
              "rounded-full px-1.5 py-0.5 text-[10px] uppercase tracking-wider",
              effort === "low"
                ? "bg-emerald-500/15 text-emerald-500"
                : effort === "medium"
                  ? "bg-amber-500/15 text-amber-500"
                  : "bg-red-500/15 text-red-500",
            )}
          >
            {effort}
          </span>
        </div>
      </div>
      <ArrowRight
        size={16}
        className={cn(
          "shrink-0 mt-1 opacity-50 transition-all group-hover:translate-x-0.5 group-hover:opacity-100",
          isWeb3 ? "text-[#F7931A]" : "text-[rgb(var(--primary))]",
        )}
      />
    </div>
  );
}
