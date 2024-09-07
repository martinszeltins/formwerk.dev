import starlightPlugin from '@astrojs/starlight-tailwind';
import colors from 'tailwindcss/colors';

const chateauGreen = {
  50: '#ecfdf3',
  100: '#d0fbdf',
  200: '#a5f5c5',
  300: '#6ce9a7',
  400: '#31d683',
  500: '#0dbc6a',
  600: '#029754',
  700: '#027a47',
  800: '#04613a',
  900: '#054f32',
  950: '#012d1c',
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        aztec: {
          50: '#f5f8f7',
          100: '#dee9e5',
          200: '#bdd2cc',
          300: '#95b3ab',
          400: '#6e938a',
          500: '#547870',
          600: '#425f59',
          700: '#374e4a',
          800: '#2f403d',
          900: '#2a3735',
          950: '#121a19',
        },
        accent: chateauGreen,
        gray: colors.zinc,
      },
    },
  },
  plugins: [starlightPlugin()],
};
