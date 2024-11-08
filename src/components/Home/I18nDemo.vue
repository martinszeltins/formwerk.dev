<template>
  <div
    class="flex flex-col items-stretch rounded-lg border border-zinc-700/70 bg-zinc-800/60 py-8 backdrop-blur-sm lg:flex-row lg:px-8 lg:py-0"
  >
    <div class="flex w-full items-center justify-center">
      <NumberField
        label="Number"
        v-model="number"
        :locale="localeExtended"
        :format-options="formatOptions"
      />
    </div>

    <div
      class="flex flex-col border-t border-zinc-700/70 py-4 pl-8 lg:w-[380px] lg:border-l lg:border-t-0"
    >
      <SelectField
        v-model="locale"
        label="Locale"
        :get-option-value="(option) => option.value"
        :options="locales"
      />

      <SelectField
        v-model="numberSystem"
        label="Numbering system"
        :get-option-value="(option) => option.value"
        :options="[
          { label: 'Latin', value: 'latn' },
          { label: 'Arabic', value: 'arab' },
          { label: 'Hanidec', value: 'hanidec' },
        ]"
      />

      <SelectField
        v-model="format"
        label="Format"
        :get-option-value="(option) => option.value"
        :options="[
          { label: 'Decimal', value: 'decimal' },
          { label: 'Percent', value: 'percent' },
          { label: 'Currency', value: 'currency' },
          { label: 'Unit', value: 'unit' },
        ]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import NumberField from '@components/Home/NumberField.vue';
import SelectField from '@components/Home/SelectField.vue';
import { getLocales } from '@utils/locales';
import { computed, ref } from 'vue';

const numberSystem = ref('latn');
const number = ref(1234);
const format = ref<any>('decimal');
const locales = getLocales();

const formatOptions = computed(() => {
  const options: Record<string, Intl.NumberFormatOptions> = {
    decimal: { style: 'decimal' },
    percent: { style: 'percent' },
    currency: {
      style: 'currency',
      currency: locale.value === 'ar-EG' ? 'EGP' : 'USD',
    },
    unit: { style: 'unit', unit: 'kilometer', unitDisplay: 'short' },
  };

  return options[format.value];
});

const locale = ref('en-US');

const localeExtended = computed(() => {
  return `${locale.value}-u-nu-${numberSystem.value}`;
});
</script>
