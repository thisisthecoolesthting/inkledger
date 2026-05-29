/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        // Shade-based tokens (factory standard — used by template components)
        cream: {
          50: "#F5F0E8",
          100: "#EBE6DF",
          200: "#DCD8D1",
        },
        ink: {
          900: "#0B1120",
          700: "#334155",
          500: "#64748B",
        },
        // Inkledger brand mapped to terracotta slot so shared CTAs use site accent
        terracotta: {
          400: "#8F3415",
          500: "#7C2D12",
          600: "#66250F",
        },
        // Legacy flat tokens kept for backward compat
        primary: { DEFAULT: "#1E1B4B" },
        accent: { DEFAULT: "#7C2D12" },
        sage: {
          400: "#60A5FA",
          500: "#2563EB",
          600: "#1E40AF",
        },
      },
      fontFamily: {
        display: ['Cormorant', "Georgia", "serif"],
        body: ['Lora', "sans-serif"],
        mono:    ['"JetBrains Mono"', "monospace"],
      },
      maxWidth: { prose: "68ch" },
    },
  },
  plugins: [],
};
