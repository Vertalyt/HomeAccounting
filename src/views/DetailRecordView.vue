<template>
  <AppLoading v-if="loading" />

  <p v-else-if="record.length === 0">{{ recordId }} {{ getLocalizedText("IdNotFound") }}</p>

  <div v-else>
    <div class="breadcrumb-wrap">
      <a href="/history" class="breadcrumb">{{ getLocalizedText("Menu_history") }}</a>
      <a class="breadcrumb"> {{ getLocalizedText("costs") }} </a>
    </div>
    <div class="row">
      <div class="col s12 m6">
        <div class="card" :class="record.recordClass">
          <div class="card-content white-text">
            <p>{{ getLocalizedText("description") }}: {{ record.description }}</p>
            <p>{{ getLocalizedText("amount") }}: {{ formatCurrency(record.amount) }}</p>
            <p>{{ getLocalizedText("categorуName") }}: {{ record.categoryName }}</p>
            <small>{{ dateFilter(record.date, "datetime") }}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { dateFilter } from "../utills/filter/data.filter";
import { formatCurrency } from "../utills/filter/currency.filter";
import AppLoading from "../components/app/AppLoading.vue";
import { getLocalizedText } from "@/locale";

export default {
  name: "DetailRecordView",
  setup() {
    const store = useStore();
    const route = useRoute();
    const recordId = computed(() => route.params.idRecord);
    const record = ref([]);
    const loading = ref(true);
    const category = ref([]);
    const rData = ref([]);


    onMounted(async () => {
      try {
        rData.value = await store.getters["records/listRecords"];

        if (!rData.value.length) {
          rData.value = await store.dispatch("records/listRecords");
        }

        if (rData.value.length) {
          rData.value = rData.value.find((r) => r.idRecord === recordId.value);

          if(rData.value) {
            category.value = await store.dispatch("categories/categoryById", {
            idParrent: rData.value.idParrent,
          });
          record.value = {
            ...rData.value,
            categoryName: category.value.title,
            recordClass: rData.value.type === "outcome" ? "red" : "green",
          };
          }

        }
        loading.value = false;
      } catch (error) {
        console.log(error);
      }
    });

    return {
      loading,
      record,
      dateFilter,
      formatCurrency,
      recordId,
      getLocalizedText,
    };
  },
  components: {
    AppLoading,
  },
};
</script>
