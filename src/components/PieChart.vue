
<template>
  <Pie
    id="my-chart-id"
    :options="chartOptions"
    :data="chartData"
  />
</template>

<script>
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)


export default {
  name: 'PieChart',
  props: ['categories', 'records'],
  setup(props) {
    
    const data = props.categories.map((cat) => {
     return props.records
      .filter( r => r.idParrent === cat.idParrent )
      .filter( r => r.type === 'outcome' )
      .reduce( (total, r) => {
        return total += Number(r.amount)
      }, 0)
    } )
    
    return {
      chartData: {
        labels: props.categories.map(c => c.title),
        datasets: [
          { 
            backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
            data,
          },
        ],
      },
      chartOptions: {
        responsive: true,
      },
    }
  },
  components: {
    Pie
  }
}
</script>

