"use client";
import { Check, Loader2 } from "lucide-react";
import { cn } from "../../lib/utils";
import { useTheme } from "../theme/ThemeProvider";

export function PipelineStepper({
  steps,
  activeIndex,
}: {
  steps: { key: string; label: string; agent: string }[];
  activeIndex: number;
}) {
  const { theme } = useTheme();
  const isWeb3 = theme === "web3";
  return (
    <div className="relative flex items-center gap-2 overflow-x-auto pb-2">
      {steps.map((step, i) => {
        const done = i < activeIndex;
        const active = i === activeIndex;
        return (
          <div key={step.key} className="flex items-center shrink-0">
            <div
              className={cn(
                "flex items-center gap-2 rounded-full pl-2 pr-3 py-1.5 text-xs font-medium transition-colors",
                done
                  ? isWeb3
                    ? "bg-gradient-to-r from-[#F7931A]/15 to-transparent border border-[#F7931A]/40 text-[#FFD600]"
                    : "bg-[rgb(var(--primary))] text-white"
                  : active
                    ? isWeb3
                      ? "border border-[#FFD600] text-[#FFD600] mono"
                      : "bg-[rgb(var(--secondary))] text-[rgb(var(--primary))]"
                    : isWeb3
                      ? "border border-white/10 text-white/50"
                      : "bg-[rgb(var(--surface-low))] text-[rgb(var(--muted))]",
              )}
            >
              <span
                className={cn(
                  "grid h-5 w-5 place-items-center rounded-full text-[10px] font-semibold",
                  done
                    ? "bg-white/20 text-white"
                    : active
                      ? isWeb3 ? "bg-[#FFD600] text-black" : "bg-[rgb(var(--primary))] text-white"
                      : isWeb3 ? "bg-white/10 text-white" : "bg-[rgb(var(--border)/0.25)] text-[rgb(var(--muted))]",
                )}
              >
                {done ? <Check size={11} /> : active ? <Loader2 size={11} className="animate-spin" /> : i + 1}
              </span>
              <span className={cn(isWeb3 && "mono uppercase tracking-wider")}>{step.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={cn(
                  "h-px w-6",
                  done
                    ? isWeb3 ? "bg-gradient-to-r from-[#F7931A] to-[#FFD600]" : "bg-[rgb(var(--primary))]"
                    : isWeb3 ? "bg-white/10" : "bg-[rgb(var(--border)/0.30)]",
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
