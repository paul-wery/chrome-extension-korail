// This file is only used for autocomplete purpose
// See twind.config.js for the actual config
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './src/**/*.tsx',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      serif: ['serif'],
      heading: [
        'var(--font-family-heading)',
        'Inter',
        'SF Pro Text',
        'system-ui',
      ],
      sans: ['var(--font-family-sans)'],
      monospace: [`SF Mono`, `ui-monospace`, `Monaco`, 'Monospace'],
    },
    extend: {
      colors: {
        primary: {
          ...colors.sky,
          contrast: '#fff',
        },
        black: {
          50: '#525252',
          100: '#424242',
          200: '#363636',
          300: '#282828',
          400: '#222',
          500: '#141414',
          600: '#0a0a0a',
          700: '#000',
        },
      },
    },
  },
  plugins: [require('daisyui')],
};
