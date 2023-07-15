import store from '../store'


export async function useHasMatchRecord() {
    const yearsAndMonths = await store.dispatch("records/serviseDateRecords");
    let selectAdd = yearsAndMonths.map((date) => {
      const currentDate = new Date(date.day);
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      return { year, month };
    });
    const date = new Date();
    const nuwYear = date.getFullYear();
    const nuwMonth = date.getMonth();
    return selectAdd.some((d) => {
      return d.year === nuwYear && d.month === nuwMonth;
    });
}