module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",],
  theme: {
    fontFamily: {
      "header": ["Helvetica"],
      "name": ["Arial Black,Arial Bold,Gadget,sans-serif; "]
    },
    screens: {
      'sm': {'max':'640px'},
      // => @media (min-width: 640px) { ... }

      'md': {'max':'1024px'},
      // => @media (min-width: 768px) { ... }

      'lg': {'max':'3000px'},
      // => @media (min-width: 1024px) { ... }

      'xl': {'max':'1280px'},
      // => @media (min-width: 1280px) { ... }

      '2xl': {'max':'1536px'},
      // => @media (min-width: 1536px) { ... }
    },
    backgroundImage: {
      'hero': "url('/home_image.jpg')",
      'footer-texture': "url('/img/footer-texture.png')",
    },
    extend: {},
  },
  plugins: [],
}
