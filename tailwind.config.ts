import type { Config } from "tailwindcss";
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  darkMode: ["class", '[data-mode="dark"]'],
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Orbitron", ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        cornflower: {
          "50": "#f2fafd",
          "100": "#e4f3fa",
          "200": "#c3e7f4",
          "300": "#92d7ec",
          "400": "#51c0df",
          "500": "#2ba8cc",
          "600": "#1c89ad",
          "700": "#186d8c",
          "800": "#185c74",
          "900": "#194d61",
          "950": "#113140",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
