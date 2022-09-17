<template>
  <q-list>
    <q-item
      v-for="edge in pasteCollection.edges"
      :key="edge.id"
      :to="`/p/${edge.node.id}`"
    >
      <q-item-section avatar>
        <q-icon name="o_description" color="grey-6" />
      </q-item-section>
      <q-item-section>
        {{ edge.node.title }}
      </q-item-section>
    </q-item>
  </q-list>

  <q-page-sticky v-if="canCreatePaste()" position="bottom-right" :offset="[18, 18]">
    <q-btn fab color="primary" icon="add" to="/p/create" />
  </q-page-sticky>
</template>

<script setup lang="ts">
import { useQuery, gql } from '@urql/vue';

import usePasteAbilites from 'abilities/paste';

const { canCreatePaste } = usePasteAbilites();

// Prepare our GraphQL query
const PastesQuery = gql`
  query {
    pasteCollection {
      edges {
        node {
          id
          kind
          title
          code
        }
      }
    }
  }
`;

const { fetching, data, error } = await useQuery({ query: PastesQuery });

const pasteCollection = data.value?.pasteCollection;
console.log(data);
console.log(error);
</script>
