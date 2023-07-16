import { formatCurrency } from '../utills/filter/currency.filter'
import store from "@/store";


// Function to restructure categories with additional information
export function useCatRestruct(ollCategories, records) {
  return ollCategories.value.map((cat) => {
    const spend = records.value
      .filter((r) => r.idParrent === cat.idParrent)
      .filter((r) => r.type === "outcome")
      .reduce((total, record) => {
        return total += Number(record.amount);
      }, 0);

    if (spend !== 0) {
      const percent = (spend * 100) / cat.limit;
      const progressPercent = `${percent > 100 ? 100 : percent}%`;
      const progressColor = percent < 60 ? "green" : percent < 100 ? "yellow" : "red";
      const tooltip = `${formatCurrency(cat.limit)} - ${formatCurrency(spend)} = ${formatCurrency(cat.limit - spend)}`;

      return {
        ...cat,
        progressPercent,
        progressColor,
        spend,
        tooltip,
      };
    }
    return null;
  }).filter((cat) => cat !== null);
}

// Function to fetch years and months with records from the store
export async function serviseDateRecords() {
  const yearsAndMonths = await store.dispatch("records/serviseDateRecords");
  let selectAdd = yearsAndMonths.map((date) => {
    const currentDate = new Date(date.day);
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    return { year, month };
  });

  const years = new Set();
  selectAdd.forEach((item) => {
    const year = item.year;
    if (!years.has(year)) {
      years.add(year);
    }
  });

  return selectAdd.reduce((acc, { year, month }) => {
    const existingYearEntry = acc.find((entry) => entry.year === year);

    if (existingYearEntry) {
      existingYearEntry.month.push(month.toString());
    } else {
      acc.push({
        year,
        month: [month.toString()],
      });
    }
    return acc;
  }, []);
}

// Function to fetch records based on selected year and month
export async function fetchRecords(selectedYear, params) {
  let records = await store.dispatch("records/listRecords", {
    yearModel: selectedYear,
    monthModel: params,
  });

  if (records.length) {
    records.sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  return records;
}
