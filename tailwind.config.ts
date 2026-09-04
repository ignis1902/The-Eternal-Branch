import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#0a0a1a",
        voidDeep: "#0d0221",
        gold: "#d4af37",
        saffron: "#ff9933",
        indigo: {
          DEFAULT: "#4b0082",
          light: "#6a0dad",
        },
        starlight: "#f5f3ff",
        starlightMuted: "#b8b3d1",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      keyframes: {
        "pulse-slow": {
          "0%, 100%": { opacity: "0.7", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        drift: {
          "0%": { transform: "translate(0, 0)" },
          "25%": { transform: "translate(30px, -20px)" },
          "50%": { transform: "translate(-20px, 30px)" },
          "75%": { transform: "translate(20px, 20px)" },
          "100%": { transform: "translate(0, 0)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "bounce-gentle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(6px)" },
        },
        "rotate-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-3px)" },
          "75%": { transform: "translateX(3px)" },
        },
      },
      animation: {
        "pulse-slow": "pulse-slow 5s ease-in-out infinite",
        drift: "drift 30s linear infinite",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        "bounce-gentle": "bounce-gentle 2s ease-in-out infinite",
        "rotate-slow": "rotate-slow 90s linear infinite",
        shake: "shake 0.4s ease-in-out",
      },
    },
  },
  plugins: [],
};

export default config;
