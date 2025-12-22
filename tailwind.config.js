/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        christmas: {
          red: '#C41E3A',
          green: '#0F7F3F',
          gold: '#FFD700',
          silver: '#C0C0C0',
        },
      },
      fontFamily: {
        christmas: ['Mountains of Christmas', 'cursive'],
      },
    },
  },
  plugins: [],
}
