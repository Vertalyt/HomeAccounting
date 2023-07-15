import { ref, onMounted, nextTick, onBeforeUnmount } from "vue";
import { useStore } from "vuex";
import { formatCurrency } from "../utills/filter/currency.filter";
import M from "materialize-css/dist/js/materialize.min.js";
import { useCatRestruct, fetchRecords, serviseDateRecords } from "../use/useSelectChange";
import { billType } from '../utills/ballanseOfType'


export function planningLogic() {
  const Loading = ref(true);
  const categories = ref([]);
  const store = useStore();
  const records = ref([]);
  const bill = ref();
  const credit = ref();
  const debit = ref();
  const cash = ref()
  const yearSelectRef = ref();
  const allCategories = ref([]);
  const transformedYears = ref([]);
  const transformedMonths = ref([]);
  const loadingDate = ref(false);
  const selectedMonth = ref([]);
  const selectedYear = ref(new Date().getFullYear());
  const materializeInstance = ref();
  const billCards = ref()

  
  function generateMonthList() {
    const selectedYearData = transformedYears.value.find((yearData) => yearData.year === selectedYear.value);
    if (selectedYearData) {
      transformedMonths.value = selectedYearData.month.sort((a, b) => a - b);
      selectedMonth.value = {
        month:
          transformedMonths.value[transformedMonths.value.length - 1] ||
          new Date().getMonth(),
      }.month;
    }
  }

  async function ollCategoryesFiltr(allCategories) {
    records.value = await fetchRecords(selectedYear.value, selectedMonth.value.month || selectedMonth.value);
    categories.value = useCatRestruct(allCategories, records);
  }
  
  onMounted(async () => {
    Loading.value = true;
    billCards.value = await store.getters["card/list"];
    billCards.value = billCards.value.filter(c => c.isDetected === false)

    if (billCards.value.length ) {
      credit.value = billType(billCards.value, 'credit')
      debit.value = billType(billCards.value, 'debit')
      cash.value = billType(billCards.value, 'cash')
      bill.value = Number(credit.value) + Number(debit.value) + Number(cash.value)
    }

    transformedYears.value = await serviseDateRecords()
    generateMonthList();

    let isDetectedData = await store.getters["categories/list"];
    if (!isDetectedData.length) {
      isDetectedData = await store.dispatch("categories/list");
    }
    allCategories.value = isDetectedData.filter(c => c.isDetected === false)

    await ollCategoryesFiltr(allCategories)


    nextTick(() => {
      setTimeout(() => {
        M.updateTextFields();
        materializeInstance.value = M.FormSelect.init(yearSelectRef.value);
      }, 0);
    });

    Loading.value = false;
  });

  const onMonthChange = async () => {
    loadingDate.value = true;
    setTimeout(async () => {
      await ollCategoryesFiltr(allCategories);
    }, 0);

    loadingDate.value = false;
  };

  const onYearChange = async () => {
    loadingDate.value = true;
    generateMonthList();
    await ollCategoryesFiltr(allCategories);
    loadingDate.value = false;
  };

  onBeforeUnmount(() => {
    if (materializeInstance.value && materializeInstance.value.destroy) {
      materializeInstance.value.destroy();
    }
  });

  return {
    Loading,
    categories,
    bill,
    formatCurrency,
    records,
    credit,
    debit,
    cash,
    yearSelectRef,
    selectedMonth,
    selectedYear,
    onMonthChange,
    transformedYears,
    onYearChange,
    transformedMonths,
    loadingDate,
    billCards,
    allCategories
  };
}
