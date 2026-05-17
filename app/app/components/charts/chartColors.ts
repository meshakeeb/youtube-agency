"use client";
import { useTheme } from "../theme/ThemeProvider";
// (component lives in components/charts; ThemeProvider in components/theme — relative path correct)

export interface ChartPalette {
  primary: string;
  secondary: string;
  tertiary: string;
  accent: string;
  axis: string;
  grid: string;
  muted: string;
  series: string[];
  heat: string[];
}

const MATERIAL: ChartPalette = {
  primary: "#6750A4",
  secondary: "#7D5260",
  tertiary: "#B69DD8",
  accent: "#9A8AC3",
  axis: "#49454F",
  grid: "rgba(73,69,79,0.15)",
  muted: "#C9C5D0",
  series: ["#6750A4", "#7D5260", "#9A8AC3", "#B69DD8", "#D0BCFF"],
  heat: ["#F3EDF7", "#E8DEF8", "#D0BCFF", "#B69DD8", "#9A8AC3", "#7D5260", "#6750A4", "#4F378B", "#1D192B"],
};

const WEB3: ChartPalette = {
  primary: "#F7931A",
  secondary: "#EA580C",
  tertiary: "#FFD600",
  accent: "#FB923C",
  axis: "#94A3B8",
  grid: "rgba(255,255,255,0.06)",
  muted: "#475569",
  series: ["#F7931A", "#EA580C", "#FB923C", "#FCD34D", "#FFD600"],
  heat: ["#0F1115", "#1F2937", "#451A03", "#7C2D12", "#9A3412", "#C2410C", "#EA580C", "#F7931A", "#FFD600"],
};

export function usePalette(): { palette: ChartPalette; isWeb3: boolean } {
  const { theme } = useTheme();
  const isWeb3 = theme === "web3";
  return { palette: isWeb3 ? WEB3 : MATERIAL, isWeb3 };
}
