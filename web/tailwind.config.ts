import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: "class", // Enable dark mode
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#005A9C", // Darker blue for professional feel
        "accent": "#FFC107", // A warm yellow for accents/highlights
        "background-light": "#F8F9FA", // Light background
        "background-dark": "#101922", // Dark background
        "text-light": "#212529", // Dark text on light backgrounds
        "text-dark": "#E9ECEF", // Light text on dark backgrounds
        "card-light": "#FFFFFF", // White cards
        "card-dark": "#192734", // Dark cards
        "border-light": "#E0E0E0", // Light border
        "border-dark": "#343A40", // Dark border
        "ai-bubble-light": "#E0E7F1", // Light blue bubble for AI
        "ai-bubble-dark": "#2C3E50"   // Darker blue bubble for AI
      },
      fontFamily: {
        "display": ["Manrope", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.5rem",
        "lg": "0.75rem",
        "xl": "1rem",
        "full": "9999px"
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
};
export default config;