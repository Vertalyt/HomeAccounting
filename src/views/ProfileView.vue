<template>
  <div>
    <div class="page-title">
      <h3>{{ getLocalizedText("profile-title") }}</h3>
    </div>

    <section>
      <ul class="collapsible" ref="collapsibleRef">
    <li>
      <div class="collapsible-header"><i class="material-icons">account_circle</i>Профіль</div>
      <div class="collapsible-body"><ProfileInfo :infoProfile="infoProfile"/></div>
    </li>
    <li >
      <div class="collapsible-header"><i class="material-icons">login</i>Активовані методи авторизації</div>
      <div class="collapsible-body"> <ActiveMethodAuth  :key="updateKeyAuth" :loginMetod="loginMetod" @updated="updateAuth" />
      </div></li>

    <li v-if="!passwordMetod || !googleMethod">
      <div class="collapsible-header"><i class="material-icons">rule_folder</i>Додати додатковий метод</div>
      <div class="collapsible-body"> 
        <LoginPasswordForm :key="updateKeyAuth" v-if="!passwordMetod" @updated="updateAuth" :dispatchOnSubmitLogin="dispatchOnSubmitLogin" :ButtonLogin="ButtonLogin" :titleLogin="titleLogin"/>     
        <form action="" @click.prevent ="googleAuth" v-if="!googleMethod" >
          <button class="btn">Прив'язати Google</button>
        </form>
      </div>
    </li>
    <li>
      <div class="collapsible-header"><i class="material-icons">credit_card</i>Створити карту</div>
      <div class="collapsible-body"><CardCreate :key="updateKey" @created="update"/></div>
    </li>
    <li>
      <div class="collapsible-header"><i class="material-icons">redeem</i>Редагувати карту</div>
      <div class="collapsible-body"><ElementEdit :key="updateKey"  @updated="update" :dispash="dispatchOnSubmitElement"/></div>
    </li>
    <li>
      <div class="collapsible-header"><i class="material-icons">credit_score</i>Відновити карту</div>
      <div class="collapsible-body"><ElementRestor :key="updateKey" :dispash="dispatchOnSubmitElement" @updated="update"/></div>
    </li>
  </ul>
  </section>

  </div>
</template>

<script>
import ProfileInfo from "../components/ProfileInfo.vue";
import ElementRestor from "../components/ElementRestor.vue";
import ElementEdit from "../components/ElementEdit.vue";
import LoginPasswordForm from "../components/LoginPasswordForm.vue";
import CardCreate from "../components/CardCreate.vue";
import ActiveMethodAuth from "../components/ActiveMethodAuth.vue";
import { useStore } from "vuex";
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { getLocalizedText } from '../locale'
import M from "materialize-css/dist/js/materialize.min.js";


export default {
  name: "ProfileView",
  setup() {
    const store = useStore();
    const infoProfile = store.getters["requests/clientInfo"];
    const updateCount = ref(0)
    const dispatchOnSubmitElement = 'card'
    const dispatchOnSubmitLogin = 'auth/addLoginPass'
    const ButtonLogin = 'addLoginPass'
    const titleLogin = 'AddLoginPassword'
    const loginMetod = ref()
    const passwordMetod = ref()
    const collapsibleRef = ref()
    const instances  = ref()
    const updateCountAyth = ref(0)
    const googleMethod = ref()

    const update = async () => {
      updateCount.value++;
    };

    const updateAuth = async () => {
      loginMetod.value = await store.dispatch('auth/verificationMethods') 
      passwordMetod.value = loginMetod.value.find(r => r.providerId === 'password')
      googleMethod.value = loginMetod.value.find(r => r.providerId === 'google.com')
      updateCountAyth.value++;
    }

    onMounted( async ()=> {
        loginMetod.value = await store.dispatch('auth/verificationMethods')
        passwordMetod.value = loginMetod.value.find(r => r.providerId === 'password')
        googleMethod.value = loginMetod.value.find(r => r.providerId === 'google.com')
        instances.value = M.Collapsible.init(collapsibleRef.value);
    })

    onBeforeUnmount(() => {
      if (instances.value && instances.value.destroy) {
        instances.value.destroy();
    }
    } )

    const googleAuth = async() => {
    await store.dispatch('auth/googleAddAuth')
    }

    return {
      getLocalizedText,
      infoProfile,
      update,
      updateKey: computed( () => updateCount.value),
      updateKeyAuth: computed( () => updateCountAyth.value),
      updateCount,
      dispatchOnSubmitElement,
      dispatchOnSubmitLogin,
      ButtonLogin,
      titleLogin,
      passwordMetod,
      loginMetod,
      collapsibleRef,
      updateAuth,
      googleAuth,
      googleMethod
    }
  },
  components: {
    ProfileInfo,
    CardCreate,
    ElementRestor,
    ElementEdit,
    LoginPasswordForm,
    ActiveMethodAuth
  }
};
</script>
