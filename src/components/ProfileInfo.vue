
<template>
      <div class="col s12 m12">

    <form @submit.prevent="onSubmit">
      <div class="card-content">

      <!-- <div class="input-field">
        <input
          id="nameProfile"
          type="text"
          v-model="nValue"
          :class="{ invalid: nError }"
          @blur="nBlur"
        />
        <label for="nameProfile">{{ getLocalizedText("name") }}</label>
        <span class="helper-text" :class="{ invalid: nError }">{{
          nError
        }}</span>
      </div> -->

      <div class="input-field" id="locale">
      <select ref="selectCategory" v-model="locale">

        <option v-for="l in localeFlag" :key="l.flag" :value="l.flag">{{ l.value }}</option>

      </select>
      <label>{{ getLocalizedText("localeSite") }}</label>
    </div>

      <button
        class="btn waves-effect waves-light"
        type="submit"
        :disabled="isSubmitting"
      >
      {{ getLocalizedText("refresh") }}
        <i class="material-icons right">send</i>
      </button>
    </div>
    </form>
    </div>

</template>

<script>
import { useStore } from "vuex";
import { useForm } from "vee-validate";
import { onMounted, onBeforeUnmount, ref } from "vue";
import M from "materialize-css/dist/js/materialize.min.js";
import { localeFlag, getLocalizedText } from '../locale'

export default {
  name: 'ProfileInfo',
  props:['infoProfile'],
  setup(props) {
    const state = useStore();
    const instance = ref();
    const selectCategory = ref();
    const locale = ref(props.infoProfile.locale)
    

    const { isSubmitting, handleSubmit } = useForm({
    });

    const onSubmit = handleSubmit(async () => {
      const update = {
        name: props.infoProfile.name,
        role: props.infoProfile.role,
        locale: locale.value
      }
      await state.dispatch("requests/updateInfo", update);
    });

    onMounted(() => {
      M.updateTextFields();
      instance.value = M.FormSelect.init(selectCategory.value);
    });

    onBeforeUnmount(() => {
      if (instance.value && instance.value.destroy) {
        instance.value.destroy();
      }
    });

    return {
      isSubmitting,
      onSubmit,
      selectCategory,
      localeFlag,
      locale,
      getLocalizedText,
    };
  },
}
</script>

