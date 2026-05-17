"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { cn } from "../../lib/utils";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isWeb3 = theme === "web3";
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className={cn(
        "relative flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-all",
        isWeb3
          ? "border border-white/10 bg-black/40 text-white shadow-[0_0_20px_-6px_rgba(247,147,26,0.5)] hover:border-[#F7931A]/60"
          : "border border-[rgb(var(--primary)/0.2)] bg-[rgb(var(--surface))] text-[rgb(var(--fg))] hover:bg-[rgb(var(--surface-low))]",
      )}
    >
      {isWeb3 ? (
        <>
          <span className="text-[#FFD600]"><Moon size={14} strokeWidth={2} /></span>
          <span className="mono uppercase tracking-widest">web3</span>
        </>
      ) : (
        <>
          <Sun size={14} strokeWidth={1.5} />
          <span>Material</span>
        </>
      )}
    </button>
  );
}
