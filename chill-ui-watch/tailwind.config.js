/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,ts,tsx}', './src/**/*.{js,ts,tsx}'],

  plugins: [],
  // eslint-disable-next-line global-require
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // Couleurs principales
        accent: '#B399FF', // Lavande pastel
        primary: '#7DD3FC', // Bleu ciel doux
        secondary: '#CBD2D9', // Gris bleuté léger

        // Couleurs d'état
        error: '#FCA5A5', // Rouge saumon léger
        info: '#6EE7B7', // Turquoise clair
        success: '#86EFAC', // Vert menthe doux
        warning: '#FCD34D', // Jaune pâle

        // Neutres
        dark: '#323F4B', // Gris ardoise foncé
        light: '#F5F7FA', // Blanc bleuté très clair
      },
      textColor: {
        primary: '#000',
      },
    },
  },
};
