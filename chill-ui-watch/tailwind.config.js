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
        error: '#FF0000', // Rouge pour les erreurs
        info: '#6EE7B7', // Turquoise clair
        success: '#86EFAC', // Vert menthe doux
        warning: '#FCD34D', // Jaune pâle

        // Neutres
        dark: '#323F4B', // Gris ardoise foncé
        light: '#F5F7FA', // Blanc bleuté très clair
      },
      fontFamily: {
        primary_bold_font: ['primary_bold_font'],
        primary_extra_bold_font: ['primary_extra_bold_font'],
        primary_extra_light_font: ['primary_extra_light_font'],
        primary_italic_font: ['primary_italic_font'],
        primary_light_font: ['primary_light_font'],
        primary_medium_font: ['primary_medium_font'],
        primary_regular_font: ['primary_regular_font'],
        primary_semi_bold_font: ['primary_semi_bold_font'],
        primary_thin_font: ['primary_thin_font'],
        secondary_bold_font: ['secondary_bold_font'],
        secondary_extra_bold_font: ['secondary_extra_bold_font'],
        secondary_extra_light_font: ['secondary_extra_light_font'],
        secondary_italic_font: ['secondary_italic_font'],
        secondary_light_font: ['secondary_light_font'],
        secondary_medium_font: ['secondary_medium_font'],
        secondary_regular_font: ['secondary_regular_font'],
        secondary_semi_bold_font: ['secondary_semi_bold_font'],
        secondary_thin_font: ['secondary_thin_font'],
        tertiary_bold_font: ['tertiary_bold_font'],
        tertiary_extra_bold_font: ['tertiary_extra_bold_font'],
        tertiary_extra_light_font: ['tertiary_extra_light_font'],
        tertiary_italic_font: ['tertiary_italic_font'],
        tertiary_light_font: ['tertiary_light_font'],
        tertiary_medium_font: ['tertiary_medium_font'],
        tertiary_regular_font: ['tertiary_regular_font'],
        tertiary_semi_bold_font: ['tertiary_semi_bold_font'],
        tertiary_thin_font: ['tertiary_thin_font'],
      },
      textColor: {
        primary: '#000',
      },
    },
  },
};
