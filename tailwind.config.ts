import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm small-town brand palette
        cream: "#FAF4E9",
        sand: "#F0E4CE",
        terracotta: {
          DEFAULT: "#C86B4A",
          deep: "#A9502F",
          soft: "#E0A184",
        },
        sage: {
          DEFAULT: "#8FA07C",
          deep: "#5F7154",
          soft: "#C3CFB4",
        },
        gold: "#E0A84E",
        charcoal: {
          DEFAULT: "#3A322C",
          soft: "#5C534B",
        },
        river: "#6E93A6",
        // Playful mosaic accents (decorative only — never on primary UI)
        mosaic: {
          pink: "#FF5DA2",
          yellow: "#FFC93C",
          teal: "#3EC7C2",
          orange: "#FF7A3D",
          purple: "#7C5CFF",
          grass: "#7BC043",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "14px",
        lg: "22px",
        xl: "28px",
      },
      boxShadow: {
        soft: "0 6px 20px rgba(58,50,44,0.08)",
        lift: "0 12px 34px rgba(58,50,44,0.14)",
        inset: "inset 0 1px 0 rgba(255,255,255,0.5)",
      },
      maxWidth: {
        content: "1120px",
      },
      keyframes: {
        "leaf-sway": {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(4deg)" },
        },
        "liquid-bob": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-3px)" },
        },
        "fade-rise": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "leaf-sway": "leaf-sway 4.5s ease-in-out infinite",
        "liquid-bob": "liquid-bob 5s ease-in-out infinite",
        "fade-rise": "fade-rise 0.7s ease-out both",
        "float-slow": "float-slow 7s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
