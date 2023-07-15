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
        <label for="email">Email</label>
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

      <div class="input-field">
        <input
          id="name"
          type="text"
          class="validate"
          :class="{ invalid: nError }"
          v-model="nValue"
          @blur="nBlur"
        />
        <label for="name">{{ getLocalizedText("name") }}</label>
        <small class="helper-text" :class="{ invalid: nError }">{{
          nError
        }}</small>
      </div>

      <p>
        <label>
          <input type="checkbox" required />
          <span>{{ getLocalizedText("AgreeRules") }}</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
          :disabled="isSubmitting"
        >
        {{ getLocalizedText("SignUp") }}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{ getLocalizedText("AlreadyHaveAnAccount") }}
        <RouterLink to="/login">{{ getLocalizedText("Enter") }}</RouterLink>
      </p>
    </div>

  </form>


  <form @submit.prevent="GoogleAuth">
  <button type="submit" class="btn">Войти через гугл</button>
  </form>


</template>


<script>
import { registerFormLogic } from '../ui/RegisterFormLogic'

export default {
  name: "RegisterView",
  setup() {
    return {
      ...registerFormLogic(),
    }
  },
};
</script>
