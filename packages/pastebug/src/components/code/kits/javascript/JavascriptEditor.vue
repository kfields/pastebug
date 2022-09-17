<template>
  <codemirror
    v-model="code"
    placeholder="Code goes here..."
    :style="{ height: '400px' }"
    :autofocus="true"
    :indent-with-tab="true"
    :tab-size="2"
    :extensions="extensions"
    @ready="handleReady"
    @change="log('change', $event)"
    @focus="log('focus', $event)"
    @blur="log('blur', $event)"
  />
</template>

<script setup lang="ts">
import { ref, unref, shallowRef, watch, toRefs, onMounted } from 'vue';
import { Codemirror } from 'vue-codemirror';
import { Paste } from 'models/paste';
import extensions from './extensions';

const props = defineProps<{
  paste: Paste;
}>();

//const code = unref(props.paste.code)
const code = ref(props.paste.code)

const log = console.log;

// Codemirror EditorView instance ref
const view = shallowRef();
const handleReady = (payload) => {
  view.value = payload.view;
};
</script>
