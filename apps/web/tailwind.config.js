/** @type {import('tailwindcss').Config} */
const sharedThemeVars = {
  "--rounded-box": "1rem",
  "--rounded-btn": "0.75rem",
  "--rounded-badge": "9999px",
  "--animation-btn": "0.2s",
  "--animation-input": "0.2s",
  "--btn-focus-scale": "0.97",
  "--border-btn": "1px",
  "--tab-radius": "0.6rem"
};

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "pop-in": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" }
        }
      },
      animation: {
        "fade-up": "fade-up 0.35s cubic-bezier(0.2, 0.8, 0.2, 1) both",
        "pop-in": "pop-in 0.2s cubic-bezier(0.2, 0.8, 0.2, 1) both"
      }
    }
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        hangout: {
          primary: "#7c6cff",
          "primary-content": "#ffffff",
          secondary: "#2dd4bf",
          "secondary-content": "#04201c",
          accent: "#f472b6",
          "accent-content": "#2a0717",
          neutral: "#232637",
          "neutral-content": "#d6d9e6",
          "base-100": "#0d0f17",
          "base-200": "#131622",
          "base-300": "#1a1d2c",
          "base-content": "#e4e6f0",
          info: "#60a5fa",
          success: "#34d399",
          warning: "#fbbf24",
          error: "#f87171",
          ...sharedThemeVars
        }
      },
      {
        "hangout-light": {
          primary: "#6552f5",
          "primary-content": "#ffffff",
          secondary: "#0d9488",
          "secondary-content": "#ffffff",
          accent: "#db2777",
          "accent-content": "#ffffff",
          neutral: "#e7e8f0",
          "neutral-content": "#2b2f42",
          "base-100": "#ffffff",
          "base-200": "#f6f7fb",
          "base-300": "#eceef5",
          "base-content": "#1b1e2e",
          info: "#2563eb",
          success: "#059669",
          "success-content": "#ffffff",
          warning: "#d97706",
          error: "#dc2626",
          "error-content": "#ffffff",
          ...sharedThemeVars
        }
      },
      "dark",
      "forest",
      "coffee",
      "aqua"
    ]
  }
};
