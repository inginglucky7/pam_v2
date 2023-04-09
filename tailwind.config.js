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
        'kiddodropshadow': '5px 5px rgba(159, 112, 39, 1)',
        'kiddodropred': '5px 5px rgba(159, 39, 39, 1)',
        'kiddodropshadowtwo': '5px 5px rgba(251,176,59, 1)',
      },
      colors: {
        kiddogray: "#CFDAD6",
        kiddoyellow: "#fbb03b",
        kiddolightyellow: "#FBBF62",
        kiddobrown: "#9F7027",
        kiddored: "#FB3B3B",
        kiddodarkred: "#9F2727",
        kiddoyellowhover: "rgba(250, 155, 0, 1)",
        kiddoredhover: "rgba(250, 55, 0, 1)",
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