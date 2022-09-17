<template>
  <div class="q-pb-sm">
    <q-input autocomplete="title" v-model="paste.title" label="Title" />
    <q-select v-model="kind" :options="options" label="Type" />
  </div>
  <CodeEditor :paste="paste" :key="kind" />
  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-btn fab color="primary" icon="save" @click="save" />
  </q-page-sticky>
  <Teleport to="#pastebug-navbox">
    <PasteUpdateNavbox @preview="preview" @save="save" @destroy="destroy" />
  </Teleport>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useQuery, useMutation, gql } from '@urql/vue';
import { useQuasar } from 'quasar';

import { Paste } from 'models/paste';

import CodeEditor from 'components/code/CodeEditor.vue';
import { languageNames } from 'components/code/languages';

import PasteUpdateNavbox from './PasteUpdateNavbox.vue';

const $q = useQuasar();

const options = languageNames;
const route = useRoute();
const router = useRouter();
const pasteId = route.params.id;

const PasteQuery = gql`
  query ($pasteId: UUID!) {
    pasteCollection(filter: { id: { eq: $pasteId } }) {
      edges {
        node {
          id
          created_at
          kind
          title
          code
        }
      }
    }
  }
`;

const { data, error } = await useQuery({
  query: PasteQuery,
  variables: { pasteId },
});

const pasteCollection = data.value?.pasteCollection;
const node = pasteCollection.edges[0].node;
const kind = $ref(node.kind);
const title = $ref(node.title);
let paste = $ref(new Paste(kind, title, node.code));

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

function preview() {
  router.push(`/p/${pasteId}?m=preview`);
}

const updatePasteCollectionQuery = gql`
  mutation ($pasteId: UUID!, $kind: string!, $title: string!, $code: string!) {
    updatePasteCollection(
      set: { id: $pasteId, kind: $kind, title: $title, code: $code }
      filter: { id: { eq: $pasteId } }
      atMost: 1
    ) {
      affectedCount
    }
  }
`;

const updatePasteCollection = useMutation(updatePasteCollectionQuery);

async function save() {
  console.log('save');
  const variables = {
    pasteId: pasteId,
    kind: paste.kind,
    title: paste.title,
    code: paste.code,
  };
  console.log(variables);
  const result = await updatePasteCollection.executeMutation(variables);
  console.log(result);

  $q.notify('Page Updated');
}

const deletePasteCollectionQuery = gql`
  mutation ($pasteId: UUID!) {
    deleteFromPasteCollection(filter: { id: { eq: $pasteId } }, atMost: 1) {
      affectedCount
    }
  }
`;

const deletePasteCollection = useMutation(deletePasteCollectionQuery);

async function destroy() {
  console.log('destroy');
  const variables = {
    pasteId: pasteId,
  };
  console.log(variables);
  const result = await deletePasteCollection.executeMutation(variables);
  console.log(result);

  $q.notify('Page Deleted');
  router.go(-1);
}
</script>
