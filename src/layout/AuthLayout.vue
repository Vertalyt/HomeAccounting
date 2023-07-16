
<template>
<div>
<div class="grey darken-1 empty-layout">
  <RouterView />
</div>
</div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { error } from '../utills/error' 

export default {
  name: 'AuthLayout',
  setup() {
    const route = useRoute()
    const store = useStore()
    const router = useRouter()

    if(route.query.message === 'auth') {
      store.dispatch('setMessage', {
        value: error('auth')
      })
      router.push('/login')
    }
    return {
    }
  },
}
</script>

