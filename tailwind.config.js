/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#d94c52',
          dark: '#8b1859',
        },
        secondary: '#FFB800',
        accent: {
          orange: '#FF9F43',
          blue: '#4361EE',
          purple: '#7367F0',
          green: '#28C76F',
          pink: '#EA5455',
          teal: '#00CFE8',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, #d94c52, #8b1859)',
      },
    },
  },
  plugins: [],
};