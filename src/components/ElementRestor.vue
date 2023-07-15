<template>
  <div class="col s12 m12" v-if="selectData.length">
    <AppLoading v-if="loading" />
    <p v-else-if="!selectData.length">
      {{ getLocalizedText("selectDataNotFound") }}
      {{ getLocalizedText("AddPepper") }}
    </p>

    <div v-else>
        <form @submit.prevent="onSubmit">
          <div class="field">
          <div class="input-field">
            <select ref="selectRestor" v-model="current">
              <option
                v-for="c in selectData"
                :key="c.idParrent"
                :value="c.idParrent"
              >
                {{ c.title }}
              </option>
            </select>
            <label>{{ getLocalizedText("ChooseCategory") }}</label>
          </div>

          <div class="input-field">
            <button
              class="btn waves-effect waves-light"
              type="submit"
              :disabled="isSubmitting"
            >
            {{ getLocalizedText("Restore") }}
              <i class="material-icons right">send</i>
            </button>
          </div>
        </div>
        </form>

    </div>
  </div>
</template>

<script>
import { elementRestor } from "../ui/elementRestor";
import AppLoading from "../components/app/AppLoading.vue";
import { getLocalizedText } from "@/locale";

export default {
  name: "ElementRestor",
  emits: ["updated"],
  props: ['dispash'],
  setup(props, { emit }) {
    return {
      ...elementRestor(props, { emit }),
      getLocalizedText,
    };
  },
  components: {
    AppLoading,
  },
};
</script>

<style scoped>
/* .col {
  border: 1px solid rgb(218, 218, 218);
    border-radius: 10px;
    margin-bottom: 1rem;
} */
</style>
