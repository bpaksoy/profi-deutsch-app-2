// web/tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class', // Keep this for dark mode support
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}', // Catches all files under src/
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#008073",
        "accent": "#FFDF0C",
        "audio" : "#238CE8", // Not in use yet, can be added
        "background-light": "#F5F7FA",
        "background-dark": "#101922",
        "text-light": "#333333",
        "text-dark": "#F5F7FA",
        "card-light": "#FFFFFF",
        "card-dark": "#192734",
        "border-light": "#e7edf3",
        "border-dark": "#334155"
      },
      fontFamily: {
        "display": ["Zain", "sans-serif"],
        "sans": ["Zain", "sans-serif"]
      },
      borderRadius: { // <--- These were in the original HTML
        "DEFAULT": "0.5rem",
        "lg": "0.75rem",
        "xl": "1rem",
        "full": "9999px"
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ],
}
export default config