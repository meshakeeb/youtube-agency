"use client";
import { Lightbulb, AlertTriangle, AlertOctagon } from "lucide-react";
import { cn } from "../../lib/utils";
import { useTheme } from "../theme/ThemeProvider";

export function InsightCard({ text, severity = "info" }: { text: string; severity?: "info" | "warning" | "critical" }) {
  const { theme } = useTheme();
  const isWeb3 = theme === "web3";
  const Icon = severity === "critical" ? AlertOctagon : severity === "warning" ? AlertTriangle : Lightbulb;
  const accent =
    severity === "critical"
      ? "text-red-500"
      : severity === "warning"
        ? "text-amber-500"
        : isWeb3
          ? "text-[#FFD600]"
          : "text-[rgb(var(--primary))]";
  return (
    <div
      className={cn(
        "themed-card p-4 flex gap-3 items-start",
        isWeb3 && severity === "critical" && "border-red-500/30",
        isWeb3 && severity === "warning" && "border-amber-500/30",
      )}
    >
      <div className={cn("shrink-0 mt-0.5", accent)}>
        <Icon size={18} />
      </div>
      <p className={cn("text-sm leading-snug", isWeb3 ? "text-white/90" : "text-[rgb(var(--fg))]")}>{text}</p>
    </div>
  );
}
