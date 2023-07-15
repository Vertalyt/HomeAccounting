<template>
    <AppLoading v-if="loading" />


    <p v-else-if="!list.length">{{ getLocalizedText("CardNotFound") }}<routerLink to="/profile">{{ getLocalizedText("AddPepper") }} </routerLink></p>
    <p v-else-if="!categories.length">{{ getLocalizedText("categoriesNotFound") }} <routerLink to="/categories">{{ getLocalizedText("AddPepper") }} </routerLink></p>
    
    <div v-else>
    <div class="page-title">
      <h3>{{ getLocalizedText("Menu_record") }}</h3>
    </div>

    <form class="form"  @submit.prevent="onSubmit">

      <div class="input-field">
        <select ref="selectCategory" v-model="current">
          <option v-for="c in categories" :key="c.idParrent" :value="c.idParrent">
            {{ c.title }}
          </option>
        </select>
        <label>{{ getLocalizedText("ChooseCategory") }}</label>
      </div>

      <div class="input-field" v-if="list.length">
            <select ref="selectCard" v-model="cardModel" required>
              <option
                v-for="c in list"
                :key="c.idParrent"
                :value="c.idParrent"
              >
                {{ c.title }}
              </option>
            </select>
            <label>{{ getLocalizedText("WriteOffCard") }}</label>
      </div>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" required value="income" v-model="rValue"/>
          <span>{{ getLocalizedText("income") }}</span>
        </label>
      </p>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" required value="outcome" v-model="rValue"/>
          <span>{{ getLocalizedText("costs") }}</span>
        </label>
      </p>

      <div class="input-field">
        <input 
        id="amount" 
        type="number"
        :class="{ invalid: aError }"
          v-model="aValue"
          @blur="aBlur"
         />
        <label for="amount">{{ getLocalizedText("amount") }}</label>
        <small class="helper-text" :class="{ invalid: aError }">{{
          aError
        }}</small>
      </div>

      <div class="input-field">
        <input 
        id="description" 
        type="text"
        :class="{ invalid: dError }"
          v-model="dValue"
          @blur="dBlur"
         />
        <label for="description">{{ getLocalizedText("description") }}</label>
        <small class="helper-text" :class="{ invalid: dError }">{{
          dError
        }}</small>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ getLocalizedText("Create") }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import AppLoading from "../components/app/AppLoading.vue";
import { recordLOgic } from '../ui/recordLogic'

export default {
  name: "RecordView",
  setup() {
    return {
      ...recordLOgic(),
    }
  },
  components: {
    AppLoading,
  },
};
</script>
