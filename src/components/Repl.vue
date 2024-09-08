<script setup lang="ts">
import { provide, ref, toRefs } from 'vue';
import Preview from './Repl/Preview.vue';
import { useStore } from './Repl/store';
import { injectKeyProps, type Props } from './Repl/types';

const props = withDefaults(defineProps<Props>(), {
  theme: 'light',
  previewTheme: false,
  store: () => useStore(),
  autoResize: true,
  autoSave: true,
  showCompileOutput: true,
  showImportMap: true,
  showTsConfig: true,
  clearConsole: false,
  layoutReverse: false,
  ssr: false,
  layout: 'horizontal',
  previewOptions: () => ({}),
  editorOptions: () => ({}),
});

const containerRef = ref<HTMLElement>();
const previewRef = ref<InstanceType<typeof Preview>>();

provide(injectKeyProps, toRefs(props));

function reload() {
  previewRef.value?.reload();
}

defineExpose({ reload, previewRef });
</script>

<template>
  <div class="relative flex h-full flex-col overflow-hidden" ref="containerRef">
    <Preview :ssr="false" :show="true" />
    <!-- <Repl
      ref="replRef"
      :store="store"
      :editor="{}"
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
      :class="{
        'no-files': files.length <= 1,
        'is-fullscreen': isFullscreen,
        'no-errors': hideErrors,
      }"
    /> -->

    <!-- <button
      @click="reload"
      class="bg-zinc-600 w-8 h-8 flex items-center justify-center absolute bottom-2.5 right-2.5 rounded-full"
    >
      <svg
        class="w-5 h-5"
        data-slot="icon"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          clip-rule="evenodd"
          fill-rule="evenodd"
          d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z"
        ></path>
      </svg>
    </button> -->
  </div>
</template>
