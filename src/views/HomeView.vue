<template>
  <div class="page-title">
    <h3>{{ getLocalizedText("account") }}</h3>

    <button
      class="btn waves-effect waves-light btn-small"
      @click.prevent="refresh"
    >
      <i class="material-icons">refresh</i>
    </button>
  </div>

  <AppLoading v-if="loading" />

  <div v-else>
    <div class="row">
      <CardList v-if="card.length" :card="card"/>
    </div>

    <div class="row">
      <HomeBill :curses="curses" v-if="billCards"/>
      <HomeCurrency :curses="curses" v-if="curses"/>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { onMounted, ref, computed } from "vue";
import AppLoading from "../components/app/AppLoading.vue";
import HomeCurrency from "../components/HomeCurrency.vue";
import HomeBill from "../components/HomeBill.vue";
import CardList from "../components/CardList.vue";
import { getLocalizedText } from "../locale";

export default {
  name: "HomeView",
  setup() {
    const store = useStore();
    const loading = ref(true);
    const curses = ref([]);
    const refresh = ref();
    const billCards = ref(computed(() => store.getters["card/list"] ))
    const card = ref([])

    onMounted(
      (refresh.value = async () => {
        loading.value = true;
        curses.value = await store.dispatch("requests/cursCurrensy");
        card.value = billCards.value.filter(c => c.isDetected === false)
        loading.value = false;
      })
    );

    return {
      loading,
      curses,
      refresh,
      getLocalizedText,
      billCards,
      card
    };
  },
  components: {
    AppLoading,
    HomeCurrency,
    HomeBill,
    CardList
  },
};
</script>
