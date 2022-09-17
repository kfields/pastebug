<template>
  <q-form @submit.prevent="handleSignin">
    <q-input
      autocomplete="email"
      v-model="email"
      type="email"
      label="Email"
      :error="badLogin"
      @change="badLogin = false"
    />
    <q-input
      autocomplete="current-password"
      v-model="password"
      type="password"
      label="Password"
      :error="badLogin"
      error-message="Bad username OR password"
      @change="badLogin = false"
    />
    <q-btn type="submit" label="Submit" />
  </q-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from 'stores/user';

const { signIn } = useUserStore();
const email = ref('');
const password = ref('');
const badLogin = ref(false);
async function handleSignin() {
  await signIn(email.value, password.value);
}
</script>
