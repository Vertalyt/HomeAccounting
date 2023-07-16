<template>
  <AppLoading v-if="loading" />

  <div class="app-main-layout" v-else>
    <AppNavbar @close="isOpen = !isOpen" :key="locale" />
    <AppSidenav :isOpen="isOpen" @close="mobClose" :key="locale" />

    <main class="app-content" :class="{ full: !isOpen }">
      <div class="app-page">
        <RouterView />
      </div>
    </main>

    <div class="fixed-action-btn">
      <Popper
        :hover="true"
        :content="getLocalizedText('CreatedRecord')"
        style="width: 100%"
      >
        <routerLink to="/record" class="btn-floating btn-large blue">
          <i class="large material-icons">add</i>
        </routerLink>
      </Popper>
    </div>
  </div>
</template>

<script>
import AppNavbar from "../components/app/AppNavbar.vue";
import AppSidenav from "../components/app/AppSidenav.vue";
// import AppMessage from "../components/app/AppMessage.vue";
import AppLoading from "../components/app/AppLoading.vue";
import { ref, onMounted, computed, watch } from "vue";
import { useStore } from "vuex";
import Popper from "vue3-popper";
import "@/assets/tooltip.css";
import { useWindowSize } from "../utills/useWindowSize";
import { getLocalizedText } from "@/locale";
import { useHasMatchRecord } from '../use/useHasMatchRecord'

export default {
  name: "MainLayout",
  setup() {
    const isOpen = ref(true);
    const loading = ref(true);
    const store = useStore();
    const locale = computed(() => store.getters["requests/clientInfo"].locale);


    useWindowSize();
    const screenWidth = computed(() => store.getters["screenWidth"]);

    isOpen.value = screenWidth.value >= 900;

    onMounted(async () => {
      await store.dispatch("requests/clientInfo");
      const list = await store.dispatch("card/list");

      if (list.length) {
        const hasMatch = await useHasMatchRecord()
      if (!hasMatch) {
        store.dispatch('card/updateListBill', list)
      }
      }


      loading.value = false;
    });

    watch(screenWidth, (val) => {
      isOpen.value = val >= 900;
    });

    const mobClose = () => {
      isOpen.value = screenWidth.value >= 600;
    };

    return {
      isOpen,
      loading,
      mobClose,
      getLocalizedText,
      locale,
    };
  },
  components: {
    AppNavbar,
    AppSidenav,
    // AppMessage,
    AppLoading,
    Popper,
  },
};
</script>
