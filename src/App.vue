<template>

    <div id="app">
      <component
      v-if="layout"
      :is="layout + '-layout'"
      >
      <RouterView />
      </component>
      <AppMessage />
    </div>

</template>

<style>
@import 'materialize-css/dist/css/materialize.min.css';
@import './assets/index.css';
</style>
 
<script>
import MainLayout from './layout/MainLayout.vue';
import AuthLayout from './layout/AuthLayout.vue';
import AppMessage from "./components/app/AppMessage.vue";

import { useRoute } from 'vue-router'
import { computed } from 'vue'

export default {
  setup () {
    const route = useRoute()
    const layout = computed( () => route.meta.layout )

  return {
    layout,
  }
},
components: {
  MainLayout,
  AuthLayout,
  AppMessage
}
}

</script>


<style>

</style>