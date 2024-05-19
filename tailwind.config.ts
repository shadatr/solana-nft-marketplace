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
        primary: "#000000",
        secondary: "#FFFFFF",
        BabyBlue: "#68BBE3",
        BlueGrotto: "#0E86D4",
        Blue:"#055C9D",
        NavyBlue:"#003060"
      },
      fontSize: {
        xxlg: "60px",
        xlg: "48px",
        lg: "32px",
        md: "20px",
        sm:"16px",
        xsm:"12px",
        xxsm:"8px"
      },
    },
  },
  plugins: [],
};
export default config;
