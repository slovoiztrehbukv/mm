/** @type {import('tailwindcss').Config} */

// SYNC_TO: src/config/colors.ts
const colors = {
  main: '#fff',
  primary: {},
  secondary: {},
}

const densities = [100, 200, 300, 400, 500, 600, 700, 800, 900]

densities.forEach(density => {
  colors.primary[density] = density < 500 ? '#6d69b4' : '#9d9adc'
  colors.secondary[density] = density < 500 ? '#b0ace2' : '#6d69b4'
});

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors,
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
        '4xl': '0 45px 70px -20px rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [],
  important: false,
}
