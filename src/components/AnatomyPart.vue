<template>
  <div class="AnatomyPopover" v-bind="$attrs">
    <slot />
  </div>

  <div
    class="AnatomyPopover__popover text-sm font-medium italic text-zinc-400"
    :class="[`is-${direction}`]"
  >
    {{ text }}
  </div>
</template>

<script setup lang="ts">
import { useId } from 'vue';

const { text, position = 'top' } = defineProps<{
  text: string;
  position?:
    | 'center'
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'top right'
    | 'top left'
    | 'bottom right'
    | 'bottom left'
    | 'top span-left'
    | 'top span-right'
    | 'bottom span-left'
    | 'bottom span-right';
}>();

const id = `--${useId()}`;
const direction = position.split(' ')[0];

defineOptions({
  inheritAttrs: false,
});
</script>

<style lang="postcss" scoped>
.AnatomyPopover {
  anchor-name: v-bind(id);
}

.AnatomyPopover__popover {
  @apply absolute inset-0 flex items-center;

  position-anchor: v-bind(id);
  position-area: v-bind(position);
  inset-area: v-bind(position);

  &::after {
    content: '';
    @apply ml-1 block h-px bg-zinc-500;
    order: 1;
    width: 40px;
  }

  &::before {
    content: '';
    @apply block size-1 rounded-full bg-zinc-500;
    order: 2;
  }

  &.is-top,
  &.is-center {
    @apply mb-1 flex-col;

    &::after {
      width: 1px;
      height: 40px;
      @apply ml-0;
    }
  }

  &.is-bottom {
    @apply mt-1 flex-col-reverse;

    &::after {
      width: 1px;
      height: 40px;
      @apply ml-0;
    }
  }

  &.is-right {
    @apply ml-1 flex-row-reverse;

    &::after {
      @apply ml-0 mr-1;
    }
  }

  &.is-left {
    @apply mr-1;
  }

  &.is-center {
    @apply -translate-y-1/2;
  }
}
</style>
