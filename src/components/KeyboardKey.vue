<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  code: string;
  label?: string;
}>();

function keyboardSymbol(key: string, os = 'mac') {
  const baseFormats = {
    CapsLock: '⇪',
    Shift: '⇧',
    ArrowUp: '↑',
    ArrowRight: '→',
    ArrowDown: '↓',
    ArrowLeft: '←',
    Enter: '↩',
    Backspace: '⌫',
    Delete: '⌦',
    Escape: 'Esc',
    Tab: '⇥',
    PageUp: '⇞',
    PageDown: '⇟',
    Space: '⎵',
  };

  const macFormats = {
    control: '⌃',
    alt: '⌥',
    option: '⌥',
    meta: '⌘',
    super: '⌘',
    cmd: '⌘',
    command: '⌘',
  };

  const winFormats = {
    control: 'ctrl',
    option: 'alt',
    meta: '❖',
    super: '❖',
    cmd: '❖',
    command: '❖',
  };

  const formats: Record<string, string> =
    os === 'mac'
      ? { ...baseFormats, ...macFormats }
      : { ...baseFormats, ...winFormats };

  return formats[key];
}

const key = computed(() => {
  const sym = keyboardSymbol(props.code);

  return {
    exists: !!sym,
    text: sym || props.code,
  };
});
</script>

<template>
  <span class="kbd">
    <kbd class="key-part" :class="key.exists ? 'key-sym' : 'key-text'">
      {{ key.text }}
    </kbd>

    <span v-if="label && key.exists" class="key-part key-text">
      {{ label }}
    </span>

    <div class="notch"></div>
  </span>
</template>

<style lang="postcss" scoped>
.kbd {
  @apply relative box-border inline-flex h-7 select-none items-center gap-1 overflow-hidden rounded-md border border-gray-500 bg-gray-800 px-2 pb-0.5 text-center align-baseline capitalize leading-none transition-colors duration-100;

  .key-part {
    @apply leading-none transition-transform duration-100;
  }

  .key-sym {
    @apply font-mono text-lg;
  }

  .key-text {
    @apply whitespace-nowrap text-[13px] font-medium;
  }

  .notch {
    @apply absolute inset-x-0 bottom-0 h-0.5 bg-gray-500 transition-transform duration-100;
  }

  &:active {
    @apply border-gray-600;

    .key-part {
      @apply translate-y-px;
    }

    .notch {
      @apply scale-y-0;
    }
  }
}
</style>
