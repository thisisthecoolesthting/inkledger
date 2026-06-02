import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx,svelte,vue}"],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FAFAF9",
          100: "#F5F5F4",
          200: "#E7E5E4",
        },
        terracotta: {
          400: "#60A5FA",
          500: "#0B3D5E",
          600: "#1E40AF",
        },
        primary: { DEFAULT: "#0B3D5E" },
        accent: { DEFAULT: "#F59E0B" },
        sage: { 400: "#8FA888", 500: "#6F8B6A", 600: "#566F52" },
        rose: { deep: "#0F172A" },
        ink: {
          900: "#0F172A",
          700: "#4A4340",
          500: "#6E6863",
        },
      },
      maxWidth: {
        prose: "68ch",
      },
      typography: {
        DEFAULT: { css: { maxWidth: "68ch" } },
        ink: { css: { color: "#4A4340" } },
      },
      fontFamily: {
        display: ["Newsreader", "Georgia", "serif"],
        sans: ["Roboto", "system-ui", "sans-serif"],
        body: ["Roboto", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [typography],
};
