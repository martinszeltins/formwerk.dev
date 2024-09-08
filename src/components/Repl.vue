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

const previewRef = ref<InstanceType<typeof Preview>>();

provide(injectKeyProps, toRefs(props));

function reload() {
  previewRef.value?.reload();
}

defineExpose({ reload, previewRef });
</script>

<template>
  <Preview :ssr="false" :show="true" />
</template>
