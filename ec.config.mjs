import { defineEcConfig } from 'astro-expressive-code';
import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections';

export default defineEcConfig({
  theme: ['houston'],
  useDarkModeMediaQuery: false,
  plugins: [pluginCollapsibleSections()],
});
