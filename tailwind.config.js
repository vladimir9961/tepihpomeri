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
      }
    },
  },
  plugins: [],
}

