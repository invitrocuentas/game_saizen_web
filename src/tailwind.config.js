/** @type {import('tailwindcss').Config} */
module.exports = {
  //   content: ["../**/*.{php,html,js}"],
  content: ["../**/*.{html,js}"],
  theme: {
    extend: {
      // screens: {
      //   desktop: "1500px",
      //   // => @media (min-width: 1500px) { ... }
      // },
      // gridTemplateColumns: {
      //   fluid: "repeat(auto-fit, minmax(420px, 1fr))",
      // },
      fontFamily: {
        "avenir_book": ["Avenir Book", "sans-serif"],
        "boldenvan": ["Boldenvan", "sans-serif"],
        "boogaloo_regular": ["Boogaloo Regular", "sans-serif"],
      },
      colors: {
        // "text-primary": "#313131",
        // "white-50": "#FFFFFFEA",
        // "white-100": "#FFFFFF00",
        // "white-150": "#FFFFFF",
        // "gray-50": "#F2F2F2",
        // "gray-100": "#00000029",
        // "gray-150": "#10234859",
        // "gray-200": "#8E8E8E",
        // black: "#000000",
        // yellow: "#FFF026",
        // blue: "#1F4690",
        // "celeste-50": "#0097B27D",
        // "celeste-100": "#0097B2",
        'bg-blue-loader': "#03A4BE"
      },
      // boxShadow: {
      //   custom: "0 3px 6px #00000029",
      //   "custom-left-shadow": "-23px 23px 6px #0097B2",
      // },
    },
  },
  plugins: [],
};
