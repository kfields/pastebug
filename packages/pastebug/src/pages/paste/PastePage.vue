<template>
  <q-page padding>
    <component :is="PasteView" />
  </q-page>
</template>

<script setup lang="ts">
import { markRaw, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from 'stores/user';
import PasteRead from 'components/paste/read/PasteRead.vue';
import PasteUpdate from 'components/paste/update/PasteUpdate.vue';

const route = useRoute();

const { isSignedIn } = useUserStore();

let mode = $ref(route.query.m);
console.log('mode ', mode);
watch(
  () => route.params,
  (toParams, previousParams) => {
    mode = route.query.m;
  }
);

watch(
  () => mode,
  (value) => {
    console.log('watch mode ', value);
    selectMode(value);
  }
);

let PasteView = $ref(null);
selectMode(mode);

function selectMode(value: string) {
  console.log('select mode ', value);
  switch (value) {
    case undefined:
      if (isSignedIn && mode !== 'preview') {
        PasteView = markRaw(PasteUpdate);
      } else {
        PasteView = markRaw(PasteRead);
      }
      break;
    case 'preview':
      PasteView = markRaw(PasteRead);
      break;
    case 'edit':
      PasteView = markRaw(PasteUpdate);
      break;
  }
}
</script>
