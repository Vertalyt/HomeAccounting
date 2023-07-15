
<template>
<div>
<div class="grey darken-1 empty-layout">
  <!-- <AppMessage /> -->
  <RouterView />
</div>
</div>
</template>

<script>
// import AppMessage from "../components/app/AppMessage.vue";
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { error } from '../utills/error' 

export default {
  name: 'AuthLayout',
  setup() {
    const route = useRoute()
    const store = useStore()

    if(route.query.message === 'auth') {
      store.dispatch('setMessage', {
        type: 'warning',
        value: error('auth')
      })
    }
    return {
    }
  },
  components: {
    // AppMessage
  }
}
</script>

