// Import necessary functions and libraries
import { ref, onMounted, nextTick, onBeforeUnmount } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import _ from "lodash";
import M from "materialize-css/dist/js/materialize.min.js";
import { serviseDateRecords, fetchRecords } from "../use/useSelectChange";

// Define a logic function for history page
export function historyLogic() {
  // Define and initialize reactive variables
  const loading = ref(true);
  const categories = ref([]);
  const store = useStore();
  const records = ref([]);
  const page = ref(1);
  const router = useRouter();
  const route = useRoute();
  const pageSize = 5;
  const pageCount = ref(0);
  const items = ref([]);
  const ollRecord = ref([]);
  const selectedMonth = ref();
  const selectedYear = ref(new Date().getFullYear());
  const transformedMonths = ref([]);
  const transformedYears = ref([]);
  const loadingDate = ref(false);
  const materializeInstance = ref();
  const yearSelectRef = ref();
  const ollCategories = ref();
  const counter = ref(0);

  // Function to generate the list of months based on the selected year
  function generateMonthList() {
    const selectedYearData = transformedYears.value.find(
      (yearData) => yearData.year === selectedYear.value
    );
    if (selectedYearData) {
      transformedMonths.value = selectedYearData.month.sort((a, b) => a - b);

      selectedMonth.value = {
        month:
          transformedMonths.value[transformedMonths.value.length - 1] ||
          new Date().getMonth(),
      }.month;
    }
  }

  // Function to fetch records and categories, and set up pagination
  async function recordsLists() {
    ollCategories.value = await store.dispatch("categories/list");
    if (records.value.length) {
      categories.value = ollCategories.value
        .filter((category) => {
          return records.value.some(
            (record) => record.idParrent === category.idParrent
          );
        })
        .filter(Boolean);
      if (categories.value.length) {
        ollRecord.value = records.value
          .map((r) => {
            return {
              ...r,
              categoryName: categories.value.find(
                (f) => f.idParrent === r.idParrent
              ).title,
              typeClass: r.type === "income" ? "green" : "red",
              typeText: r.type === "income" ? "+" : "-",
            };
          })
          .sort((a, b) => new Date(b.date) - new Date(a.date));
        records.value = _.chunk(ollRecord.value, pageSize);
        items.value = records.value[page.value - 1] || records.value[0];
        pageCount.value = _.size(records.value);
      }
    }

    nextTick(() => {
      setTimeout(() => {
        M.updateTextFields();
        materializeInstance.value = M.FormSelect.init(yearSelectRef.value);
      }, 0);
    });
  }

  // Run this code when the component is mounted
  onMounted(async () => {
    transformedYears.value = await serviseDateRecords();
    generateMonthList();
    records.value = await fetchRecords(selectedYear.value, selectedMonth.value);
    await recordsLists();
    loading.value = false;
  });

  // Function to handle clicking on pagination links
  function clickHandler() {
    router.push(`${route.path}?page=${page.value}`);
    items.value = records.value[page.value - 1] || records.value[0];
  }

  // Function to handle month change
  const onMonthChange = async () => {
    loadingDate.value = true;
    setTimeout(async () => {
      records.value = await fetchRecords(
        selectedYear.value,
        selectedMonth.value.month || selectedMonth.value
      );
      await recordsLists();
    }, 0);
    loadingDate.value = false;
  };

  // Function to handle year change
  const onYearChange = async () => {
    loadingDate.value = true;
    counter.value++;
    generateMonthList();
    records.value = await fetchRecords(selectedYear.value, selectedMonth.value);
    await recordsLists();
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
    loading,
    items,
    clickHandler,
    page,
    pageCount,
    categories,
    ollRecord,
    records,
    selectedYear,
    selectedMonth,
    transformedMonths,
    transformedYears,
    onMonthChange,
    yearSelectRef,
    onYearChange,
    loadingDate,
    counter,
  };
}
