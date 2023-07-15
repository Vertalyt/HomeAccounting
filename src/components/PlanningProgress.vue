
<template>
      <div v-for="c in categories" :key="c.idParrent">
        <Popper :hover="true" :content="c.tooltip" style="width: 100%">
          <div>
            <p>
              <strong>{{ c.title }}:</strong>
              {{ c.spend }} / {{ c.limit }}
            </p>
            <div class="progress">
              <div
                class="determinate"
                :class="c.progressColor"
                :style="{ width: c.progressPercent }"
              ></div>
            </div>
          </div>
        </Popper>
      </div>
</template>

<script>
import Popper from "vue3-popper";
import "@/assets/tooltip.css";

export default {
  name: 'PlanningProgress',
  props: ['categories'],
  setup() {
    return {
    }
  },
  components: {
    Popper,
  }
}
</script>

