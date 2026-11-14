/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#090B10',
        darkCard: '#131823',
        darkCardHover: '#1A2130',
        darkBorder: '#232A3B',
        brandCyan: '#079BB5',
        brandGreen: '#16A34A',
        brandSlate: '#475569',
        brandRed: '#DC3545',
        brandPurple: '#7C3AED',
        brandOrange: '#EA8000',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
