<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useQuasar } from 'quasar';
import { storeToRefs } from 'pinia';
import { useUiStore } from 'stores/ui';

import useSupabase from 'api/supabase';
import {
  createClient,
  provideClient,
  dedupExchange,
  fetchExchange,
} from '@urql/vue';
import { cacheExchange } from '@urql/exchange-graphcache';

const { supabase } = useSupabase();

function getHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  };
  const authorization = supabase.auth.session()?.access_token;

  if (authorization) {
    headers['authorization'] = `Bearer ${authorization}`;
  }

  return headers;
}
const client = createClient({
  url: `${import.meta.env.VITE_SUPABASE_URL}/graphql/v1`,
  fetchOptions: () => {
    return { headers: getHeaders() };
  },
  exchanges: [
    dedupExchange,
    // Replace the default cacheExchange with the new one
    cacheExchange({
      /* optional config */
    }),
    fetchExchange,
  ],
  requestPolicy: 'cache-and-network',
});

provideClient(client);

const $q = useQuasar();

const { light } = storeToRefs(useUiStore());
watch(light, (value) => {
  $q.dark.set(!value);
});

onMounted(() => {
  $q.dark.set(true);
});
</script>
