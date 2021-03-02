const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./pages/**/*.js", "./components/**/*.js"],
  theme: {
    extend: {
      colors: {
        orange: colors.orange,
      },
    },
    darkMode: "media",
  },
  variants: {},
  plugins: [],
};
