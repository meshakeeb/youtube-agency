import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        "surface-low": "rgb(var(--surface-low) / <alpha-value>)",
        fg: "rgb(var(--fg) / <alpha-value>)",
        primary: "rgb(var(--primary) / <alpha-value>)",
        secondary: "rgb(var(--secondary) / <alpha-value>)",
        tertiary: "rgb(var(--tertiary) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        success: "rgb(var(--success) / <alpha-value>)",
        warning: "rgb(var(--warning) / <alpha-value>)",
        error: "rgb(var(--error) / <alpha-value>)",
        // tremor required
        tremor: {
          brand: { faint: "rgb(var(--surface-low))", muted: "rgb(var(--surface))", subtle: "rgb(var(--primary))", DEFAULT: "rgb(var(--primary))", emphasis: "rgb(var(--primary))", inverted: "#ffffff" },
          background: { muted: "rgb(var(--bg))", subtle: "rgb(var(--surface))", DEFAULT: "rgb(var(--surface))", emphasis: "rgb(var(--fg))" },
          border: { DEFAULT: "rgb(var(--border) / 0.3)" },
          ring: { DEFAULT: "rgb(var(--border) / 0.3)" },
          content: { subtle: "rgb(var(--muted))", DEFAULT: "rgb(var(--fg))", emphasis: "rgb(var(--fg))", strong: "rgb(var(--fg))", inverted: "#ffffff" },
        },
      },
      borderRadius: {
        card: "var(--radius-card)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui"],
        heading: ["var(--font-heading)", "system-ui"],
        mono: ["var(--font-mono)", "ui-monospace"],
      },
      boxShadow: {
        "card-material": "0 1px 2px 0 rgba(0,0,0,0.05), 0 4px 12px -2px rgba(103,80,164,0.08)",
        "card-material-hover": "0 4px 12px -2px rgba(103,80,164,0.18), 0 12px 32px -8px rgba(103,80,164,0.18)",
        "card-web3": "0 0 30px -10px rgba(247,147,26,0.20)",
        "card-web3-hover": "0 0 40px -8px rgba(247,147,26,0.45)",
        "glow-orange": "0 0 24px rgba(247,147,26,0.45)",
        "glow-gold": "0 0 24px rgba(255,214,0,0.45)",
      },
      animation: {
        "pulse-slow": "pulse 2.5s cubic-bezier(0.4,0,0.6,1) infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  safelist: [
    {
      pattern: /^(bg|text|border|fill|stroke|ring)-(tremor|primary|secondary|tertiary)/,
    },
  ],
  plugins: [],
};
export default config;
