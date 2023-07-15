<template>
  <div class="col s12 m12">
    <form @submit.prevent="onSubmit" >

      <div class="input-field">
            <select ref="selectCard" v-model="current" required>
              <option value=""  disabled selected>{{ getLocalizedText("ChooseCardType") }}</option>
              <option value="debit"> {{ getLocalizedText("Debits") }} </option>
              <option value="credit"> {{ getLocalizedText("Credits") }} </option>
              <option value="cash"> {{ getLocalizedText("Сash") }} </option>
            </select>
      </div>


        <div class="input-field">
          <input
            id="nameCard"
            type="text"
            v-model="nValue"
            :class="{ invalid: nError }"
            @blur="nBlur"
          />
          <label for="nameCard">{{ getLocalizedText("NameRecord") }}</label>
          <span class="helper-text" :class="{ invalid: nError }">{{
            nError
          }}</span>
        </div>

        <div class="input-field">
          <input
            id="limitCard"
            type="number"
            v-model="lValue"
            :class="{ invalid: lError }"
            @blur="lBlur"
          />
          <label for="limitCard">{{ getLocalizedText("limit") }}</label>
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

    </form>
  </div>
</template>

<script>
import { cardCreatedLogic } from "../ui/cardCreatedLogic";

export default {
  name: "CardCreate",
  emits: ["created"],
  setup(_, { emit }) {
    return {
      ...cardCreatedLogic(_, { emit }),
    };
  },
};
</script>

<style scoped>
</style>