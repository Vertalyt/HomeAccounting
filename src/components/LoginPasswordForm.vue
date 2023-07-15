<template>
  <form class="card auth-card" @submit.prevent="onSubmit">
    <div class="card-content">

      <span class="card-title" v-if="titleLogin">{{ getLocalizedText(titleLogin) }}</span>

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

      <div class="'input-field">
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
        {{ getLocalizedText(ButtonLogin) }}
          <i class="material-icons right">send</i>
        </button>
      </div>


      <p class="center" v-if="registerCheck">
        {{ getLocalizedText("NoAccount") }}
        <RouterLink to="/register"> {{ getLocalizedText("SignUp") }}</RouterLink>
      </p>
    </div>
  </form>
  
</template>

<script>
import { loginPasswordForm } from '../ui/loginPasswordForm'

export default {
  name: "LoginPasswordForm",
  emits:['updated'],
  props: {
    dispatchOnSubmitLogin: {
      type: String,
      requared: true
    },
    registerCheck: {
      type: Boolean,
      requared: false
    },
    titleLogin: {
      type: String,
      requared: false
    },
    ButtonLogin: {
      type: String,
      requared: true
    }
  },
  setup(props, {emit}) {
    return {
      ...loginPasswordForm(props, emit),
    }
  },
};
</script>
