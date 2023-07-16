// Import necessary functions and libraries
import { ref, onMounted, nextTick, onBeforeUnmount } from "vue";
import { useStore } from "vuex";
import { formatCurrency } from "../utills/filter/currency.filter";
import M from "materialize-css/dist/js/materialize.min.js";
import { useCatRestruct, fetchRecords, serviseDateRecords } from "../use/useSelectChange";
import { billType } from '../utills/ballanseOfType'

// Define a logic function for planning page
export function planningLogic() {
  // Define and initialize reactive variables
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

  // Function to generate the list of months based on the selected year
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

  // Function to filter categories and fetch records
  async function ollCategoryesFiltr(allCategories) {
    records.value = await fetchRecords(selectedYear.value, selectedMonth.value.month || selectedMonth.value);
    categories.value = useCatRestruct(allCategories, records);
  }

  // Run this code when the component is mounted
  onMounted(async () => {
    Loading.value = true;
    // Get the list of bill cards from the Vuex store
    billCards.value = await store.getters["card/list"];
    billCards.value = billCards.value.filter(c => c.isDetected === false)

    // Calculate the total bill amount based on card types
    if (billCards.value.length) {
      credit.value = billType(billCards.value, 'credit')
      debit.value = billType(billCards.value, 'debit')
      cash.value = billType(billCards.value, 'cash')
      bill.value = Number(credit.value) + Number(debit.value) + Number(cash.value)
    }

    // Get the transformed years list and generate month list
    transformedYears.value = await serviseDateRecords()
    generateMonthList();

    // Get the list of categories from the Vuex store and filter out detected categories
    let isDetectedData = await store.getters["categories/list"];
    if (!isDetectedData.length) {
      isDetectedData = await store.dispatch("categories/list");
    }
    allCategories.value = isDetectedData.filter(c => c.isDetected === false)

    // Filter categories and fetch records for the selected month and year
    await ollCategoryesFiltr(allCategories)

    // Use nextTick and setTimeout to update the MaterializeCSS components after the DOM update
    nextTick(() => {
      setTimeout(() => {
        M.updateTextFields();
        materializeInstance.value = M.FormSelect.init(yearSelectRef.value);
      }, 0);
    });

    Loading.value = false;
  });

  // Function to handle month change
  const onMonthChange = async () => {
    loadingDate.value = true;
    setTimeout(async () => {
      await ollCategoryesFiltr(allCategories);
    }, 0);

    loadingDate.value = false;
  };

  // Function to handle year change
  const onYearChange = async () => {
    loadingDate.value = true;
    generateMonthList();
    await ollCategoryesFiltr(allCategories);
    loadingDate.value = false;
  };

  // Run this code before the component is unmounted
  onBeforeUnmount(() => {
    if (materializeInstance.value && materializeInstance.value.destroy) {
      materializeInstance.value.destroy();
    }
  });

  // Return the data and functions that will be used in the template
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
