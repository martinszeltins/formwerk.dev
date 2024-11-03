<script setup lang="ts">
import { type TextFieldProps, useTextField } from '@formwerk/core';

const props = defineProps<TextFieldProps>();

const { inputProps, labelProps, errorMessage, errorMessageProps } =
  useTextField(props);
</script>

<template>
  <div class="group relative mb-6 w-full max-w-xs">
    <label
      v-bind="labelProps"
      class="mb-1 block whitespace-nowrap text-sm font-semibold text-white"
    >
      {{ label }}
    </label>

    <input
      v-bind="inputProps"
      class="w-full cursor-pointer whitespace-nowrap rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-white transition-all duration-200 placeholder:text-zinc-400 invalid:border-red-500 hover:bg-zinc-900 focus:border-emerald-500 focus:bg-zinc-900 focus:outline-none focus:ring-1 focus:ring-emerald-500 invalid:focus:border-red-500 invalid:focus:ring-red-500"
    />

    <div
      v-if="errorMessage"
      v-bind="errorMessageProps"
      class="absolute left-0 hidden text-sm text-red-500 group-has-[:invalid]:block"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>
