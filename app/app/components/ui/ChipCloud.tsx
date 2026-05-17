"use client";
import { cn } from "../../lib/utils";
import { useTheme } from "../theme/ThemeProvider";

export function ChipCloud({ chips, accent }: { chips: string[]; accent?: boolean }) {
  const { theme } = useTheme();
  const isWeb3 = theme === "web3";
  return (
    <div className="flex flex-wrap gap-1.5">
      {chips.map((c) => (
        <span
          key={c}
          className={cn(
            "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] transition-colors cursor-default",
            isWeb3
              ? "border border-white/10 text-white/80 hover:border-[#F7931A]/60 mono uppercase tracking-wide"
              : accent
                ? "bg-[rgb(var(--primary))] text-white"
                : "bg-[rgb(var(--secondary))] text-[rgb(var(--primary))]",
          )}
        >
          {c}
        </span>
      ))}
    </div>
  );
}
