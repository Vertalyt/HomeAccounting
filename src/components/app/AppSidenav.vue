
<template>
    <ul class="sidenav app-sidenav" :class="{ open: isOpen }">
      <li v-for="l in links" :key="l.to" @click.prevent ="closeMenu">
        <RouterLink :to="l.to" :exact="l.exact">{{ l.title }}</RouterLink>
      </li>
    </ul>
</template>

<script>
import { getLocalizedText } from '@/locale'

export default {
  name: 'AppSidenav',
  emits:['close'],
  props: {
    isOpen: {
      type: Boolean,
      requared: true
    }
  },
  setup(_, {emit}) {
    const links = [
      { title: getLocalizedText("Menu_bill"), to: '/', exact: true },
      { title: getLocalizedText("Menu_history"), to: '/history'},
      { title: getLocalizedText("planning"), to: '/planning'},
      { title: getLocalizedText("HistoryNotes"), to: '/record'},
      { title: getLocalizedText("Menu_categories"), to: '/categories'},
    ]

    const closeMenu = () => {
        emit('close')
      }

    return {
      links,
      closeMenu
    }
  },
}
</script>

