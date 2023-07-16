<template>
  <form class="card auth-card" @submit.prevent="onSubmit">
    <div class="card-content">

        <span class="card-title">Відновити пароль</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model="eValue"
          :class="{ invalid: eError }"
          @blur="eBlur"
        />
        <label for="email">Email</label>
        <small class="helper-text" :class="{ invalid: eError }">{{
          eError
        }}</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
          :disabled="isSubmitting"
        >
        {{ getLocalizedText('refresh') }}
          <i class="material-icons right">send</i>
        </button>
      </div>
    </div>
  </form>
  
</template>

<script>

import { getLocalizedText } from '@/locale'
import { useStore } from "vuex";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { useRouter } from 'vue-router'

export default {
  name: "ResetView.vue",
  setup() {
    const store = useStore();
    const router = useRouter()
    const { isSubmitting, handleSubmit } = useForm();
    const {
      value: eValue,
      errorMessage: eError,
      handleBlur: eBlur,
    } = useField(
      "email",
      yup
        .string()
        .trim()
        .required(getLocalizedText("EnterEmail"))
        .email(getLocalizedText("MustBeValidEmail"))
    );

    const onSubmit = handleSubmit(async (val, { resetForm }) => {
      try {
        await store.dispatch('auth/resetPassword', { email: val.email});
          router.push('/login')
        resetForm();
      } catch (error) {
        /* empty */
      }
    });


    return {
      eValue,
      eError,
      eBlur,
      isSubmitting,
      onSubmit,
      getLocalizedText,
    };



  },
};
</script>