<template>
  <div>
    <div class="page-title">
      <h3>{{ getLocalizedText("categories") }}</h3>
    </div>

    <section>
      <ul class="collapsible" ref="collapsibleRef">
        <li>
          <div class="collapsible-header">
            <i class="material-icons">category</i
            >{{ getLocalizedText("CreateCategory") }}
          </div>
          <div class="collapsible-body">
            <CategoryCreate @created="updateCategories" />
          </div>
        </li>
        <li>
          <div class="collapsible-header">
            <i class="material-icons">edit</i>{{ getLocalizedText("Edit") }}
          </div>
          <div class="collapsible-body">
            <p v-if="!categoryEdit.length">
              {{ getLocalizedText("NoElementsToEdit") }}
            </p>
            <ElementEdit
              :key="updateKey"
              @updated="updateCategories"
              :dispash="dispash"
            />
          </div>
        </li>
        <li>
          <div class="collapsible-header">
            <i class="material-icons">refresh</i
            >{{ getLocalizedText("Restore") }}
          </div>
          <div class="collapsible-body">
            <p v-if="!categoryRestore.length">
              {{ getLocalizedText("NoElementsToRestor") }}
            </p>
            <ElementRestor
              :key="updateKey + updateCount"
              @updated="updateCategories"
              :dispash="dispash"
            />
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import CategoryCreate from "../components/CategoryCreate.vue";
import ElementEdit from "../components/ElementEdit.vue";
import ElementRestor from "../components/ElementRestor.vue";
import M from "materialize-css/dist/js/materialize.min.js";
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { getLocalizedText } from "@/locale";
import { useStore } from "vuex";

export default {
  name: "CategoriesView",
  setup() {
    const updateCount = ref(0);
    const dispash = "categories";
    const collapsibleRef = ref();
    const instances = ref();
    const store = useStore();
    const categoryEdit = ref([]);
    const categoryRestore = ref([]);


    async function mainParams() {
      let categoryList = await store.getters["categories/list"];
      if (!categoryList.length) {
        categoryList = await store.dispatch("categories/list");
      }
      if (categoryList.length) {
        categoryEdit.value = categoryList.filter((c) => c.isDetected === false);
        categoryRestore.value = categoryList.filter((c) => c.isDetected === true);
      }
    }
    const updateCategories = async () => {
      await mainParams()
      updateCount.value++;
    };
    onMounted(async () => {
      await mainParams()
      instances.value = M.Collapsible.init(collapsibleRef.value);
    });

    onBeforeUnmount(() => {
      if (instances.value && instances.value.destroy) {
        instances.value.destroy();
      }
    });

    return {
      updateCategories,
      updateKey: computed(() => updateCount.value),
      getLocalizedText,
      updateCount,
      dispash,
      collapsibleRef,
      categoryEdit,
      categoryRestore,
    };
  },
  components: {
    CategoryCreate,
    ElementEdit,
    ElementRestor,
  },
};
</script>

<style></style>
