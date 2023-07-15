import { useStore } from 'vuex'
import { computed } from 'vue'

export function dateFilter(value, format = 'date') {
    const options = {}
    const store = useStore()
    const screenWidth = computed( () => store.getters["screenWidth"])


try {
    if (format.includes("date")) {
        options.day = "2-digit";
          options.month = "long";
          if(screenWidth.value < 600) {
            options.month = "2-digit";
          }
          options.year = "2-digit";
      }

    if(format.includes('datetime')) {
        options.second = '2-digit'
        options.minute = '2-digit'
        options.hour = '2-digit'
    }

    const date = new Date(value)


    const locale = store.getters["requests/clientInfo"].locale || 'uk-UA'

    return new Intl.DateTimeFormat(locale, options).format(date)
} catch (error) {
    console.log(error);
}
}