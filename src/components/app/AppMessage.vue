
<template>
  <div class="row modal" v-if="message" :class="{open: message}">
    <div class="col s12 m12">
      <div class="card blue-grey darken-1" :class="className">
        <a class='dropdown-trigger btn right' href='#' data-target='dropdown1' @click="close">&times;</a>
        <div class="card-content white-text">
          <span class="card-title" v-if="message">{{ title }}</span>
          <p>{{ message.value }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { getLocalizedText } from '@/locale'

export default {
  name: 'AppMessage',
  setup() {
    const store = useStore()

    const TITLE_MAP = {
      primary: getLocalizedText("Successfully"),
      danger: getLocalizedText("Error"),
      warning: getLocalizedText("Attention"),
    }

    const TITLE_Class = {
      primary: 'teal',
      danger: 'red',
      warning: 'red'
    }

    const message = computed(() => store.getters.message )
    const title = computed(() =>  message.value ? TITLE_MAP[message.value.type] : '' )
    const className = computed(() =>  message.value ? TITLE_Class[message.value.type] : 'teal' )

    return {
      message,
      title,
      className,
      close: () => store.commit('clearMessage')
    }
  },
}
</script>

<style scoped>
.modal {
    display: none;
    position: fixed;
    left: 0;
    right: 0;
    background-color: #fafafa41;
    padding: 0;
    max-height: 70%;
    width: 55%;
    margin: auto;
    overflow-y: auto;
    border-radius: 10px;
    will-change: top, opacity;
}
.open {
    z-index: 1003;
    display: block;
    opacity: 1;
    top: 40vh;
    transform: scaleX(1) scaleY(1);
}
</style>