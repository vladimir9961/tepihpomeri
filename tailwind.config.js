/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#1F1B1B',
        }
      },

      fontSize: {
        '10': '10px',
        '14': '14px',
      },
    },
  },
  plugins: [],
}

