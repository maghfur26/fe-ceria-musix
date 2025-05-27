/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'], 
      },
      aspectRatio: {
        '3/4': '3/4',
      },
      screens: {
        iphonexr18: '414px',
        iphone12: '390px',
        iphone14plus: '428px',
        tablets7portrait: '800px',
        zflip3portrait: '360px',
        ipadairportrait: '820px',
        ipadProPortrait: '834px',
        ipadMiniPortrait: '744px',
        iphone11pro: '896px'
      }
    },
  },
  plugins: [],
}

