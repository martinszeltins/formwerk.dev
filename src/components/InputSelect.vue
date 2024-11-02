<script setup lang="ts" generic="TOption extends { label: string }, TValue">
import { useSelect, type SelectProps } from '@formwerk/core';
import OptionItem from '@components/OptionItem.vue';
import OptionGroup from '@components/OptionGroup.vue';
import { computed, watch } from 'vue';

export interface TheProps<TOption, TValue>
  extends SelectProps<TOption, TValue> {
  groups?: { items: TOption[]; label: string }[];
  options?: TOption[];
  getOptionValue?: (option: TOption) => TValue;
  size?: 'sm' | 'lg';
}

const props = withDefaults(defineProps<TheProps<TOption, TValue>>(), {
  size: 'sm',
});

const {
  triggerProps,
  labelProps,
  errorMessageProps,
  isTouched,
  displayError,
  fieldValue,
  popupProps,
  isOpen,
} = useSelect(props);

const selectedOption = computed(() => {
  return props.options?.find((option) => {
    if (props.getOptionValue) {
      return props.getOptionValue(option) === fieldValue.value;
    }

    return (option as unknown as TValue) === fieldValue.value;
  });
});

watch(isOpen, (val) => {});
</script>

<template>
  <div
    class="InputSelect"
    :class="{
      touched: isTouched,
      'size-sm': size === 'sm',
      'size-lg': size === 'lg',
    }"
  >
    <div class="label" v-bind="labelProps">{{ label }}</div>

    <div
      v-bind="triggerProps"
      class="trigger flex items-center gap-2.5"
      :class="{ 'has-value': !!fieldValue }"
    >
      <template v-if="selectedOption">
        <slot name="selected" :option="selectedOption">
          {{ selectedOption.label }}
        </slot>
      </template>

      <template v-else>
        {{ 'Select an option' }}
      </template>

      <span class="ml-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="dropdown-icon fill-current text-zinc-400"
          viewBox="0 0 256 256"
        >
          <path
            d="M184.49,167.51a12,12,0,0,1,0,17l-48,48a12,12,0,0,1-17,0l-48-48a12,12,0,0,1,17-17L128,207l39.51-39.52A12,12,0,0,1,184.49,167.51Zm-96-79L128,49l39.51,39.52a12,12,0,0,0,17-17l-48-48a12,12,0,0,0-17,0l-48,48a12,12,0,0,0,17,17Z"
          ></path>
        </svg>
      </span>
    </div>

    <div v-bind="popupProps" popover class="listbox">
      <slot>
        <template v-if="groups">
          <OptionGroup
            v-for="group in groups"
            :key="group.label"
            :label="group.label"
          >
            <slot name="group" :options="group.items">
              <OptionItem
                v-for="(option, idx) in group.items"
                :key="(option as any) ?? idx"
                :value="getOptionValue?.(option) ?? option"
                :label="option.label"
              >
                <slot name="option" :option="option">
                  {{ option.label }}
                </slot>
              </OptionItem>
            </slot>
          </OptionGroup>
        </template>

        <div v-else-if="options" class="flex flex-col gap-1 p-2">
          <OptionItem
            v-for="(option, idx) in options"
            :key="option.label ?? idx"
            :value="getOptionValue?.(option) ?? option"
            :label="option.label"
          >
            <slot name="option" :option="option" />
          </OptionItem>
        </div>
      </slot>
    </div>

    <span v-bind="errorMessageProps" class="error-message">
      {{ displayError() }}
    </span>
  </div>
</template>

<style scoped lang="postcss">
.InputSelect {
  @apply relative w-full max-w-xs;
  margin-bottom: calc(1em * 1.5);

  .label {
    @apply mb-1 block w-full whitespace-nowrap text-sm font-semibold text-white;
  }

  .dropdown-icon {
    @apply h-6 w-6;
  }

  .trigger {
    @apply w-full cursor-pointer whitespace-nowrap rounded-md border border-zinc-700 bg-zinc-800 py-3 pl-4 pr-3 text-zinc-400 transition-all duration-200 focus:bg-zinc-900;
    anchor-name: --trigger;

    &:focus {
      @apply border-emerald-500 outline-none ring-1 ring-emerald-500;
    }

    &:hover {
      @apply bg-zinc-900;
    }

    &.has-value {
      @apply text-white;
    }
  }

  .error-message {
    @apply absolute left-0 text-sm text-red-500;
    bottom: calc(-1.5 * 1em);
  }

  &.size-sm {
    .label {
      @apply text-sm;
    }

    .trigger {
      @apply py-2 text-sm;
    }

    .dropdown-icon {
      @apply h-4 w-4;
    }
  }
}

.listbox {
  margin: 0;
  width: 320px;
  @apply relative max-h-[60vh] p-0;
  position-anchor: --trigger;
  position-area: bottom;
  inset-area: bottom;
  transform: scale(0.9);
  transform-origin: top;

  @apply mt-1 rounded-md border border-zinc-700 bg-zinc-900 shadow-lg;
  opacity: 0;
  transition:
    display 0.1s allow-discrete,
    opacity 0.1s allow-discrete,
    transform 0.1s allow-discrete,
    overlay 0.1s allow-discrete;

  &:popover-open {
    opacity: 1;
    transform: scale(1);
  }

  scrollbar-width: thin;
  overflow-y: auto;
  overflow-y: overlay;
  scrollbar-color: rgb(63 63 70) transparent;
}

@starting-style {
  .listbox :popover-open {
    opacity: 0;
    transform: scale(0.9);
  }
}
</style>
