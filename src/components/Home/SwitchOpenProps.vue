<script setup lang="ts">
import { useSwitch, type SwitchProps } from '@formwerk/core';

const props = defineProps<SwitchProps>();

const { inputProps, labelProps, isPressed } = useSwitch(props);
</script>

<template>
  <div class="switch-wrapper">
    <div
      v-bind="inputProps"
      class="switch"
      :class="{ 'switch--active': isPressed }"
    >
      <div class="switch__thumb"></div>
    </div>

    <div class="switch__label" v-bind="labelProps">
      {{ label }}
    </div>
  </div>
</template>

<style scoped>
@import 'https://unpkg.com/open-props';

.switch-wrapper {
  display: flex;
  align-items: center;
}

.switch {
  display: flex;
  width: var(--size-8);
  align-items: center;
  padding: var(--size-1);
  border-radius: var(--radius-round);
  cursor: pointer;
  background: var(--gray-6);
  transition: background-color var(--animation-duration-medium) var(--ease-3);
}

.switch:focus {
  outline: 4px solid var(--green-4);
}

.switch--active {
  background: var(--green-6);
}

.switch__thumb {
  height: var(--size-4);
  width: var(--size-4);
  flex-shrink: 0;
  border-radius: var(--radius-round);
  background: var(--gray-0);
  transform-origin: center;
  transition: transform 1s var(--ease-spring-5);
}

.switch--active .switch__thumb {
  transform: translateX(var(--size-4));
}

.switch__label {
  margin-left: var(--size-3);
  font-size: var(--font-size-1);
  font-weight: var(--font-weight-5);
  color: var(--gray-0);
}
</style>
