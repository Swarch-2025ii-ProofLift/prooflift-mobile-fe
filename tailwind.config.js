/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./index.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  // Use class-based dark mode so we can control it from JS (StyleSheet.setFlag('darkMode', 'class'))
  theme: {
    extend: {
        fontFamily: {
          karla: ["Karla", "system-ui", "sans-serif"],               // default regular
          "karla-medium": ["Karla-Medium", "Karla", "sans-serif"],
          "karla-semibold": ["Karla-SemiBold", "Karla", "sans-serif"],
          "karla-bold": ["Karla-Bold", "Karla", "sans-serif"],
        },
        colors: {
          primary: "#00DA78",
          secondary: "#FFFFFF",
          tertiary: "#303030",
          background: "#191919",
          backgroundSecondary: "#0f2319",
      },
    },
  },
  plugins: [],
}