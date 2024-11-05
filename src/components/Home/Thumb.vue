<template>
  <div
    v-bind="thumbProps"
    class="h-4 w-4 rounded-full bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-600 focus:outline-none active:bg-emerald-600 active:outline-none"
  >
    <div
      class="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[50%] rounded-md bg-emerald-600 p-1.5 text-xs text-white group-focus:block group-active:block"
    >
      {{ currentValue }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSliderThumb, type SliderThumbProps } from '@formwerk/core';

const props = defineProps<SliderThumbProps>();

const { thumbProps, currentValue } = useSliderThumb(props);
</script>
