"use client";
import { Activity, CheckCircle2 } from "lucide-react";
import { useTheme } from "../theme/ThemeProvider";
import { cn } from "../../lib/utils";
import { unified } from "../../lib/data";

export function PipelineRibbon() {
  const { theme } = useTheme();
  const isWeb3 = theme === "web3";
  const phase = unified.pipeline_state.current_phase;
  const blocking = unified.pipeline_state.blocking_agents.length;
  const activeAgent =
    unified.agent_runs[unified.agent_runs.length - 1]?.agent ?? "client-reporting-agent";
  return (
    <div
      className={cn(
        "flex items-center gap-3 px-5 py-3 mb-6 rounded-full border",
        isWeb3
          ? "bg-black/40 backdrop-blur-lg border-white/10"
          : "bg-[rgb(var(--secondary))] border-transparent",
      )}
    >
      <div className="relative flex items-center justify-center h-6 w-6">
        <span
          className={cn(
            "absolute inline-flex h-3 w-3 rounded-full opacity-75 animate-ping",
            isWeb3 ? "bg-[#F7931A]" : "bg-[rgb(var(--primary))]",
          )}
        />
        <span
          className={cn(
            "relative inline-flex h-2.5 w-2.5 rounded-full",
            isWeb3 ? "bg-[#FFD600]" : "bg-[rgb(var(--primary))]",
          )}
        />
      </div>
      <div className="flex items-center gap-1.5 text-sm">
        <span className={cn("text-[rgb(var(--muted))]", isWeb3 && "mono uppercase text-[11px] tracking-widest")}>
          phase
        </span>
        <span
          className={cn(
            "font-semibold",
            isWeb3 ? "text-gradient-orange" : "text-[rgb(var(--primary))]",
          )}
        >
          {phase}
        </span>
      </div>
      <span className={cn("h-4 w-px", isWeb3 ? "bg-white/10" : "bg-[rgb(var(--border)/0.3)]")} />
      <div className="flex items-center gap-1.5 text-sm">
        <Activity size={14} className="text-[rgb(var(--muted))]" />
        <span className={cn("text-[rgb(var(--muted))]", isWeb3 && "mono uppercase text-[11px] tracking-widest")}>
          last
        </span>
        <span className={cn("font-medium", isWeb3 && "mono")}>{activeAgent}</span>
      </div>
      <span className={cn("h-4 w-px", isWeb3 ? "bg-white/10" : "bg-[rgb(var(--border)/0.3)]")} />
      <div className="flex items-center gap-1.5 text-sm">
        <CheckCircle2 size={14} className={cn(blocking === 0 ? "text-success" : "text-warning")} />
        <span className="text-[rgb(var(--muted))]">
          {blocking === 0 ? "no blocking agents" : `${blocking} blocking`}
        </span>
      </div>
      <div className="ml-auto text-xs text-[rgb(var(--muted))]">
        <span className={cn(isWeb3 && "mono uppercase tracking-widest")}>
          ETA stable · all green
        </span>
      </div>
    </div>
  );
}
