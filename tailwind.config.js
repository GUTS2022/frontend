/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{ts,tsx,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'special-red': '#2C0800',
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      }, animation: {
        type: 'type 2.7s ease-out .8s infinite alternate both',
      },
      keyframes: {
        type: {
          '0%': { transform: 'translateX(0ch)' },
          '5%, 10%': { transform: 'translateX(1ch)' },
          '10%, 25%': { transform: 'translateX(2ch)' },
          '15%, 20%': { transform: 'translateX(3ch)' },
          '20%, 25%': { transform: 'translateX(4ch)' },
          '25%, 30%': { transform: 'translateX(5ch)' },
          '30%, 35%': { transform: 'translateX(6ch)' },
          '35%, 40%': { transform: 'translateX(7ch)' },
          '45%, 50%': { transform: 'translateX(8ch)' },
          '50%, 55%': { transform: 'translateX(9ch)' },
          '55%, 60%': { transform: 'translateX(10ch)' },
          '65%, 70%': { transform: 'translateX(11ch)' },
          '75%, 100%': { transform: 'translateX(12ch)' },
        },
      },
    },
  },
  plugins: [],
}
