<template>
  <q-drawer v-model="navDrawerOpen" class="drawer" side="left">
    <q-list
      style="float: left; border-right: 1px solid rgb(46, 46, 46); height: 100%"
    >
      <q-item to="/" :exact="true" v-ripple>
        <q-item-section>
          <q-icon name="o_home" size="xs" />
        </q-item-section>
      </q-item>

      <q-item to="/p" v-ripple>
        <q-item-section>
          <q-icon name="o_content_paste" size="xs" />
        </q-item-section>
      </q-item>

      <!--<q-item to="/users" v-ripple>
        <q-item-section>
          <q-icon name="o_group" size="xs" />
        </q-item-section>
      </q-item>-->

      <q-item v-if="isSignedIn" to="/signout" v-ripple>
        <q-item-section>
          <q-icon name="o_logout" size="xs" />
        </q-item-section>
      </q-item>
      <q-item v-else to="/signin" v-ripple>
        <q-item-section>
          <q-icon name="o_login" size="xs" />
        </q-item-section>
      </q-item>
    </q-list>

    <div class="navbox" id="pastebug-navbox" />
  </q-drawer>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUiStore } from '../stores/ui';
import { useUserStore } from '../stores/user';

const { navDrawerOpen } = storeToRefs(useUiStore());
const { isSignedIn } = storeToRefs(useUserStore());
</script>

<style lang="scss">
.navbox {
  white-space: nowrap;
  overflow: hidden;
  height: 100%;
  //background-color: #222222;
  font-size: 0.8125rem;
  font-weight: 600;
}
</style>
