const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./pages/**/*.js", "./components/**/*.js"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        orange: colors.orange,
      },
    },
  },
  variants: {},
  plugins: [],
};
