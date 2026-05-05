import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        // Shade-based tokens (factory standard — used by template components)
        cream: {
          DEFAULT: "#FAF7F2",
          50: "#FAF7F2",
          100: "#F3EEE6",
          200: "#E8E0D0",
        },
        ink: {
          DEFAULT: "#0F172A",
          900: "#0F172A",
          700: "#1E293B",
          500: "#64748B",
        },
        // Inkledger brand accent (navy/amber) mapped to terracotta slot
        // so shared template CTAs use the site's actual accent color
        terracotta: {
          400: "#60A5FA",
          500: "#2563EB",
          600: "#1D4ED8",
        },
        // Legacy flat tokens kept for backward compat with existing components
        primary: { DEFAULT: "#1E3A8A" },
        accent:  { DEFAULT: "#F59E0B" },
        sage: {
          400: "#60A5FA",
          500: "#2563EB",
          600: "#1E40AF",
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      maxWidth: { prose: '68ch' },
    },
  },
  plugins: [typography],
};
