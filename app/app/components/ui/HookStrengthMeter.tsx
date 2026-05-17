"use client";
import { cn } from "../../lib/utils";
import { useTheme } from "../theme/ThemeProvider";

export function HookStrengthMeter({ score }: { score: number }) {
  const { theme } = useTheme();
  const isWeb3 = theme === "web3";
  return (
    <div>
      <div className="flex items-center justify-between text-xs mb-1.5">
        <span className={cn("text-[rgb(var(--muted))]", isWeb3 && "mono uppercase tracking-widest")}>
          hook strength
        </span>
        <span className={cn("font-semibold", isWeb3 ? "mono text-[#FFD600]" : "text-[rgb(var(--primary))]")}>
          {score}/100
        </span>
      </div>
      <div className={cn("h-2 rounded-full overflow-hidden", isWeb3 ? "bg-white/5" : "bg-[rgb(var(--surface-low))]")}>
        <div
          className={cn(
            "h-full rounded-full",
            isWeb3
              ? "bg-gradient-to-r from-[#EA580C] via-[#F7931A] to-[#FFD600]"
              : "bg-gradient-to-r from-amber-400 via-[rgb(var(--primary))] to-[rgb(var(--primary))]",
          )}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}
