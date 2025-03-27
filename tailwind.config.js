const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{html,js,ts}"],
  darkMode: "class",
  theme: {
    extend: {
      important: true,
      screens: {
        xs: "560px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      fontFamily: {
        title: ["Sofia Sans, sans-serif"],
        text: ["Nunito Sans, sans-serif"],
        material: ["Material Icons"],
      },
      colors: {
        primary: "#025373",
        accent: "#34aad9",
        orange: "#f08800",
        title: "#191919",
        text: "#252F4A",
        body: "#f5f6f8",
        border: "#f1f1f2",
        container: "#020024",
        "dark-primary": "#111315",
        "dark-white": "#111315",
        "dark-text": "#898989",
        "dark-body": "#1a1d1f",
        "dark-container": "#272b30",
        "dark-border": "#37373a",
        "dark-panel": "#3d4145",

        "accent-600": '#2a8bb7',
        "gray-logo": "#7E8082",

        default: "#eeeeee",
        overlay: "rgba(0, 0, 0, 0.5)",
      },
      boxShadow: {
        outer: "2px 6px 12px rgba(0, 0, 0, 0.5)",
      },
      backgroundImage: {
        auth: "url('src/assets/img/auth.png')",
        'gradient-primary': 'linear-gradient(to right, #025373, #34aad9)',
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        ".transition-3s": {
          transition: "width .3s",
        },
        ".border-left": {
          "border-left": "3px solid #267C99",
        },
        ".flex-center": {
          display: "flex",
          "align-items": "center",
        },
        ".flex-between": {
          display: "flex",
          "justify-content": "space-between",
          "align-items": "center",
        },
      });
    }),
  ],
  important: true,
};
