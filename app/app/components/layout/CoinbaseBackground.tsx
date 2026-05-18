"use client";
import { useTheme } from "../theme/ThemeProvider";

export function CoinbaseBackground() {
  const { theme } = useTheme();
  if (theme !== "coinbase") return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* faint blue glow in the top-right corner — almost imperceptible */}
      <div className="absolute -top-32 -right-32 w-[520px] h-[520px] bg-glow-blue" />
    </div>
  );
}
