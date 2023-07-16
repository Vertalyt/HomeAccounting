<template>
  <LoginPasswordForm  :dispatchOnSubmitLogin="dispatchOnSubmitLogin" :loginCheck="loginCheck" :titleLogin="titleLogin" :ButtonLogin="ButtonLogin"/>

  <form @submit.prevent="GoogleAuth">
  <button type="submit" class="btn">Войти через гугл</button>
  </form>
  
</template>

<script>
import  LoginPasswordForm from '../components/LoginPasswordForm.vue'
import { getLocalizedText } from '@/locale'
import { useStore } from "vuex";
import { onMounted } from "vue";
import { getAuth } from "firebase/auth";

export default {
  name: "LoginView",
  setup() {
    const store = useStore();
    const dispatchOnSubmitLogin = 'auth/login'
    const loginCheck = true
    const titleLogin = 'HomeAccounting'
    const ButtonLogin = 'Enter'

    onMounted( () => {
      const auth = getAuth();
      const authUser = auth.currentUser
      if (authUser) {
              store.dispatch('auth/redirectResult')
      }
    } )
    const GoogleAuth = async() => {
      try {
        store.dispatch('auth/googleAuth')
      } catch (error) {
        /* empty */
      }
    }
    return {
      getLocalizedText,
      GoogleAuth,
      dispatchOnSubmitLogin,
      loginCheck,
      titleLogin,
      ButtonLogin
    };
  },
  components: {
    LoginPasswordForm
  }
};
</script>