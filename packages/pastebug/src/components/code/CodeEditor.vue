<template>
  <codemirror
    v-model="paste.code"
    placeholder="Code goes here..."
    :style="{ height: '400px' }"
    :autofocus="true"
    :indent-with-tab="true"
    :tab-size="2"
    :extensions="extensions"
    @ready="handleReady"
  />
</template>

<script setup lang="ts">
import { shallowRef } from 'vue';
import { EditorState } from '@codemirror/state'
import { EditorView } from '@codemirror/view'
import { Codemirror } from 'vue-codemirror';

import { loadExtensions } from './extensions';
import { Paste } from 'models/paste'

const props = defineProps<{
  paste: Paste
}>();

const { paste } = $(props);

const extensions = await loadExtensions(paste.kind)

interface Payload {
    view: EditorView;
    state: EditorState;
    container: HTMLDivElement;
}
// Codemirror EditorView instance ref
const view = shallowRef();
const handleReady = (payload: Payload) => {
  view.value = payload.view;
};
</script>
