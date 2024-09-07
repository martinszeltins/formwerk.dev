<template>
  <div class="mt-8 flex flex-col space-y-0 overflow-hidden rounded-md">
    <div ref="contentEl">
      <slot />
    </div>

    <Repl
      ref="replRef"
      :store="store"
      :show-ts-config="false"
      :showCompileOutput="false"
      :ssr="false"
      :showImportMap="false"
      :preview-options="
        customCode
          ? {
              customCode: {
                useCode: customCode,
              },
            }
          : undefined
      "
    />
  </div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, onMounted, ref, version } from 'vue';
import { useVueImportMap } from './Repl/importMap';
import { merge } from 'lodash-es';
import { useStore } from './Repl/store';

const Repl = defineAsyncComponent(() => import('./Repl.vue'));

const props = defineProps<{
  hideErrors?: boolean;
  importMaps?: Record<string, string>;
  customCode?: string;
}>();

const contentEl = ref<HTMLDivElement>();
const replRef = ref<InstanceType<typeof Repl>>();

// use a specific version of Vue
const { importMap, vueVersion } = useVueImportMap({
  vueVersion: version,
});

const files = {
  'App.vue': contentEl.value?.innerText || `<template>Hello</template>`,
};

const store = useStore({
  builtinImportMap: computed(() =>
    merge(importMap.value, {
      imports: {
        vue: `https://unpkg.com/vue@${version}/dist/vue.esm-browser.prod.js`,
        '@formwerk/core': `https://unpkg.com/@formwerk/core@0.1.2/dist/core.esm.js`,
        // '@vueuse/core': 'https://unpkg.com/@vueuse/core?module',
      },
    }),
  ),
  vueVersion,
});

store.setFiles(files, 'App.vue');

onMounted(() => {
  const files = {
    'App.vue': contentEl.value?.innerText || `<template>WTF</template>`,
  };

  store.setFiles(files);
});
</script>
