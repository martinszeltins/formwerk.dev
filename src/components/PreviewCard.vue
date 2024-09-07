<template>
  <a
    class="not-content flex flex-col overflow-hidden rounded-lg bg-zinc-500 shadow-sm transition-colors duration-200 dark:bg-zinc-800 dark:shadow-none"
    :href="link"
  >
    <div class="h-40 bg-zinc-300 dark:bg-zinc-700"></div>

    <div class="p-4">
      <p class="text-base font-bold text-white">{{ title }}</p>
      <p class="mt-2 text-sm text-white">
        {{ description }}
      </p>
    </div>
  </a>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  description: string;
  image: string;
  link: string;
}>();
</script>

<style lang="postcss" scoped>
a {
  text-decoration: none;
}
</style>
