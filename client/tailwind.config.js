/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
        colors: {
          customGreen: 'rgb(14 116 144)', // Custom website color
        },
    },
  },
  plugins: [require("flowbite/plugin")],
}