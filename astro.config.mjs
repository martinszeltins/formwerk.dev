import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';

import vue from '@astrojs/vue';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import Components from 'unplugin-vue-components/vite';
import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [
      Components({
        resolvers: [
          IconsResolver({
            enabledCollections: ['ph', 'vscode-icons'],
          }),
        ],
      }),
      Icons({
        compiler: 'vue3',
        defaultClass: 'fill-current flex-shrink-0',
      }),
    ],
  },
  integrations: [
    starlight({
      title: 'Docs',
      logo: {
        src: './src/assets/logo.svg',
        alt: 'Formwerk',
        replacesTitle: true,
      },
      expressiveCode: {
        plugins: [pluginCollapsibleSections()],
      },
      social: {
        github: 'https://github.com/formwerkjs/formwerk',
        discord: 'https://discord.gg/gQ7wqpvT5X',
      },
      customCss: ['./src/tailwind.css'],
      sidebar: [
        {
          label: 'Introduction',
          items: [
            'guides/getting-started',
            'guides/why',
            'guides/composables',
            'guides/examples',
          ],
        },
        {
          label: 'Fields',
          autogenerate: { directory: 'guides/fields' },
        },
        {
          label: 'Forms',
          autogenerate: { directory: 'guides/forms' },
        },
        {
          label: 'Extras',
          autogenerate: { directory: 'guides/extras' },
        },
      ],
    }),
    tailwind({
      applyBaseStyles: false,
    }),
    vue(),
  ],
});
