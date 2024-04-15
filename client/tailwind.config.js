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
          customGreen: '#00d4ff', // Custom website color
        },
    },
  },
  plugins: [require("flowbite/plugin")],
}