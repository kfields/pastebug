<template>
  <q-page padding>
    <q-form @submit.prevent="handleSignin">
      <q-input
        autocomplete="email"
        v-model="email"
        type="email"
        label="Email"
      />
      <q-input
        autocomplete="current-password"
        v-model="password"
        type="password"
        label="Password"
      />
      <q-btn type="submit" label="Submit" />
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from 'stores/user';

const router = useRouter();

const props = defineProps<{
  isSignOut?: boolean;
}>();
const { isSignOut } = $(props);

const { signIn, signOut } = useUserStore();
const email = ref('');
const password = ref('');
async function handleSignin() {
  await signIn(email.value, password.value);
  router.replace('/')
}
if (isSignOut) {
  await signOut();
  router.replace('/')
}
</script>
