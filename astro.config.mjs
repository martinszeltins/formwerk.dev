import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'My Docs',
			social: {
				github: 'https://github.com/withastro/starlight',
			},
			sidebar: [
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Example Guide', slug: 'guides/example' },
						{ label: 'Checkboxes', slug: 'guides/checkboxes' },
						{ label: 'Form Groups', slug: 'guides/form-groups' },
						{ label: 'Number Fields', slug: 'guides/number-fields' },
						{ label: 'Radio Buttons', slug: 'guides/radios' },
						{ label: 'Selects', slug: 'guides/selects' },
						{ label: 'Text Fields', slug: 'guides/text-fields' },
						{ label: 'Switches', slug: 'guides/switches' },
						{ label: 'Sliders', slug: 'guides/sliders' },
					],
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
		}),
	],
});
