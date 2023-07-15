<template>
<table class="striped highlight centered teal lighten-4" ref="cardTableRef">
        <thead>
          <tr>
              <th> Тип  </th>
              <th>Аккаунт</th>
              <th>Відключити</th>

          </tr>
        </thead>
        <tbody>
          <tr v-for="m in loginMetod" :key="m.providerId">
            <td>{{ authTitle[m.providerId] }}</td>
            <td>{{ m.email }}</td>
            <td>
            <a href="#" class="btn-small btn" @click.prevent="unlinkAuth(m.providerId)">
              <i class="material-icons">open_in_new</i>
            </a>

        </td>
          </tr>
        </tbody>
      </table>
</template>

<script>
import { useStore } from 'vuex'

export default {
  name: 'ActiveMethodAuth',
  props:['loginMetod'],
  emits:['updated'],
  setup(_, {emit}) {
    const store = useStore()
    const unlinkAuth = async (providerId) => {
     await store.dispatch('auth/unMethodAuth', providerId)
      emit('updated')
    }

    const authTitle = {
      "google.com": 'Google',
      "password": 'Логін/пароль',
    }

    return {
      unlinkAuth,
      authTitle
    }
  },
}
</script>

