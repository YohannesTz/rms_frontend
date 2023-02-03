const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        blue: colors.cyan,
        red: colors.rose,
      }
    },
    fontSize: {
      '2xl': ['1.5rem', {
        lineHeight: '2rem',
        letterSpacing: '-0.01em',
        fontWeight: '500',
      }],
      '3xl': ['1.875rem', {
        lineHeight: '2.25rem',
        letterSpacing: '-0.02em',
        fontWeight: '700',
      }],
      '4xl': ['2rem', {
        lineHeight: '2.50rem',
        letterSpacing: '-0.03em',
        fontWeight: '900',
      }],
      '5xl': ['3.5rem', {
        lineHeight: '3.5rem',
        letterSpacing: '-0.05em',
        fontWeight: '400',
      }]
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('@tailwindcss/line-clamp')
  ],
}
