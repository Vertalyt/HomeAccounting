<template>
  <AppLoading v-if="loading" />

  <p v-else-if="!records.length">{{ getLocalizedText("RecordsNotFound") }}, <routerLink to="/record">{{ getLocalizedText("AddPepper") }}</routerLink></p>

  <div v-else>
    <div class="page-title">
      <h3>{{ getLocalizedText("HistoryNotes") }}</h3>
    </div>

    <div class="history-chart">
      <PieChart :categories="categories" :records="ollRecord" :key="ollRecord"/>
    </div>

    <div class="row">
      <div class="input-field col s6">
      <select
        ref="yearSelectRef"
        v-model="selectedYear"
        required
        @change.prevent="onYearChange"
      >
        <option :value="yearData.year" v-for="yearData in transformedYears" :key="yearData.year">
          {{ yearData.year }}
        </option>
      </select>
    </div>

    <SelectPlanningMonth :key="selectedYear" v-model="selectedMonth" @onChange="onMonthChange" :transformedDataMonth="transformedMonths" />

    </div>


    <section>
      <AppLoading v-if="loadingDate" />
<div v-else>
  <HistoryTable :records="items" :key="selectedYear + selectedMonth + counter"/>
      <paginate
        :key="selectedYear + selectedMonth"
        v-model="page"
        :page-count="pageCount"
        :click-handler="clickHandler"
        :prev-text="getLocalizedText('Next')"
        :next-text="getLocalizedText('Back')"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
      >
      </paginate>
</div>

    </section>
  </div>
</template>

<script>
import AppLoading from "../components/app/AppLoading.vue";
import HistoryTable from "../components/HistoryTable.vue";
import Paginate from "vuejs-paginate-next";
import PieChart from '../components/PieChart.vue'
import { historyLogic } from '../ui/historyLogic'
import { getLocalizedText } from '@/locale'
import SelectPlanningMonth from '../components/SelectPlanningMonth.vue'

export default {
  name: "HistoryView",
  setup() {
    return {
      ...historyLogic(),
      getLocalizedText
    }
  },
  components: {
    AppLoading,
    HistoryTable,
    Paginate,
    PieChart,
    SelectPlanningMonth
  },
};
</script>
