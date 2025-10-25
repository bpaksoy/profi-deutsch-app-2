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
        "primary": "#003366",
        "accent": "#FFCC00",
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
        "display": ["Manrope", "sans-serif"] // <--- Important for your font-display class
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