"use client";
import { useTheme } from "../theme/ThemeProvider";

export function SaasBackground() {
  const { theme } = useTheme();
  if (theme !== "saas") return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* warm canvas base color comes from --bg */}
      <div className="absolute inset-0 bg-dotgrid opacity-60" />
      {/* corner glows */}
      <div className="absolute -top-40 -right-40 w-[640px] h-[640px] bg-glow-blue" />
      <div className="absolute -bottom-48 -left-48 w-[720px] h-[720px] bg-glow-sky" />
    </div>
  );
}
