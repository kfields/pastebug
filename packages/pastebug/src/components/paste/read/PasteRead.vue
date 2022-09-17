<template>
  <div class="q-pb-sm">
    <q-input
      autocomplete="title"
      v-model="paste.title"
      label="Title"
      :readonly="true"
    />
    <q-select v-model="kind" :options="options" label="Type" :readonly="true" />
  </div>
  <CodeViewer :paste="paste" :key="kind" />
  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-btn fab color="primary" icon="content_copy" @click="copyToClipboard" />
  </q-page-sticky>
  <Teleport to="#pastebug-navbox">
    <PasteReadNavbox />
  </Teleport>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useQuery, useMutation, gql } from '@urql/vue';
import { useQuasar } from 'quasar';

import { Paste } from 'models/paste';

import { languageNames } from 'components/code/languages';

import PasteReadNavbox from './PasteReadNavbox.vue';
import CodeViewer from 'components/code/CodeViewer.vue';

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

async function copyToClipboard() {
  var copyText = paste.code;
  await navigator.clipboard.writeText(copyText);
  $q.notify('Copied to Clipboard');
}
</script>
