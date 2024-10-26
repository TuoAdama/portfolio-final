/** @type {import('tailwindcss').Config} */

import defaultTheme from "tailwindcss/defaultTheme";
import themer from "@tailus/themer";

module.exports = {
  content: [
    "./src/**/*.{html,js}",
  ],
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
    themer({
      palette: {
        extend : "nature"
      },
      radius: "smoothest",
      background: "light",
      border: "light",
      padding:"large",
      components: {
        button: {
          rounded : "2xl"
        }
      }
    })
  ],
}

