<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleNavDrawer"
        />

        <q-avatar>
          <q-icon name="o_bug_report" size="sm" />
        </q-avatar>

        <q-toolbar-title> Pastebug </q-toolbar-title>

        <q-toggle
          v-model="light"
          checked-icon="brightness_5"
          unchecked-icon="dark_mode"
        />
      </q-toolbar>
    </q-header>

    <NavDrawer />

    <q-page-container>
      <Suspense>
      <template #default>
        <router-view />
      </template>
      <template #fallback>
        <q-spinner-box color="primary" size="2em" />
      </template>
    </Suspense>

    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUiStore } from '../stores/ui';

import NavDrawer from 'components/NavDrawer.vue';

const { light } = storeToRefs(useUiStore());
const { toggleNavDrawer } = useUiStore();
</script>
