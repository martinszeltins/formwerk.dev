import starlightPlugin from '@astrojs/starlight-tailwind';
import colors from 'tailwindcss/colors';

// Generated color palettes
const accent = {
  200: '#34d399',
  600: '#10b981',
  900: '#065f46',
  950: '#064e3b',
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
        accent,
        gray: colors.zinc,
      },
    },
  },
  plugins: [starlightPlugin()],
};
