<script setup lang="ts">
import {
  TabsContent,
  TabsIndicator,
  TabsList,
  TabsRoot,
  TabsTrigger,
} from 'radix-vue';
import { computed, useSlots, type Component } from 'vue';

const slots = useSlots();

const props = defineProps<{
  tabs: string[];
}>();

const tabsContent = computed(() => {
  const contents: Record<string, { name: string; render: Component }> = {};

  for (const tab in slots) {
    contents[tab] = {
      name: tab,
      render: slots[tab] as Component,
    };
  }

  return contents;
});
</script>

<template>
  <TabsRoot class="mt-5" :default-value="tabs[0]">
    <TabsList
      class="relative mb-8 flex shrink-0"
      aria-label="Manage your account"
    >
      <TabsIndicator
        class="absolute inset-0 w-[--radix-tabs-indicator-size] translate-x-[--radix-tabs-indicator-position] transition-[width,transform] duration-300"
      >
        <div class="h-full w-full rounded-full bg-zinc-200" />
      </TabsIndicator>

      <TabsTrigger
        v-for="tab in tabs"
        :key="tab"
        class="relative flex px-4 py-2 text-center font-medium text-white focus:text-balance aria-selected:text-black"
        :value="tab"
      >
        {{ tab }}
      </TabsTrigger>
    </TabsList>

    <TabsContent
      v-for="tab in tabsContent"
      :key="tab.name"
      class="grow rounded-b-md bg-white p-5 outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
      :value="tab.name"
    >
      <component :is="tab.render" />
    </TabsContent>
  </TabsRoot>
</template>
