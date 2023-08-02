/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        light: "#f5f5f5",
        dark: "#1b1b1b",
        textLight: "#7f7f7f",
        titleLight: "#666666",
        textDark: "#C2C2C2",
        titleDark: "#E0E0E0",
      },
      animation: {
        'spin-3s': 'spin 3s linear infinite',
        'spin-5s': 'spin 5s linear infinite',
      },
      fontFamily: {
        open: ['Open Sans', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'img': '0 0 16px rgb(0, 0, 0, 0.5)',
        'imgDark': '0 0 10px rgba(255, 255, 255, 0.5)',
      },
      screens: {
        'xs': '0px',
        'sm': '650px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
      }
    },
  },
  plugins: [],
}

