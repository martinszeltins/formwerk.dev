<script setup lang="ts">
import { z } from 'zod';
import { useForm } from '@formwerk/core';
import TextField from './TextField.vue';

const { handleSubmit } = useForm({
  schema: z.object({
    email: z.string().email().min(1, 'Email is required'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
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
