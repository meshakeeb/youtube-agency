"use client";
import {
  Sun,
  Moon,
  Bitcoin,
  Zap,
  Music2,
  type LucideIcon,
} from "lucide-react";
import { useTheme, THEMES, THEME_LABELS, type ThemeName } from "./ThemeProvider";
import { cn } from "../../lib/utils";

const ICONS: Record<ThemeName, LucideIcon> = {
  material: Sun,
  web3: Moon,
  coinbase: Bitcoin,
  electro: Zap,
  green: Music2,
};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const shell = cn(
    "flex items-center gap-1 p-1 text-[11px] font-medium",
    theme === "web3" &&
      "rounded-full border border-white/10 bg-black/40 shadow-[0_0_20px_-6px_rgba(247,147,26,0.45)]",
    theme === "material" &&
      "rounded-full border border-[rgb(var(--primary)/0.2)] bg-[rgb(var(--surface))]",
    theme === "coinbase" &&
      "rounded-[100px] border border-[rgb(var(--border))] bg-white",
    theme === "electro" &&
      "rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] shadow-[0_0_16px_-6px_rgba(0,229,255,0.35)]",
    theme === "green" &&
      "rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface))]",
  );

  const activePerTheme: Record<ThemeName, string> = {
    material: "bg-[rgb(var(--primary))] text-white shadow-sm",
    web3:
      "bg-gradient-to-r from-[#EA580C] to-[#F7931A] text-white shadow-[0_0_16px_-4px_rgba(247,147,26,0.7)]",
    coinbase: "bg-[rgb(var(--primary))] text-white",
    electro:
      "bg-[rgb(var(--primary))] text-black shadow-[0_0_16px_-4px_rgba(0,229,255,0.6)]",
    green:
      "bg-[rgb(var(--primary))] text-white hover:bg-[rgb(var(--tertiary))]",
  };

  const chipShape = theme === "electro" ? "rounded-lg" : "rounded-full";

  return (
    <div role="radiogroup" aria-label="Theme picker" className={shell}>
      {THEMES.map((t) => {
        const Icon = ICONS[t];
        const active = t === theme;
        return (
          <button
            key={t}
            role="radio"
            aria-checked={active}
            aria-label={`Switch to ${THEME_LABELS[t]} theme`}
            onClick={() => setTheme(t)}
            className={cn(
              "flex items-center gap-1.5 px-2.5 py-1 transition-all uppercase tracking-wider",
              chipShape,
              active ? activePerTheme[theme] : "opacity-55 hover:opacity-100",
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
