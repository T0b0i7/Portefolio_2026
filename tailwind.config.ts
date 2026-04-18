import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        sm: "2rem",
        lg: "4rem",
      },
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        parchment: {
          DEFAULT: "rgb(var(--color-parchment-rgb, 245 244 237) / <alpha-value>)",
          dark: "rgb(var(--color-parchment-dark-rgb, 240 238 230) / <alpha-value>)",
        },
        ivory: {
          DEFAULT: "rgb(var(--color-ivory-rgb, 250 249 245) / <alpha-value>)",
        },
        "near-black": {
          DEFAULT: "rgb(var(--color-near-black-rgb, 20 20 19) / <alpha-value>)",
        },
        terracotta: {
          DEFAULT: "rgb(var(--color-terracotta-rgb, 201 100 66) / <alpha-value>)",
          light: "rgb(var(--color-terracotta-light-rgb, 217 119 87) / <alpha-value>)",
        },
        "olive-gray": {
          DEFAULT: "rgb(var(--color-olive-gray-rgb, 94 93 89) / <alpha-value>)",
        },
        "warm-sand": {
          DEFAULT: "rgb(var(--color-warm-sand-rgb, 232 230 220) / <alpha-value>)",
        },
        "border-cream": {
          DEFAULT: "rgb(var(--color-border-cream-rgb, 240 238 230) / <alpha-value>)",
        },
        primary: {
          DEFAULT: "rgb(var(--color-terracotta-rgb, 201 100 66) / <alpha-value>)",
          foreground: "rgb(var(--color-ivory-rgb, 250 249 245) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "rgb(var(--color-warm-sand-rgb, 232 230 220) / <alpha-value>)",
          foreground: "rgb(var(--color-charcoal-warm-rgb, 77 76 72) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "rgb(var(--color-destructive-rgb, 181 51 51) / <alpha-value>)",
          foreground: "rgb(var(--color-ivory-rgb, 250 249 245) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "rgb(var(--color-muted-base-rgb, 135 134 127) / <alpha-value>)",
          foreground: "rgb(var(--color-olive-gray-rgb, 94 93 89) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--color-terracotta-light-rgb, 217 119 87) / <alpha-value>)",
          foreground: "rgb(var(--color-ivory-rgb, 250 249 245) / <alpha-value>)",
        },
        card: {
          DEFAULT: "rgb(var(--color-ivory-rgb, 250 249 245) / <alpha-value>)",
          foreground: "rgb(var(--color-near-black-rgb, 20 20 19) / <alpha-value>)",
        },
        "charcoal-warm": "rgb(var(--color-charcoal-warm-rgb, 77 76 72) / <alpha-value>)",
        "stone-gray": "hsl(var(--muted))",
        "border-dark": "rgb(var(--color-border-dark-rgb, 48 48 46) / <alpha-value>)",
        "ring-warm": "rgb(var(--color-ring-warm-rgb, 209 207 197) / <alpha-value>)",
        "ring-subtle": "rgb(var(--color-ring-subtle-rgb, 222 220 1) / <alpha-value>)",
        "ring-deep": "rgb(var(--color-ring-deep-rgb, 194 192 182) / <alpha-value>)",
      },
      borderRadius: {
        lg: "var(--radius-lg, 12px)",
        md: "var(--radius-md, 8px)",
        sm: "var(--radius-sm, 6px)",
        badge: "var(--radius-badge, 14px)",
        card: "var(--radius-card, 12px)",
        circle: "var(--radius-circle, 50%)",
      },
      fontFamily: {
        serif: ["Crimson Pro", "Georgia", "serif"],
        sans: ["var(--font-family, Inter)", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-out": {
          from: { opacity: "1", transform: "translateY(0)" },
          to: { opacity: "0", transform: "translateY(10px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "fade-out": "fade-out 0.4s ease-out forwards",
      },
      boxShadow: {
        ring: "0 0 0 1px var(--ring-color, #d1cfc5)",
        whisper: "0 4px 24px rgba(0, 0, 0, 0.05)",
        card: "var(--shadow-card, 0 4px 24px rgba(0, 0, 0, 0.05))",
        hover: "var(--shadow-hover, 0 10px 30px rgba(0, 0, 0, 0.1))",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;

