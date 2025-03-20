const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{html,js,ts}"],
  darkMode: "class",
  theme: {
    extend: {
      important: true,
      screens: {
        max: { max: "768px" },
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
        "dark-primary": "#1a2035",
        "dark-container": "#202940",
        "dark-body": "#171c2f",
        "dark-text": "#8b92a9",
        default: "#eeeeee",
        overlay: "rgba(0, 0, 0, 0.5)",
      },
      boxShadow: {
        outer: "2px 6px 12px rgba(0, 0, 0, 0.5)",
      },
      backgroundImage: {
        auth: "url('src/assets/img/auth.png')",
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
