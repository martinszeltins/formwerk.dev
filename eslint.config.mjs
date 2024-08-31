import eslintPluginAstro from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import eslint from '@eslint/js';

export default tseslint.config(
  eslint.configs.recommended,
  ...eslintPluginAstro.configs['flat/recommended'],
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
    },
  },
  {
    files: ['packages/playground/postcss.config.js'],
    languageOptions: {
      sourceType: 'commonjs',
    },
  },
);
