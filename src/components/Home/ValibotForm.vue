<script setup lang="ts">
import * as v from 'valibot';
import { useForm } from '@formwerk/core';
import TextField from './TextField.vue';

const { handleSubmit } = useForm({
  schema: v.object({
    email: v.pipe(v.string(), v.minLength(1), v.email()),
    password: v.pipe(v.string(), v.minLength(6)),
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
