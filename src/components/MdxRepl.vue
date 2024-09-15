<template>
  <div
    ref="replContainer"
    class="not-content mt-8 flex flex-col space-y-0 overflow-hidden rounded-md"
  >
    <div v-if="tabs.length > 1" class="flex items-center">
      <button
        v-for="(tab, idx) in tabs"
        :key="tab.filename"
        type="button"
        :hidden="tab.hidden"
        :aria-selected="activeFile === tab.filename"
        :class="{
          'border-r': idx === tabs.length - 1,
        }"
        class="group relative flex cursor-pointer items-center gap-1 rounded-t-lg border-l border-t border-zinc-700 bg-zinc-950 px-3 py-1.5 text-sm text-zinc-500 transition-colors duration-200 aria-selected:bg-zinc-800 aria-selected:text-white"
        @click="activeFile = tab.filename"
      >
        <component v-if="tab.icon" :is="tab.icon" class="size-4" />
        {{ tab.filename }}

        <div
          class="absolute bottom-0 left-px right-0 z-10 hidden h-0.5 translate-y-px bg-zinc-800 group-aria-selected:block"
        ></div>
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
import { version as fwVersion } from '@formwerk/core';
import VueIcon from '~icons/vscode-icons/file-type-vue';
import TsIcon from '~icons/vscode-icons/file-type-typescript';
import CssIcon from '~icons/vscode-icons/file-type-css';

const Repl = defineAsyncComponent(() => import('./Repl.vue'));

const props = defineProps<{
  hideErrors?: boolean;
  importMaps?: Record<string, string>;
  customCode?: string;
  activeFile?: string;
}>();

const fileIcons: Record<string, Component> = {
  vue: markRaw(VueIcon),
  ts: markRaw(TsIcon),
  css: markRaw(CssIcon),
};

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
        '@formwerk/core': `https://unpkg.com/@formwerk/core@${fwVersion}/dist/core.esm.js`,
        zod: 'https://unpkg.com/zod@3.23.8/lib/index.mjs',
        '@formwerk/schema-zod': `https://unpkg.com/@formwerk/schema-zod@${fwVersion}/dist/schema-zod.esm.js`,
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

  const tabs = computed(() => {
    return Object.keys(files.value)
      .filter((f) => !files.value[f].hidden)
      .map((f) => {
        const ext = f.split('.').pop();
        const icon = ext ? fileIcons[ext] : null;

        return {
          ...files.value[f],
          filename: f,
          icon,
        };
      })
      .sort((a, b) => {
        if (a.filename === 'App.vue' && b.filename !== 'App.vue') {
          return 1;
        }

        if (a.filename !== 'App.vue' && b.filename === 'App.vue') {
          return -1;
        }

        return 0;
      });
  });

  const activeFile = ref(
    props.activeFile || tabs.value[0]?.filename || Object.keys(slotFiles)[0],
  );

  return { files, tabs, activeFile };
}
</script>
