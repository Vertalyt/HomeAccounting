<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">{{ getLocalizedText("AccountCurrency") }}</span>

        <p class="currency-line">
          <span> {{ formatCurrency(bill) }} </span>
        </p>

        <p class="currency-line" v-for="c in curses" :key="c.cc">
          <span> {{ formatCurrency(getCurrency(c.rate), c.cc) }} </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ref, computed } from "vue";
import { formatCurrency } from '../utills/filter/currency.filter'
import { getLocalizedText } from '@/locale'
import { billType } from '../utills/ballanseOfType'

export default {
  name: "HomeBill",
  props: {
    curses: {
      type: Array,
      requared: true,
    },
  },
  setup() {
    const store = useStore();
    const billCards = ref(computed(() => store.getters["card/list"] ))


    const cardDetected = billCards.value.filter(c => c.isDetected === false)
    

    const credit = billType(cardDetected, 'credit')
    const debit = billType(cardDetected, 'debit')
    const cash = billType(cardDetected, 'cash')

    const bill = Number(credit) + Number(debit) + Number(cash)

    function getCurrency(curs) {
            return Math.round(bill / curs)
        }

    return {
      bill,
      getCurrency,
      formatCurrency,
      getLocalizedText
    };
  },
};
</script>
