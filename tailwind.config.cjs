/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    fontFamily: {
      sans: 
      ['Inter', 'sans-serif']
    },
    extend: {
      colors: {
        volta: {
          cool: '#00fe90',
          warm: '#00a2ff',
          'gray': {
            50: '#CDCDCD',
            100: '#727272',
            200: '#5D5D5D',
            300: '#494949',
            400: '#343434',
            500: '#1D1E1F',
            600: '#1A1B1F',
            700: '#121216',
            800: '#101012',
            900: '#0D0D10'
          }
        }
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ]
}