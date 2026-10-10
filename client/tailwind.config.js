/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';
export default {
  content: [
   // "./index.html",
   // "./src/**/*.{js,ts,jsx,tsx}",
    './src/**/*.{js,jsx,ts,tsx}', './public/index.html'
  ],
  theme: {
    extend: {
      darkMode: 'class', 
      colors: {
        primary: "#22c55e",
        secondary: '#334155',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
        

      },
      fontFamily: {
        'sans': ['"Proxima Nova"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}