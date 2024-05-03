/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'light-img': "url('/assets/bg-light.png')",
        'dark-img': "url('/assets/bg-dark.png')",
      }
    },
  },
  plugins: [],
}