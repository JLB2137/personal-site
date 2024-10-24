module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",],
  theme: {
    fontFamily: {
      "header": ["Helvetica"],
      "name": ["Arial Black, Arial Bold MT"],
      "oswald": ['Oswald']
    },
    fontSize: {
      'xxs': '.5rem',
      'xs': '.75rem',
      'sm': '.875rem',
      'tiny': '.875rem',
      'base': '1rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem',
    },
    screens: {
      'sm': {'min': '300px', 'max': '600px'},
      // => @media (min-width: 640px and max-width: 767px) { ... }

      'md': {'min': '600px', 'max': '900px'},
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      'lg': {'min': '901px', 'max': '3000px'},
      // => @media (min-width: 1024px and max-width: 1279px) { ... }

      'xl': {'min': '1280px', 'max': '1535px'},
      // => @media (min-width: 1280px and max-width: 1535px) { ... }

      '2xl': {'min': '1536px'},
      // => @media (min-width: 1536px) { ... }

      'tall': {'raw': '(min-height: 800px'},
    },
    backgroundImage: {
      'hero': "url('/home_image.jpg')",
    },
    extend: {
        keyframes: {
          shake: {
            '0%, 100%': { transform: 'translateX(0)' },
            '25%': { transform: 'translateX(-3px)' },
            '50%': { transform: 'translateX(3px)' },
            '75%': { transform: 'translateX(-3px)' },
          },
          slide: {
            '0%, 100%': { transform: 'translateX(0)' },
            '50%': { transform: 'translateX(20px)' },
          },
          lift: {
            '0%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-10px)' },
            '100%': { transform: 'translateY(0)' },
          }
        },
        animation: {
          slide: 'slide 0.5s ease-in-out',
          shake: 'shake 0.5s ease-in-out',
          lift: 'lift 0.5s ease-in-out',
        }
    }
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-outline-black': {
          textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
        }
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    }
  ],
  // tailwind.config.js

}
