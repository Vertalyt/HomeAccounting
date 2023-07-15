<template>
  <form class="card auth-card" @submit.prevent="onSubmit">
    <div class="card-content">
      <span class="card-title">{{ getLocalizedText("HomeAccounting") }}</span>

      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model="eValue"
          :class="{ invalid: eError }"
          @blur="eBlur"
        />
        <label for="email">{{ getLocalizedText("Email") }}</label>
        <small class="helper-text" :class="{ invalid: eError }">{{
          eError
        }}</small>
      </div>

      <div class="input-field">
        <input
          id="password"
          type="password"
          class="validate"
          :class="{ invalid: pError }"
          v-model="pValue"
          @blur="pBlur"
        />
        <label for="password">{{ getLocalizedText("Password") }}</label>
        <small class="helper-text" :class="{ invalid: pError }">{{
          pError
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
        {{ getLocalizedText("Enter") }}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{ getLocalizedText("NoAccount") }}
        <RouterLink to="/register"> {{ getLocalizedText("SignUp") }}</RouterLink>
      </p>
    </div>
  </form>

  
</template>

<script>
import { loginFormLogic } from '../ui/loginFormLogic'
import { getLocalizedText } from '@/locale'

export default {
  name: "LoginView",

  setup() {
    return {
      ...loginFormLogic(),
      getLocalizedText
    }
  },
};
</script>
