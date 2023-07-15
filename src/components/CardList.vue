<template>
  <div class="col s12 m12 l12">
      <div class="card-content black-text">

        <table class="striped highlight centered teal lighten-4" ref="cardTableRef" :class="{ 'responsive-table': responziveTableFlag }">
        <thead>
          <tr>
              <th> {{ getLocalizedText('CardName') }} </th>
              <th>{{ getLocalizedText('Balance') }}</th>
              <th>{{ getLocalizedText('Type') }}:</th>
              <th v-if="linkShow">{{ getLocalizedText('Edit') }}:</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="c in card" :key="c.idParrent">
            <td>{{ c.title }}</td>
            <td>{{ formatCurrency(c.bill) }}</td>
            <td>{{ cardType[c.type] }}</td>
            <td v-if="linkShow">
              <Popper
        :hover="true"
        :content="getLocalizedText('EditCard')"
        style="width: 100%"
      >
            <routerLink to="/profile" class="btn-small btn">
              <i class="material-icons">open_in_new</i>
            </routerLink>
          </Popper>
        </td>
          </tr>
        </tbody>
      </table>

      </div>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue'
import { useStore } from "vuex";
import Popper from "vue3-popper";
import { formatCurrency } from '../utills/filter/currency.filter'
import { getLocalizedText } from '@/locale'

export default {
  name: "CardList",
  props: ['card'],
  setup() {
    const store = useStore();
    const screenWidth = computed(() => store.getters["screenWidth"]);
    const linkShow = ref(true)
    const responziveTableFlag = ref(false)
    const cardTableRef = ref(100)
    linkShow.value = screenWidth.value >= 600;

    watch(screenWidth, (val) => {
      linkShow.value = val >= 600;
    });

    const cardType = {
      'debit': getLocalizedText('Debits'),
      'credit': getLocalizedText('Credits'),
      'cash': getLocalizedText('Сash'),
    }

    onMounted( () => {
      const elmnt = cardTableRef.value
      responziveTableFlag.value = elmnt.offsetWidth > screenWidth.value
    } )

    return {
      cardType,
      formatCurrency,
      linkShow,
      cardTableRef,
      responziveTableFlag,
      getLocalizedText
    };
  },
  components: {
    Popper
  }
};
</script>

<style scoped>
table {
    border: 1px solid rgb(218, 218, 218);
    border-radius: 10px;
    margin-bottom: 1rem;
    border-collapse: inherit;
}
</style>