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
        accent: chateauGreen,
        gray: colors.zinc,
      },
    },
  },
  plugins: [starlightPlugin()],
};
