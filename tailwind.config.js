/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily:{
        rubik: ['Rubik-Regular', 'sans-serif'],
        "rubik-bold" : ['Rubik-Bold', 'sans-serif'],
        "rubik-extrabold" : ['Rubik-ExtraBold', 'sans-serif'],
        "rubik-midium" : ['Rubik-Midium', 'sans-serif'],
        "rubik-semibold" : ['Rubik-SemiBold', 'sans-serif'],
        "rubik-light" : ['Rubik-Light', 'sans-serif'],
      },
      colors: {
        "primary" : {
          100 : '#960018',
          200:'#800020',
          300:'#BA0021',
        },
        accent :{
          100: '#FBFBFD'
        },
        black: {
          DEFAULT : '#000000',
          100:'#666876',
          200:'#191d31',
        }
      }
    },
  },
  plugins: [],
}
