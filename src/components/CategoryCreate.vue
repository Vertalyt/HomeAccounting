<template>
  <div class="col s12 m12">
    <form @submit.prevent="onSubmit">
      <div class="field">
        <div class="input-field">
          <input
            id="nameCategory"
            type="text"
            v-model="nValue"
            :class="{ invalid: nError }"
            @blur="nBlur"
          />
          <label for="nameCategory">{{ getLocalizedText("NameRecord") }}</label>
          <span class="helper-text" :class="{ invalid: nError }">{{
            nError
          }}</span>
        </div>

        <div class="input-field">
          <input
            id="limitCategory"
            type="number"
            v-model="lValue"
            :class="{ invalid: lError }"
            @blur="lBlur"
          />
          <label for="limitCategory">{{ getLocalizedText("limit") }}</label>
          <span class="helper-text" :class="{ invalid: lError }">{{
            lError
          }}</span>
        </div>

        <div class="input-field">
          <button
            class="btn waves-effect waves-light"
            type="submit"
            :disabled="isSubmitting"
          >
            {{ getLocalizedText("Create") }}
            <i class="material-icons right">send</i>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { categoryCreatedLogic } from "../ui/category-created";

export default {
  name: "CategoryCreate",
  emits: ["created"],
  setup(_, { emit }) {
    return {
      ...categoryCreatedLogic(_, { emit }),
    };
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
