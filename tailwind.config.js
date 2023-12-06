/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.{html,js}', './assets/**/*.{html,js}', './pages/*.{html,js}'],
  theme: {
    extend: {
      cursor: {
        grabbing: 'grabbing',
      },
      keyframes: {
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeOutRight: {
          '0%': { opacity: '1', transform: 'translateX(0)' },
          '100%': { opacity: '0', transform: 'translateX(50px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.25s ease-in-out',
        fadeOut: 'fadeOut 0.3s ease-in-out',
        fadeInRight: 'fadeInRight 0.5s forwards',
        fadeOutRight: 'fadeOutRight 0.5s forwards',
      },
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
  variants: {
    extend: {
      cursor: ['active'],
    },
  },
  plugins: [
  ],
}