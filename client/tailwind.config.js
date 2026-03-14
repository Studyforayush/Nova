/** @type {import('tailwindcss').Config} */
// import keepPreset from "keep-react/src/keep-preset.js";
// const withMT = require("@material-tailwind/react/utils/withMT");

export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/preline/dist/*.js',
    './src/**/*.{html,js}',
    './components/**/*.{html,js}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    "node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
