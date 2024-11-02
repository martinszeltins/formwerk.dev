<template>
  <div v-bind="groupProps" class="">
    <p
      v-bind="labelProps"
      class="sticky top-0 select-none bg-gradient-to-r from-zinc-700 to-zinc-900 px-2 py-1 font-medium text-white"
    >
      {{ label }}
    </p>

    <div class="flex flex-col gap-0.5 px-1 py-1">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { type OptionGroupProps, useOptionGroup } from '@formwerk/core';

interface TheProps extends OptionGroupProps {
  label: string;
}

const props = defineProps<TheProps>();

const { labelProps, groupProps } = useOptionGroup(props);
</script>
