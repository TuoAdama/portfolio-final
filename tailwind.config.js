/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {

    },
    fontFamily: {
      sans: ['Geist', 'Inter', ...defaultTheme.fontFamily.sans],
      mono : ['GeistMono', 'fira-code', ...defaultTheme.fontFamily.mono],
    },
    keyframes: {
      loop: {
        to: {
          "offset-distance": "100%",
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

