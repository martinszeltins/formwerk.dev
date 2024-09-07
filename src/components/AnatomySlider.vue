<template>
  <div class="flex w-full max-w-xs flex-col items-center gap-1">
    <div class="flex w-full items-center">
      <AnatomyPart text="Label" position="top" :distance="20" class="mr-auto">
        <span>Label</span>
      </AnatomyPart>

      <AnatomyPart text="Output" position="right" class="mr-6" :distance="20">
        <span>74</span>
      </AnatomyPart>
    </div>

    <AnatomyPart text="Group" class="w-full">
      <div
        class="relative flex w-full items-center rounded border border-dashed border-zinc-500 px-3 py-4"
      >
        <AnatomyPart
          text="Track"
          position="bottom span-right"
          :distance="30"
          class="relative flex w-full items-center"
        >
          <div class="h-0.5 w-full rounded-full bg-zinc-500"></div>
        </AnatomyPart>

        <div
          class="absolute right-1/4 flex translate-y-1 items-center justify-center"
        >
          <AnatomyPart text="Thumb" position="center" mirrored>
            <PhCircleFill class="h-6 w-6 text-zinc-400" />
          </AnatomyPart>
        </div>
      </div>
    </AnatomyPart>
  </div>
</template>

<script setup lang="ts">
import AnatomyPart from './AnatomyPart.vue';
import PhCircleFill from '~icons/ph/circle-fill';
</script>
