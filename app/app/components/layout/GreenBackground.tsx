"use client";
import { useTheme } from "../theme/ThemeProvider";

export function GreenBackground() {
  const { theme } = useTheme();
  if (theme !== "green") return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[820px] h-[520px] bg-spotlight" />
    </div>
  );
}
