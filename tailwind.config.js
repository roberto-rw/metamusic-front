/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.{html,js}', './assets/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        darkfont: '#1E1E1E',
        smoke: '#DADADA',
        dblue: '#1B263B',
      }
    }
  },
  plugins: [],
}