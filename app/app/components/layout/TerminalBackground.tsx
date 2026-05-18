"use client";
import { useTheme } from "../theme/ThemeProvider";

export function TerminalBackground() {
  const { theme } = useTheme();
  if (theme !== "terminal") return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* faint CRT scanlines */}
      <div className="absolute inset-0 bg-scanlines" />
      {/* darkened corners (CRT vignette) */}
      <div className="absolute inset-0 bg-crt-vignette" />
    </div>
  );
}
