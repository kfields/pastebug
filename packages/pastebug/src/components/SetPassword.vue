<template>
    <div>
      <q-form @submit.prevent="handleSetPassword">
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
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useUserStore } from 'stores/user';
  
  const { setPassword } = useUserStore();
  const password = ref('');
  const badLogin = ref(false);
  async function handleSetPassword() {
    console.log('handleSetPassword')
    await setPassword(password.value);
  }
  </script>
  