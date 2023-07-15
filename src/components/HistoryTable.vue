<template>
    <table>
      <thead>
      <tr>
        <th>#</th>
        <th>{{ getLocalizedText("amount") }}</th>
        <th>{{ getLocalizedText("Date") }}</th>
        <th>{{ getLocalizedText("categorуName") }}</th>
        <th>{{ getLocalizedText("Type") }}</th>
        <th>{{ getLocalizedText("Open") }}</th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="(r, idx) in records" :key="r.idRecord">
        <td>{{ idx + 1 }}</td>
        <td>{{ formatCurrency(r.amount) }}</td>
        <td>{{ dateFilter(r.date) }}</td>
        <td>{{ r.categoryName }}</td>
        <td>
          <span class="white-text badge" :class="r.typeClass">{{ r.typeText }}</span>
        </td>
        <td>
            <routerLink :to="`/detail/${r.idRecord}`" class="btn-small btn">
              <i class="material-icons">open_in_new</i>
            </routerLink>
        </td>
      </tr>
      </tbody>
    </table>
</template>

<script>
import {  dateFilter } from '../utills/filter/data.filter'
import {  formatCurrency } from '../utills/filter/currency.filter'
import { getLocalizedText } from '@/locale'



export default {
  name: 'HistoryTable',
  props: ['records'],
  setup() {

    return {
      dateFilter,
      formatCurrency,
      getLocalizedText,
    }
  },
  components: {
  }
}
</script>

