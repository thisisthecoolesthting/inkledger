/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#F5F0E8",
          100: "#EBE6DF",
          200: "#DCD8D1",
        },
        ink: {
          900: "#0B1120",
          700: "#334155",
          600: "#475569",
          500: "#64748B",
        },
        terracotta: {
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#B45309",
        },
        blue: {
          900: "#1E3A8A",
          800: "#1E40AF",
          50: "#EFF6FF",
        },
        primary: { DEFAULT: "#1E3A8A" },
        accent: { DEFAULT: "#F59E0B" },
        sage: {
          400: "#60A5FA",
          500: "#2563EB",
          600: "#1E40AF",
        },
      },
      fontFamily: {
        display: ["Newsreader", "Georgia", "serif"],
        body: ["Roboto", "system-ui", "sans-serif"],
        sans: ["Roboto", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      maxWidth: {
        prose: "68ch",
        site: "72rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(11, 17, 32, 0.05), 0 4px 16px rgba(11, 17, 32, 0.06)",
        "soft-lg": "0 2px 4px rgba(11, 17, 32, 0.06), 0 12px 32px rgba(11, 17, 32, 0.1)",
      },
    },
  },
  plugins: [],
};
