/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        shine: "shine 1.5s ease-out infinite",
      },
      keyframes: {
        shine: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      colors: {
        primary: {
            light: '#f5f5f5', // Light gray for light mode
          dark: '#1f2937', // Dark mode primary color
        },
        secondary: {
          light: '#4B5563', // New light mode secondary color (light blue-gray)
          dark: '#1a202c',  // New dark mode secondary color (darker slate gray)
        },
        blueButton: {
          DEFAULT: '#1E40AF', // Default blue button color
          hover: '#1D4ED8',   // Hover state
          active: '#1E3A8A',  // Active state
        },
      },
    },
  },
  darkMode: 'class', // Enable dark mode using the 'dark' class
  plugins: [],
};
