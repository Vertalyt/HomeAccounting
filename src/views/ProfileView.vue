<template>
  <div>
    <div class="page-title">
      <h3>{{ getLocalizedText("profile-title") }}</h3>
    </div>
    <AppLoading  v-if="loading"/>
    <section v-else>
      <ul class="collapsible" ref="collapsibleRef">
    <li>
      <div class="collapsible-header"><i class="material-icons">account_circle</i>{{ getLocalizedText('profile-title') }}</div>
      <div class="collapsible-body"><ProfileInfo :infoProfile="infoProfile"/></div>
    </li>
    <li >
      <div class="collapsible-header"><i class="material-icons">login</i>{{ getLocalizedText('ActivatedAuthorizationMethods') }}</div>
      <div class="collapsible-body"> <ActiveMethodAuth  :key="updateKeyAuth" :loginMetod="loginMetod" @updated="updateAuth" />
      </div></li>

    <li v-if="!passwordMetod || !googleMethod">
      <div class="collapsible-header"><i class="material-icons">rule_folder</i>{{ getLocalizedText('AddendumMethod') }}</div>
      <div class="collapsible-body"> 
        <LoginPasswordForm :key="updateKeyAuth" v-if="!passwordMetod" @updated="updateAuth" :dispatchOnSubmitLogin="dispatchOnSubmitLogin" :ButtonLogin="ButtonLogin" :titleLogin="titleLogin"/>     
        <form action="" @click.prevent ="googleAuth" v-if="!googleMethod" >
          <button class="btn">{{ getLocalizedText('AddGoogle') }}</button>
        </form>
      </div>
    </li>
    <li>
      <div class="collapsible-header"><i class="material-icons">credit_card</i>{{ getLocalizedText('CreateCard') }}</div>
      <div class="collapsible-body"><CardCreate :key="updateKey" @created="update"/></div>
    </li>
    <li>
      <div class="collapsible-header"><i class="material-icons">redeem</i>{{ getLocalizedText('EditCard') }}</div>
      <div class="collapsible-body">
        <p v-if="!cardListEdit.length">{{ getLocalizedText('NoElementsToEdit') }}</p>
        <ElementEdit :key="updateKey"  @updated="update" :dispash="dispatchOnSubmitElement"/></div>
    </li>
    <li>
      <div class="collapsible-header"><i class="material-icons">credit_score</i>{{ getLocalizedText('RestoreCard') }}</div>
      <div class="collapsible-body">
        <p v-if="!cardListRestore.length">{{ getLocalizedText('NoElementsToRestor') }}</p>
      <ElementRestor :key="updateKey" :dispash="dispatchOnSubmitElement" @updated="update"/></div>
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
import AppLoading from '../components/app/AppLoading.vue'
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
    const loading = ref(true)
    const cardListRestore = ref([])
    const cardListEdit = ref([])

 

    async function mainParametrs () {
      loginMetod.value = await store.dispatch('auth/verificationMethods') 
      passwordMetod.value = loginMetod.value.find(r => r.providerId === 'password')
      googleMethod.value = loginMetod.value.find(r => r.providerId === 'google.com')
      }

      async function mainParametrsCard () {    
      const cardList = await store.getters['card/list']
      if (cardList.length) {
        cardListEdit.value = cardList.filter(c => c.isDetected === false)
        cardListRestore.value = cardList.filter(c => c.isDetected === true)
      }
      }

      const update = async () => {
      await mainParametrsCard()
      updateCount.value++;
    };

    const updateAuth = async () => {
      await mainParametrs()
      updateCountAyth.value++;
    }

    onMounted( async ()=> {
        loading.value = true
        await mainParametrs()
        await mainParametrsCard()
          setTimeout(() => {
            instances.value = M.Collapsible.init(collapsibleRef.value);
          }, 0);
        loading.value = false
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
      googleMethod,
      cardListEdit,
      loading,
      cardListRestore
    }
  },
  components: {
    ProfileInfo,
    CardCreate,
    ElementRestor,
    ElementEdit,
    LoginPasswordForm,
    ActiveMethodAuth,
    AppLoading
  }
};
</script>
