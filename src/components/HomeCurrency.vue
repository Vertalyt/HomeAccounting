
<template>
    <div class="col s12 m6 l8">
      <div class="card orange darken-3 bill-card">
        <div class="card-content white-text">
          <div class="card-header">
            <span class="card-title">{{ getLocalizedText('ExchangeRate') }}</span>
          </div>
          <table>
            <thead>
            <tr>
              <th>{{ getLocalizedText('Currency') }}</th>
              <th>{{ getLocalizedText('Course') }}</th>
              <th>{{ getLocalizedText('Date') }}</th>
            </tr>
            </thead>

            <tbody>
            <tr v-for="c in curses" :key="c.cc">
              <td>{{ c.cc }}</td>
              <td>{{ formatCurrency(c.rate) }}</td>
              <td>{{ dateFilter(c.exchangedate) }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
</template>

<script>
import { dateFilter } from '../utills/filter/data.filter'
import { formatCurrency } from '../utills/filter/currency.filter'
import { getLocalizedText } from '@/locale'

export default {
  name: 'HomeCurrency',
  props: {
    curses: {
      type: Array,
      requared: true
    }
  },
  setup() {
    return {
      dateFilter,
      formatCurrency,
      getLocalizedText
    }
  },
}
</script>

