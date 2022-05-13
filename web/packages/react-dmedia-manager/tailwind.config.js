module.exports = {
  prefix: 'dm-',
  important: true,
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: 'class', // only generate classes
    }),
    require('@tailwindcss/aspect-ratio'),
  ],
}
