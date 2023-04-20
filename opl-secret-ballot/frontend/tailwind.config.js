/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#71bacf',
        secondary: '#e8a144',
      },
    },
  },
  plugins: [],
};
