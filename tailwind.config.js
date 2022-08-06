/** @type {import('tailwindcss').Config} */

const colors = {
  main: '#fff',
  primary: {},
  secondary: {},
}

const densities = [100, 200, 300, 400, 500, 600, 700, 800, 900]

densities.forEach(density => {
  colors.primary[density] = density < 500 ? '#d88bcf' : '#d950c9'
  colors.secondary[density] = density < 500 ? '#9c4692' : '#9c4692'
});

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors
    },
  },
  plugins: [],
}