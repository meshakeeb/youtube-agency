"use client";
import { useTheme } from "../theme/ThemeProvider";

export function ElectroBackground() {
  const { theme } = useTheme();
  if (theme !== "electro") return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-grid-dim opacity-70" />
      <div className="absolute -top-40 -left-40 w-[640px] h-[640px] bg-glow-cyan" />
      <div className="absolute -bottom-48 -right-48 w-[640px] h-[640px] bg-glow-lime" />
    </div>
  );
}
