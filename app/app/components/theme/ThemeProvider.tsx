"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type ThemeName = "material" | "web3" | "saas" | "terminal";

export const THEMES: ThemeName[] = ["material", "web3", "saas", "terminal"];

export const THEME_LABELS: Record<ThemeName, string> = {
  material: "Material",
  web3: "Web3",
  saas: "SaaS",
  terminal: "Terminal",
};

interface ThemeCtx {
  theme: ThemeName;
  setTheme: (t: ThemeName) => void;
  cycle: () => void;
}

const Ctx = createContext<ThemeCtx | undefined>(undefined);

function isTheme(v: unknown): v is ThemeName {
  return typeof v === "string" && (THEMES as string[]).includes(v);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>("material");

  useEffect(() => {
    let initial: ThemeName = "material";
    try {
      const stored = localStorage.getItem("bb-theme");
      if (isTheme(stored)) initial = stored;
    } catch {}
    setThemeState(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  const setTheme = (t: ThemeName) => {
    setThemeState(t);
    document.documentElement.setAttribute("data-theme", t);
    try {
      localStorage.setItem("bb-theme", t);
    } catch {}
  };

  const cycle = () => {
    const i = THEMES.indexOf(theme);
    setTheme(THEMES[(i + 1) % THEMES.length]);
  };

  return (
    <Ctx.Provider value={{ theme, setTheme, cycle }}>{children}</Ctx.Provider>
  );
}

export function useTheme(): ThemeCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
