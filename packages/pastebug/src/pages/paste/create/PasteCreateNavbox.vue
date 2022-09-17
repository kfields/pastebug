<template>
  <div class="fit">
    <q-list>
      <q-item @click="$router.go(-1)" clickable>
        <q-item-section avatar>
          <q-icon name="chevron_left" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Back</q-item-label>
        </q-item-section>
      </q-item>

      <q-item @click="$emit('save')" clickable>
        <q-item-section avatar>
          <q-icon name="sym_o_save" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Save</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup lang="ts">
defineEmits(['save']);
</script>
