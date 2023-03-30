/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    fontSize: {
      sm: '0.8rem',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
    },
    extend: {
      dropShadow: {
        'kiddodropshadow': '5px 5px rgba(159, 112, 39, 1)'
      },
      colors: {
        kiddobg: "#CFDAD6",
        kiddoyellow: "#fbb03b",
        kiddoyellowhover: "rgba(251, 156, 0, 1)"
      },
    },
    screens: {
      xs: "10px",
      sm: "400px",
      md: "800px",
      lg: "1200px",
      xl: "1500px"
    },
  },
  plugins: [],
};