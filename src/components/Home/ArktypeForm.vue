<script setup lang="ts">
import { type } from 'arktype';
import { useForm } from '@formwerk/core';
import TextField from './TextField.vue';

const { handleSubmit } = useForm({
  schema: type({
    email: type('string.email > 1'),
    password: type('string > 6'),
  }),
});

const onSubmit = handleSubmit((data) => {
  alert(JSON.stringify(data.toObject(), null, 2));
});
</script>

<template>
  <form @submit="onSubmit" novalidate>
    <TextField name="email" type="email" label="Email" />
    <TextField name="password" type="password" label="Password" />

    <button type="submit">Submit</button>
  </form>
</template>
