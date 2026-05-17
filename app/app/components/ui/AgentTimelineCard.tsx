"use client";
import { useState } from "react";
import {
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  DollarSign,
  ExternalLink,
  Hash,
  RotateCcw,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { useTheme } from "../theme/ThemeProvider";
import type { Team } from "../../lib/types";

interface Run {
  agent: string;
  team: Team;
  phase: string;
  status: string;
  started_at: string;
  ended_at: string;
  duration_ms: number;
  prompt: string;
  raw_output: string;
  structured_output: unknown;
  tokens: number;
  cost_usd: number;
  retry_count: number;
  langsmith_trace_url: string;
  execution_order: number;
}

export function AgentTimelineCard({ run }: { run: Run }) {
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();
  const isWeb3 = theme === "web3";
  const teamColor: Record<Team, string> = isWeb3
    ? { intelligence: "#EA580C", onboarding: "#F7931A", production: "#FB923C", growth: "#FCD34D", operations: "#FFD600" }
    : { intelligence: "#6750A4", onboarding: "#7D5260", production: "#9A8AC3", growth: "#B69DD8", operations: "#D0BCFF" };

  return (
    <div className="relative">
      <div
        className={cn(
          "absolute -left-7 top-3 grid h-4 w-4 place-items-center rounded-full",
          isWeb3 ? "bg-black border border-[#F7931A]/40" : "bg-white border-2",
        )}
        style={{ borderColor: teamColor[run.team] }}
      >
        <CheckCircle2 size={10} style={{ color: teamColor[run.team] }} />
      </div>
      <div
        className={cn(
          "themed-card transition-all cursor-pointer",
          isWeb3 && "bg-black/40 backdrop-blur-lg",
        )}
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "h-2 w-2 rounded-full shrink-0",
            )}
            style={{ background: teamColor[run.team] }}
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className={cn("font-semibold", isWeb3 && "mono")}>{run.agent}</span>
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider border",
                  isWeb3 ? "border-white/10 text-white/70 mono" : "border-[rgb(var(--border)/0.2)] text-[rgb(var(--muted))]",
                )}
              >
                {run.team}
              </span>
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider",
                  "bg-emerald-500/15 text-emerald-500",
                )}
              >
                {run.status}
              </span>
            </div>
            <div className={cn("text-[11px] mt-0.5 text-[rgb(var(--muted))]", isWeb3 && "mono")}>
              order #{run.execution_order} · {new Date(run.started_at).toLocaleString()}
            </div>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-[rgb(var(--muted))]">
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {(run.duration_ms / 1000).toFixed(1)}s
            </span>
            <span className="flex items-center gap-1">
              <Hash size={11} />
              {run.tokens.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <DollarSign size={11} />
              {run.cost_usd.toFixed(4)}
            </span>
            <span className="flex items-center gap-1">
              <RotateCcw size={11} />
              {run.retry_count}
            </span>
            {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </div>
        </div>

        {open && (
          <div className="mt-4 grid grid-cols-1 xl:grid-cols-2 gap-4">
            <section>
              <SectionTitle>prompt</SectionTitle>
              <pre className="code-block">{run.prompt}</pre>
            </section>
            <section>
              <SectionTitle>raw output</SectionTitle>
              <pre className="code-block">{run.raw_output}</pre>
            </section>
            <section className="xl:col-span-2">
              <div className="flex items-center justify-between">
                <SectionTitle>structured output</SectionTitle>
                <a
                  href={run.langsmith_trace_url}
                  className={cn(
                    "inline-flex items-center gap-1 text-[11px] underline-offset-2 hover:underline",
                    isWeb3 ? "text-[#FFD600] mono uppercase tracking-wider" : "text-[rgb(var(--primary))]",
                  )}
                  onClick={(e) => e.preventDefault()}
                >
                  <ExternalLink size={11} /> langsmith trace
                </a>
              </div>
              <pre className="code-block">{JSON.stringify(run.structured_output, null, 2)}</pre>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[11px] uppercase tracking-widest text-[rgb(var(--muted))] mb-1.5 mono">
      {children}
    </div>
  );
}
