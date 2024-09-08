<template>
  <div
    class="not-content mt-8 flex flex-col space-y-0 overflow-hidden rounded-md"
  >
    <div class="flex items-center">
      <button
        v-for="(file, key) in files"
        :key="key"
        type="button"
        class="cursor-pointer rounded-t-md px-3 py-1.5 text-white transition-colors duration-200"
        :class="activeFile === key ? 'bg-zinc-600' : 'bg-zinc-950'"
        @click="activeFile = key"
      >
        {{ key }}
      </button>
    </div>

    <div
      v-show="activeFile === key"
      v-for="(file, key) in files"
      :data-file-name="key"
      :key="key"
    >
      <component :is="file" />
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
import {
  computed,
  defineAsyncComponent,
  defineComponent,
  Fragment,
  h,
  onMounted,
  ref,
  useSlots,
  version,
  type Component,
} from 'vue';
import { useVueImportMap } from './Repl/importMap';
import { merge } from 'lodash-es';
import { useStore } from './Repl/store';
import Types from '@formwerk/core/dist/core.d.ts?raw';

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

const store = useStore({
  typescriptVersion: ref('latest'),
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

const activeFile = ref('App.vue');
const slots = useSlots();

store.setFiles({
  'App.vue': `<template>Loading...</template>`,
});

const files = computed(() => {
  const records: Record<string, Component> = {};
  for (const slot in slots) {
    records[`${slot}`] = defineComponent(() => () => slots[slot]?.());
  }

  return records;
});

onMounted(() => {
  const contents: Record<string, string> = {};
  for (const file in files.value) {
    const fileEl = document.querySelector(`[data-file-name="${file}"]`);
    if (fileEl) {
      contents[file] =
        fileEl.textContent ?? '<template>Failed to load file</template>';
    }
  }

  store.setFiles(contents);
  console.log(contents);
});
</script>
