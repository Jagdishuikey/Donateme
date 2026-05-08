import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#17211c",
        moss: "#31533f",
        leaf: "#5c8f5b",
        mint: "#dff3e5",
        sun: "#f3c766",
        coral: "#e66d57",
        cloud: "#f7f3ea",
        river: "#3f7f8c"
      },
      boxShadow: {
        soft: "0 22px 70px rgba(23, 33, 28, 0.12)",
        line: "inset 0 0 0 1px rgba(23, 33, 28, 0.1)"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-space)", "ui-sans-serif", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
