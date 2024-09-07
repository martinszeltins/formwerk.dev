<template>
  <div class="flex items-center gap-1">
    <AnatomyPart
      text="Input"
      :distance="30"
      position="left"
      class="flex items-center justify-center"
    >
      <PhCheckSquareFill class="h-8 w-8 text-zinc-500" />
    </AnatomyPart>

    <AnatomyPart text="Checkbox Label" :distance="20" position="right">
      I accept the terms
    </AnatomyPart>
  </div>

  <AnatomySeparator />

  <AnatomyPart
    text="Checkbox Group"
    :distance="40"
    position="right"
    class="border-r border-zinc-500"
  >
    <AnatomyPart text="Group Label" position="left">
      <span>Choose Drink</span>
    </AnatomyPart>

    <div class="ml-4 mt-4 flex flex-col pr-8">
      <div class="flex items-center gap-1">
        <PhSquare class="h-8 w-8 text-zinc-500" />
        Tea
      </div>
      <AnatomyPart text="Input" :distance="30" position="left">
        <div class="flex items-center gap-1">
          <PhCheckSquareFill class="h-8 w-8 text-zinc-500" />
          Coffee
        </div>
      </AnatomyPart>
      <div class="flex items-center gap-1">
        <PhCheckSquareFill class="h-8 w-8 text-zinc-500" />
        <AnatomyPart text="Checkbox Label" :distance="20" position="bottom">
          Water
        </AnatomyPart>
      </div>
    </div>
  </AnatomyPart>
</template>

<script setup lang="ts">
import AnatomyPart from './AnatomyPart.vue';
import PhCheckSquareFill from '~icons/ph/check-square-fill';
import PhSquare from '~icons/ph/square';
</script>
