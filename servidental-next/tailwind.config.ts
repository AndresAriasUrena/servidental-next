import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        servi_green: "#037971",
        servi_dark: "#256c68",
      },
      backgroundImage: {
       "hero_bg": "url('../assets/images/herobg.png')",
      }
    },
  },
  plugins: [],
};
export default config;
