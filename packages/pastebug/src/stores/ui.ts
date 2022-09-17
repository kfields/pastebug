import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useUiStore = defineStore('ui', () => {
  const light = ref(false);
  const navDrawerOpen = ref(true);
  const toolDrawerOpen = ref(false);

  function setNavDrawerOpen(value: boolean) {
    navDrawerOpen.value = value;
  }
  function toggleNavDrawer() {
    navDrawerOpen.value = !navDrawerOpen.value;
  }
  function setToolDrawerOpen(value: boolean) {
    toolDrawerOpen.value = value;
  }
  function toggleToolDrawer() {
    toolDrawerOpen.value = !toolDrawerOpen.value;
  }

  return {
    light,
    navDrawerOpen,
    toolDrawerOpen,
    toggleNavDrawer,
  };
});
