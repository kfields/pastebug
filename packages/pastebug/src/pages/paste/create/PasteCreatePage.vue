<template>
  <q-page padding>
    <div class="q-pb-sm">
      <q-input autocomplete="title" v-model="paste.title" label="Title" />
      <q-select v-model="kind" :options="options" label="Type" />
    </div>
    <CodeEditor :paste="paste" :key="kind" />
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab color="primary" icon="save" @click="save" />
    </q-page-sticky>
    <Teleport to="#pastebug-navbox">
      <PasteCreateNavbox @save="save" />
    </Teleport>
  </q-page>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useMutation, gql } from '@urql/vue';
import { useQuasar } from 'quasar';
import useSupabase from 'api/supabase';
import { Paste } from 'models/paste';

import CodeEditor from 'components/code/CodeEditor.vue';
import { languageNames } from 'components/code/languages';

import PasteCreateNavbox from './PasteCreateNavbox.vue';

const { supabase } = useSupabase();
const $q = useQuasar();
const user = supabase.auth.user();
console.log(user);
const userId = user?.id;
const options = languageNames;

const kind = $ref('JavaScript');
const title = $ref('');
let paste = $ref(new Paste(kind, title, ''));

watch(
  () => kind,
  (value) => {
    paste = new Paste(value, paste.title, paste.code);
  }
);

watch(
  () => title,
  (value) => {
    paste = new Paste(paste.kind, value, paste.code);
  }
);

const insertIntoPasteCollectionQuery = gql`
  mutation ($userId: UUID!, $kind: string!, $title: string!, $code: string!) {
    insertIntoPasteCollection(
      objects: { user_id: $userId, title: $title, code: $code, kind: $kind }
    ) {
      affectedCount
    }
  }
`;

const insertIntoPasteCollection = useMutation(insertIntoPasteCollectionQuery);

const save = async function () {
  console.log('save');
  const variables = {
    userId: userId,
    kind: paste.kind,
    title: paste.title,
    code: paste.code,
  };
  console.log(variables);
  insertIntoPasteCollection.executeMutation(variables).then((result) => {
    console.log(result);
  });
  $q.notify('Page Created');
};
</script>
