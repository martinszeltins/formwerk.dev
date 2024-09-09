<template>
  <div
    ref="replContainer"
    class="not-content mt-8 flex flex-col space-y-0 overflow-hidden rounded-md"
  >
    <div v-if="tabs.length > 1" class="flex items-center">
      <button
        v-for="(file, key) in files"
        :key="key"
        type="button"
        :hidden="file.hidden"
        class="cursor-pointer rounded-t-md px-3 py-1.5 text-white transition-colors duration-200"
        :class="activeFile === key ? 'bg-zinc-600' : 'bg-zinc-950'"
        @click="activeFile = key"
      >
        {{ key }}
      </button>
    </div>

    <div
      v-for="({ render, hidden }, key) in files"
      :key="key"
      v-show="activeFile === key"
      :data-file-name="key"
      :hidden="hidden"
    >
      <component :is="render" />
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
  markRaw,
  onMounted,
  ref,
  useSlots,
  version,
  type Component,
  type Ref,
} from 'vue';
import { rewriteTypeImports, useVueImportMap } from './Repl/importMap';
import { merge } from 'lodash-es';
import { useStore, type SFCOptions } from './Repl/store';
import Types from '@formwerk/core/dist/core.d.ts?raw';

const Repl = defineAsyncComponent(() => import('./Repl.vue'));

const props = defineProps<{
  hideErrors?: boolean;
  importMaps?: Record<string, string>;
  customCode?: string;
}>();

const replContainer = ref<HTMLElement>();
const replRef = ref<InstanceType<typeof Repl>>();

// use a specific version of Vue
const { importMap, vueVersion } = useVueImportMap({
  vueVersion: version,
});

const store = useStore({
  builtinImportMap: computed(() =>
    merge(importMap.value, {
      imports: {
        vue: `https://unpkg.com/vue@${version}/dist/vue.esm-browser.prod.js`,
        '@formwerk/core': `https://unpkg.com/@formwerk/core@0.1.2/dist/core.esm.js`,
        zod: 'https://unpkg.com/zod@3.23.8/lib/index.mjs',
        '@formwerk/schema-zod':
          'https://unpkg.com/@formwerk/schema-zod@0.1.2/dist/schema-zod.esm.js',
        // '@vueuse/core': 'https://unpkg.com/@vueuse/core?module',
      },
    }),
  ),
  vueVersion,
});

const staticFsFiles: Record<string, string> = {
  'src/formwerk-core-types.d.ts': Types,
};

store.sfcOptions = merge(store.sfcOptions || {}, {
  script: {
    inlineTemplate: import.meta.env.PROD,
    fs: {
      fileExists: (filename) => {
        return filename in staticFsFiles;
      },
      readFile: (filename) => {
        return staticFsFiles[filename];
      },
      realpath: (filename) => {
        return filename;
      },
    },
  },
} as SFCOptions);

store.setFiles({
  'App.vue': `<template>Loading...</template>`,
});

const { files, activeFile, tabs } = useSlotFiles();

onMounted(async () => {
  if (!replContainer.value) {
    return;
  }

  const contents: Record<string, string> = {};
  for (const file in files.value) {
    const fileEl = replContainer.value.querySelector(
      `[data-file-name="${file}"]`,
    ) as HTMLElement | null;
    if (fileEl) {
      const content = rewriteTypeImports(fileEl.textContent || '');
      if (fileEl.hidden) {
        files.value[file].hidden = true;
      }

      contents[file] = content ?? '<template>Failed to load file</template>';
    }
  }

  store.setFiles(contents);
});

function useSlotFiles() {
  const slots = useSlots();
  const slotFiles: Record<string, { render: Component; hidden: boolean }> = {};
  for (const slot in slots) {
    const hidden = slot.startsWith('!');
    const slotName = slot.replace('!', '');

    slotFiles[`${slotName}`] = {
      render: markRaw(defineComponent(() => () => slots[slot]?.())),
      hidden,
    };
  }

  const files: Ref<Record<string, { render: Component; hidden: boolean }>> =
    ref(slotFiles);

  const activeFile = ref(Object.keys(slotFiles)[0]);
  const tabs = computed(() => {
    return Object.keys(files.value)
      .filter((f) => !files.value[f].hidden)
      .map((f) => files.value[f]);
  });

  return { files, tabs, activeFile };
}
</script>
