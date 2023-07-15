
<template>
    <div class="input-field col s6">
      <select
        ref="refMonth"
        v-model="month"
        required
        @change.prevent="$emit('onChange')"
      >

        <option :value="m" v-for="m in transformedDataMonth" :key="m">
          {{ nameMounth[m].name }}
        </option>
      </select>

    </div>
</template>

<script>
import {ref, watch, onMounted, onBeforeUnmount } from "vue";
import M from "materialize-css/dist/js/materialize.min.js";
import { getLocalizedText } from "@/locale";


export default {
  name: 'SelectPlanningMonth',

  props:['modelValue', 'transformedDataMonth'],
  emits:['onChange', 'update:modelValue'],
  setup(props, {emit}) {
    const month = ref(props.modelValue)
    const refMonth = ref()
    const instanceRefMonth = ref()
    
    onMounted(() => {
      M.updateTextFields();
      instanceRefMonth.value = M.FormSelect.init(refMonth.value);
    })

    onBeforeUnmount(() => {
      if (instanceRefMonth.value && instanceRefMonth.value.destroy) {
        instanceRefMonth.value.destroy();
      }
    });


  const nameMounth = [
    { name: getLocalizedText("January") },
    { name: getLocalizedText("February") },
    { name: getLocalizedText("March") },
    { name: getLocalizedText("April") },
    { name: getLocalizedText("May") },
    { name: getLocalizedText("June") },
    { name: getLocalizedText("July") },
    { name: getLocalizedText("August") },
    { name: getLocalizedText("September") },
    { name: getLocalizedText("October") },
    { name: getLocalizedText("November") },
    { name: getLocalizedText("December") },
  ];

  watch(month, val => {
      emit( 'update:modelValue', {
        month:val
      } )
    })

    return {
      nameMounth,
      month,
      refMonth,
      getLocalizedText
    }
  },
}
</script>

