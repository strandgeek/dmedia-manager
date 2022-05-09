module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/**.*.{html,js}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
