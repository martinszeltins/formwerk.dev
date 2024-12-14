<template>
  <div class="flex flex-col gap-4">
    <AnatomyPart text="Group" position="right">
      <div
        class="flex flex-col gap-4 rounded-md border border-dashed border-zinc-600 p-6"
      >
        <AnatomyPart text="Group Label" position="right" class="w-max">
          <span>Shipping Address</span>
        </AnatomyPart>

        <AnatomyPart text="Group Fields" position="left">
          <div
            class="flex flex-col gap-4 rounded-md border border-dashed border-zinc-600 p-6"
          >
            <div class="flex items-center gap-2">
              <div
                class="flex w-max items-center whitespace-nowrap rounded-md border border-zinc-300 bg-zinc-400 px-4 py-1.5 pr-40 font-medium text-zinc-700 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-400"
              >
                Street
              </div>
            </div>

            <div class="flex items-center gap-2">
              <div
                class="flex w-max items-center whitespace-nowrap rounded-md border border-zinc-300 bg-zinc-400 px-4 py-1.5 pr-40 font-medium text-zinc-700 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-400"
              >
                City
              </div>
            </div>
          </div>
        </AnatomyPart>
      </div>
    </AnatomyPart>
  </div>
</template>

<script setup lang="ts">
import AnatomyPart from './AnatomyPart.vue';

import PhTrash from '~icons/ph/trash';
import PhPlus from '~icons/ph/plus-bold';
import PhCaretDown from '~icons/ph/caret-down-bold';
import PhCaretUp from '~icons/ph/caret-up-bold';
</script>
