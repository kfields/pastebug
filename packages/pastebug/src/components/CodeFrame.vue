<template>
  <component
    :is="vu"
    :paste="paste"
    :kit="kit"
  />
</template>

<script setup lang="ts">
import { ref, toRefs, defineAsyncComponent } from 'vue'
import { Paste } from 'models/paste'
import { Kit } from 'models/kit'

const props = defineProps<{
  paste: Paste,
  kit: Kit
}>()

const { paste, kit } = toRefs(props)

const vu = defineAsyncComponent(() =>
  import(kit.value.editor)
)

</script>
