<template>
  <div class="flex flex-col gap-4">
    <AnatomyPart text="Iteration #1" position="left">
      <div
        class="flex flex-col gap-4 rounded-md border border-dashed border-zinc-600 p-6"
      >
        <div class="flex items-center gap-2">
          <div
            class="flex w-max items-center whitespace-nowrap rounded-md border border-zinc-600 bg-zinc-900 px-4 py-1.5 pr-40 font-medium text-zinc-400"
          >
            Field 1
          </div>

          <AnatomyPart
            text="Move next button"
            position="top"
            class="flex items-center"
          >
            <PhCaretDown class="text-zinc-400" />
          </AnatomyPart>

          <PhCaretUp class="text-zinc-400 opacity-60" />

          <AnatomyPart
            text="Remove item button"
            position="right"
            class="flex items-center"
          >
            <PhTrash class="text-zinc-400" />
          </AnatomyPart>
        </div>
      </div>
    </AnatomyPart>

    <AnatomyPart text="Iteration #2" position="left">
      <div
        class="flex flex-col gap-4 rounded-md border border-dashed border-zinc-600 p-6"
      >
        <div class="flex items-center gap-2">
          <div
            class="flex w-max items-center whitespace-nowrap rounded-md border border-zinc-600 bg-zinc-900 px-4 py-1.5 pr-40 font-medium text-zinc-400"
          >
            Field 2
          </div>

          <PhCaretDown class="text-zinc-400 opacity-60" />

          <AnatomyPart
            text="Move previous button"
            position="bottom"
            class="flex items-center"
          >
            <PhCaretUp class="text-zinc-400" />
          </AnatomyPart>

          <PhTrash class="text-zinc-400" />
        </div>
      </div>
    </AnatomyPart>

    <AnatomyPart text="Add item button" position="left">
      <button
        type="button"
        class="flex w-32 items-center gap-1 rounded-md bg-zinc-900 px-4 py-2 text-left text-sm font-medium text-zinc-400"
      >
        <PhPlus class="text-zinc-400" />
        Add item
      </button>
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
