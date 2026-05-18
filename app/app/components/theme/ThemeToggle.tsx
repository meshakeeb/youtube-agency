"use client";
import { Sun, Moon, Sparkles, TerminalSquare, type LucideIcon } from "lucide-react";
import { useTheme, THEMES, THEME_LABELS, type ThemeName } from "./ThemeProvider";
import { cn } from "../../lib/utils";

const ICONS: Record<ThemeName, LucideIcon> = {
  material: Sun,
  web3: Moon,
  saas: Sparkles,
  terminal: TerminalSquare,
};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <div
      role="radiogroup"
      aria-label="Theme picker"
      className={cn(
        "flex items-center gap-1 rounded-full p-1 text-[11px] font-medium",
        // theme-aware shell
        theme === "web3" &&
          "border border-white/10 bg-black/40 shadow-[0_0_20px_-6px_rgba(247,147,26,0.45)]",
        theme === "material" &&
          "border border-[rgb(var(--primary)/0.2)] bg-[rgb(var(--surface))]",
        theme === "saas" &&
          "border border-[rgb(var(--border))] bg-white shadow-[0_4px_12px_-4px_rgba(0,82,255,0.18)]",
        theme === "terminal" &&
          "rounded-none border border-[rgb(var(--primary))] bg-[rgb(var(--surface))]",
      )}
    >
      {THEMES.map((t) => {
        const Icon = ICONS[t];
        const active = t === theme;
        const baseChip =
          "flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all uppercase tracking-wider";
        const inactive = "opacity-55 hover:opacity-100";
        const activePerTheme: Record<ThemeName, string> = {
          material:
            "bg-[rgb(var(--primary))] text-white shadow-sm",
          web3:
            "bg-gradient-to-r from-[#EA580C] to-[#F7931A] text-white shadow-[0_0_16px_-4px_rgba(247,147,26,0.7)]",
          saas:
            "bg-gradient-to-r from-[#0052FF] to-[#4D7CFF] text-white shadow-[0_2px_10px_-2px_rgba(0,82,255,0.5)]",
          terminal:
            "bg-[rgb(var(--primary))] text-black rounded-none",
        };
        return (
          <button
            key={t}
            role="radio"
            aria-checked={active}
            aria-label={`Switch to ${THEME_LABELS[t]} theme`}
            onClick={() => setTheme(t)}
            className={cn(
              baseChip,
              theme === "terminal" && "rounded-none",
              active ? activePerTheme[theme] : inactive,
            )}
          >
            <Icon size={12} strokeWidth={2} />
            <span>{THEME_LABELS[t]}</span>
          </button>
        );
      })}
    </div>
  );
}
