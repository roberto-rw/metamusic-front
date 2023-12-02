/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.{html,js}', './assets/**/*.{html,js}', './pages/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        darkfont: '#1E1E1E',
        smoke: '#DADADA',
        dblue: '#1B263B',
        mblack: '#1DB954',
        mgray: '#282828',
        darkbg: '#070707',
        playerbg: '#0A0A0A',
      }
    }
  },
  plugins: [
  ],
}