/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // backdropBlur: {
      //   lg: '10px', // or any value you prefer
      // },
    },
  },
  plugins: [],
}