
<template>
<div>
  <div class="page-title">
    <h3>{{ getLocalizedText("categories") }}</h3>
  </div>

  <section>

    <ul class="collapsible" ref="collapsibleRef">
    <li class="active">
      <div class="collapsible-header"><i class="material-icons">category</i>Создать категорию</div>
      <div class="collapsible-body"><CategoryCreate @created="updateCategories"/></div>
    </li>
    <li>
      <div class="collapsible-header"><i class="material-icons">edit</i>Редактировать категорию</div>
      <div class="collapsible-body"><ElementEdit :key="updateKey" @updated="updateCategories" :dispash="dispash"/></div>
    </li>
    <li>
      <div class="collapsible-header"><i class="material-icons">refresh</i>Восстановить категорию</div>
      <div class="collapsible-body"> <ElementRestor :key="updateKey + updateCount" @updated="updateCategories" :dispash="dispash"/></div>
    </li>
  </ul>

  </section>
</div>
</template>

<script>
import CategoryCreate from '../components/CategoryCreate.vue';
import ElementEdit from '../components/ElementEdit.vue'
import ElementRestor from '../components/ElementRestor.vue';
import M from "materialize-css/dist/js/materialize.min.js";
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { getLocalizedText } from '@/locale'


export default {
  name: 'CategoriesView',
  setup() {
    const updateCount = ref(0)
    const dispash = 'categories'
    const updateCategories = () => {
      updateCount.value++;
    };
    const collapsibleRef = ref()
    const instances = ref()

    onMounted(async ()=> {
        instances.value = M.Collapsible.init(collapsibleRef.value);
    })

    onBeforeUnmount(() => {
      if (instances.value && instances.value.destroy) {
        instances.value.destroy();
    }
    } )

    return {
      updateCategories,
      updateKey: computed( () => updateCount.value),
      getLocalizedText,
      updateCount,
      dispash,
      collapsibleRef
    }
  },
  components: {
    CategoryCreate,
    ElementEdit,
    ElementRestor
  }
}
</script>

<style >
/* @media (min-width: 1400px) {
  form > .field{
  display: flex;
}
form > .field > .input-field{
  flex: 1 1 auto;
  margin: 1rem;
}
div > button {
  float: right !important;
}
} */
</style>