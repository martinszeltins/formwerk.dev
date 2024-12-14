<script setup lang="ts">
import PhScales from '~icons/ph/scales';
import PhHandshake from '~icons/ph/handshake';
import PhHandHeart from '~icons/ph/hand-heart';
</script>

<template>
  <footer class="flex flex-col items-center justify-center py-5 lg:px-10">
    <div class="flex items-center gap-5 lg:gap-8">
      <a
        href="https://github.com/formwerkjs/formwerk/blob/main/LICENSE"
        class="mb-4 flex items-center gap-1 font-bold text-zinc-400 hover:text-zinc-300"
        target="_blank"
        rel="noopener"
      >
        <PhScales class="size-5" />
        MIT License
      </a>

      <a
        href="https://github.com/formwerkjs/formwerk/blob/main/CONTRIBUTING.md"
        class="mb-4 flex items-center gap-1 font-bold text-zinc-400 hover:text-zinc-300"
        target="_blank"
        rel="noopener"
      >
        <PhHandshake class="size-5" />
        Contribute
      </a>

      <a
        href="https://github.com/sponsors/logaretm"
        class="mb-4 flex items-center gap-1 font-bold text-zinc-400 hover:text-zinc-300"
        target="_blank"
        rel="noopener"
      >
        <PhHandHeart class="size-5" />
        Sponsor
      </a>
    </div>

    <p class="text-center text-sm font-medium text-zinc-400">
      &copy; {{ new Date().getFullYear() }} Abdelrahman Awad
    </p>
  </footer>
</template>
