
<template>
    <nav class="navbar orange lighten-1">
      <div class="nav-wrapper">
        <div class="navbar-left">
          <a href="#" @click.prevent="$emit('close')">
            <i class="material-icons black-text">dehaze</i>
          </a>
          <span class="black-text">{{ dateFilter(date, 'datetime') }}</span>
        </div>

        <ul class="right">
          <li>
            <a  ref="dropdown"
                class="dropdown-trigger black-text"
                href="#"
                data-target="dropdown"
            >
              {{ user.value }}
              <i class="material-icons right">arrow_drop_down</i>
            </a>

            <ul id='dropdown' class='dropdown-content'>
              <li>
                <RouterLink to="/profile"><i class="material-icons">account_circle</i>{{ getLocalizedText("profile-title") }}</RouterLink>
              </li>
              <li class="divider" tabindex="-1"></li>
              <li @click.prevent="logout">
                <RouterLink to="/login"><i class="material-icons">assignment_return</i>{{ getLocalizedText("GoOut") }}</RouterLink>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import M from "materialize-css/dist/js/materialize.min.js";
import { dateFilter } from '../../utills/filter/data.filter'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { error } from '../../utills/error' 
import { getLocalizedText } from '@/locale'

export default {
  name: 'AppNavbar',
  emits: ['close'],
  setup() {
    const router = useRouter()
    const store = useStore()
    const dropdown = ref(null)
    const date = ref(new Date)
    const interval = ref(null)
    const user = ref('')
    const screenWidth = computed( () => store.getters["screenWidth"])

    onMounted( () => {
      dropdown.value = M.Dropdown.init(dropdown.value, {
            constrainWidth: false
        });

        interval.value = setInterval(() => {
          date.value = new Date
        }, 1000);
    } )

    const logout = () => {
      store.dispatch('auth/logout')
      router.push('/login?message=logout')

      store.dispatch('setMessage', {
        type: 'primary',
        value: error('logout')
      })
    }

    onBeforeUnmount( () => {
      clearInterval(interval.value)
      if(dropdown.value && dropdown.value.destroy) {
        dropdown.value.destroy()
      }
    } )

    if (screenWidth.value > 600) {
        user.value = computed ( () =>  store.getters['requests/clientInfo'].name)
            }


    return {
      dropdown,
      date,
      dateFilter,
      logout,
      user,
      getLocalizedText
    }
  },
}
</script>

