/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'difficulty-easy': '#00b8a3',
        'difficulty-medium': '#ffc01e',
        'difficulty-hard': '#ff375f',
      },
    },
  },
  plugins: [],
} 