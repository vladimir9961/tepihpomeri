/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '340px',
      },

      colors: {
        primary: {
          100: '#1F1B1B',
          200: '#444444',
          primaryDarken: '#1F1B1B33'
        },
        

        text:{
          dark: '#505050', 
          gray: '#717171',
        }
      },

      fontSize: {
        '10': '10px',
        '14': '14px',
      },

      boxShadow: {
        'custom': '0px 0px 14px #1F1B1B4D',
      },
    },
  },
  plugins: [],
}

