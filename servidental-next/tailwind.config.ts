import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        '4xl': '1800px',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        servi_green: "#037971",
        servi_dark: "#256c68",
        servi_light: "#f3feff",
      },
      backgroundImage: {
       "hero_bg": "url('../assets/images/herobg.avif')",
       "contacto_bg": "url('../assets/images/contactobg.avif')",
       "nosotros_bg": "url('../assets/images/nosotrosbg.avif')",
       "servicios_bg": "url('../assets/images/serviciobg.avif')",
        "services_gradient": `linear-gradient(
          180deg,
          #FFFFFF 0%,
          #CFFFF4 35%,
          #C1F7FC 80%,
          #FFFFFF 100%
        )`,
      }
    },
  },
  plugins: [],
};
export default config;
