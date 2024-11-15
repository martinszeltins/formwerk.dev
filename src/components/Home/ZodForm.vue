<script setup lang="ts">
import { z } from 'zod';
import { useForm } from '@formwerk/core';
import TextField from './TextField.vue';

const schema = z.object({
  email: z.string().min(1, 'Email is required').email(),
  password: z.string().min(1, 'Password is required'),
});

// TODO: Zod not yet supported
const { handleSubmit } = useForm({ schema: undefined });

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
