// Import the Vuex store instance
import store from '../store'

// Function to check if there is a match record for the current year and month
export async function useHasMatchRecord() {
  // Dispatch the "records/serviseDateRecords" action to get the list of years and months with records from the Vuex store
  const yearsAndMonths = await store.dispatch("records/serviseDateRecords");
  
  // Map the list of years and months to an array of objects containing year and month information
  let selectAdd = yearsAndMonths.map((date) => {
    const currentDate = new Date(date.day);
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    return { year, month };
  });

  // Get the current year and month
  const date = new Date();
  const nuwYear = date.getFullYear();
  const nuwMonth = date.getMonth();

  // Check if there is a match record for the current year and month in the array of objects
  return selectAdd.some((d) => {
    return d.year === nuwYear && d.month === nuwMonth;
  });
}
