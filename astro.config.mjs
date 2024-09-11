import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';

import vue from '@astrojs/vue';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import Components from 'unplugin-vue-components/vite';

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
      title: 'My Docs',
      social: {
        github: 'https://github.com/withastro/starlight',
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
