"use client";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import { cn } from "../../lib/utils";
import { useTheme } from "../theme/ThemeProvider";

export function QcDecisionBanner({
  decision,
  score,
  publishWindow,
  revisionNotes = [],
}: {
  decision: "APPROVED" | "RETURNED";
  score: number;
  publishWindow?: string;
  revisionNotes?: string[];
}) {
  const { theme } = useTheme();
  const isWeb3 = theme === "web3";
  const approved = decision === "APPROVED";
  if (approved) {
    return (
      <div
        className={cn(
          "flex items-center gap-4 rounded-2xl p-4 border",
          isWeb3
            ? "bg-gradient-to-r from-emerald-500/10 to-transparent border-emerald-500/40"
            : "bg-emerald-50 border-emerald-200 text-emerald-900",
        )}
      >
        <div
          className={cn(
            "grid h-10 w-10 place-items-center rounded-full",
            isWeb3 ? "bg-emerald-500/20 text-emerald-300" : "bg-emerald-500 text-white",
          )}
        >
          <CheckCircle2 size={20} />
        </div>
        <div className="flex-1">
          <div className={cn("font-semibold", isWeb3 && "mono uppercase tracking-wider text-emerald-300")}>
            QC APPROVED · score {score}
          </div>
          <div className={cn("text-xs mt-0.5", isWeb3 ? "text-white/70" : "text-emerald-900/80")}>
            Cleared for publish · {publishWindow}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={cn("rounded-2xl p-4 border", isWeb3 ? "bg-[#1F0A0A] border-red-500/40" : "bg-[#FFDAD6] border-red-300")}>
      <div className="flex items-center gap-3">
        <AlertTriangle size={20} className="text-red-500" />
        <div className="font-semibold text-red-600">RETURNED for revision — score {score}</div>
      </div>
      <ul className="mt-2 list-disc pl-6 text-xs text-red-700 space-y-1">
        {revisionNotes.map((n) => (
          <li key={n}>{n}</li>
        ))}
      </ul>
    </div>
  );
}
