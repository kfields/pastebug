<template>
  <q-page padding>
    <q-tabs v-model="loginRegisterTab" dense narrow-indicator>
      <q-tab name="login" label="Sign In" />
      <q-tab name="register" label="Sign Up" />
    </q-tabs>
    <q-tab-panels v-model="loginRegisterTab" animater>
      <q-tab-panel name="login">
        <SignIn />
      </q-tab-panel>
      <q-tab-panel name="register">
        <SignUp />
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SignIn from 'components/SignIn.vue';
import SignUp from 'components/SignUp.vue';

const loginRegisterTab = ref('login');
</script>
