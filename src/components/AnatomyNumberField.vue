<template>
  <div class="flex w-full max-w-xs flex-col items-start">
    <AnatomyPart text="Label" position="left">
      <span>Label</span>
    </AnatomyPart>

    <AnatomyPart text="Input" position="center" class="w-full">
      <div
        class="border-zinc-300font-medium flex w-full items-center gap-2 rounded-md border bg-zinc-400 text-zinc-700 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-400"
      >
        <span class="px-4 py-1"> 47 </span>

        <div class="ml-auto flex min-w-8 flex-col border-l border-zinc-600">
          <AnatomyPart
            text="Increment button"
            class="flex items-center justify-center py-0.5"
            position="top"
          >
            <PhCaretUp />
          </AnatomyPart>

          <AnatomyPart
            text="Decrement button"
            class="flex items-center justify-center border-t border-zinc-600 py-0.5"
            position="bottom"
          >
            <PhCaretDown />
          </AnatomyPart>
        </div>
      </div>
    </AnatomyPart>

    <AnatomyPart
      text="Description or Error Message"
      position="bottom"
      :distance="20"
    >
      <span class="mt-1 text-sm">Help text</span>
    </AnatomyPart>
  </div>
</template>

<script setup lang="ts">
import AnatomyPart from './AnatomyPart.vue';
import PhCaretUp from '~icons/ph/caret-up';
import PhCaretDown from '~icons/ph/caret-down';
</script>
