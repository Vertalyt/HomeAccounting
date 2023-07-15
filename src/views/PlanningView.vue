<template>


  <AppLoading v-if="Loading" />

  <p v-else-if="!billCards.length">{{ getLocalizedText("CardNotFound") }}<routerLink to="/profile">{{ getLocalizedText("AddPepper") }} </routerLink></p>
  <p v-else-if="!records.length">
    {{ getLocalizedText("recordsNotFound") }}
    <router-link to="/record">{{ getLocalizedText("add") }}</router-link>
  </p>
  <p v-else-if="!allCategories.length">
    {{ getLocalizedText("categoriesNotFound") }}
    <router-link to="/categories">{{ getLocalizedText("add") }}</router-link>
  </p>

  <p v-else-if="!categories.length">
    {{ getLocalizedText('SpendingTransactionsYet')  }}
    <router-link to="/record">{{ getLocalizedText("add") }}</router-link>
  </p>

  <div v-else>
    <div class="page-title">
      <div>
        <h3>{{ getLocalizedText("menuPlanning") }}</h3>
      </div>
      <div>
        <h5>{{ getLocalizedText("Total") }}: {{ formatCurrency(bill) }}</h5>
        <h6 v-if="debit !== 0">{{ getLocalizedText("Debits") }}: {{ formatCurrency(debit) }}</h6>
        <h6 v-if="credit !== 0">{{ getLocalizedText("Credits") }}: {{ formatCurrency(credit) }}</h6>
        <h6 v-if="cash !== 0">{{ getLocalizedText("Сash") }}: {{ formatCurrency(cash) }}</h6>
      </div>
    </div>

    <div class="row">
      <div class="input-field col s6">
      <select
        ref="yearSelectRef"
        v-model="selectedYear"
        required
        @change.prevent="onYearChange"

      >  <option value=""  disabled selected>{{ getLocalizedText("SelectAYear") }}</option>
        <option :value="yearData.year" v-for="yearData in transformedYears" :key="yearData.year">
          {{ yearData.year }}
        </option>
      </select>
    </div>


    <SelectPlanningMonth :key="selectedYear" v-model="selectedMonth" @onChange="onMonthChange" :transformedDataMonth="transformedMonths" />

    </div>

    <section>
      <AppLoading v-if="loadingDate" />
      <PlanningProgress :categories="categories" :key="categories.length + selectedYear" />
    </section>
  </div>
</template>

<script>
import AppLoading from "../components/app/AppLoading.vue";
import { planningLogic } from "../ui/planningLogic";
import SelectPlanningMonth from '../components/SelectPlanningMonth.vue'
import { getLocalizedText } from "@/locale";
import PlanningProgress from "../components/PlanningProgress.vue";


export default {
  name: "PlanningView",
  setup() {

    return {
      ...planningLogic(),
      getLocalizedText,
    };
  },
  components: {
    AppLoading,
    PlanningProgress,
    SelectPlanningMonth
  },
};
</script>
