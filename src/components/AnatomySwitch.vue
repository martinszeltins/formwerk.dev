<template>
  <div class="flex w-full max-w-xs flex-col items-center justify-center">
    <div class="flex items-center gap-4">
      <AnatomyPart
        text="Input"
        position="left"
        class="flex items-start justify-center"
      >
        <PhToggleLeftFill class="h-12 w-12 text-zinc-600" />
      </AnatomyPart>

      <AnatomyPart text="Label" position="right">
        <span>Label</span>
      </AnatomyPart>
    </div>

    <AnatomyPart text="Error Message" position="left">
      <span class="text-sm">Something went wrong</span>
    </AnatomyPart>
  </div>
</template>

<script setup lang="ts">
import AnatomyPart from './AnatomyPart.vue';
import PhToggleLeftFill from '~icons/ph/toggle-left-fill';
</script>
