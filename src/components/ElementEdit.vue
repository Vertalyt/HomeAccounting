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
            <input
              type="text"
              id="name"
              v-model="nValue"
              :class="{ invalid: nError }"
              @blur="nBlur"
            />
            <label for="name">{{ getLocalizedText("NewNameCategory") }}</label>
            <span class="helper-text" :class="{ invalid: nError }">{{
              nError
            }}</span>
          </div>

          <div class="input-field">
            <input
              id="limit"
              type="number"
              v-model="lValue"
              :class="{ invalid: lError }"
              @blur="lBlur"
            />
            <label for="limit">{{ getLocalizedText("limit") }}</label>
            <span class="helper-text" :class="{ invalid: lError }">{{
              lError
            }}</span>
          </div>

          <p>
            <label class="right">
              <input
                type="checkbox"
                id="deleteChexbox"
                class="filled-in"
                v-model="cValue"
              />
              <span>{{ getLocalizedText("Hide") }}</span>
            </label>
          </p>
          <div class="input-field">
            <button
              class="btn waves-effect waves-light"
              type="submit"
              :disabled="isSubmitting"
            >
              {{ getLocalizedText("refresh") }}
              <i class="material-icons right">send</i>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { elementEditLogic } from "../ui/elementEditLogic";
import AppLoading from "../components/app/AppLoading.vue";

export default {
  name: "ElementEdit",
  emits: ["updated"],
  props: ['dispash'],
  setup(props, { emit }) {
    return {
      ...elementEditLogic(props, { emit }),
    };
  },
  components: {
    AppLoading,
  },
};
</script>

<style scoped>
[type="checkbox"].filled-in:checked + span:not(.lever):after {
  border: 2px solid #c77e7e;
  background-color: #c77e7e;
}
/* .col {
  border: 1px solid rgb(218, 218, 218);
    border-radius: 10px;
    margin-bottom: 1rem;
} */
</style>
