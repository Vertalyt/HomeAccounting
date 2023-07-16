import { onMounted, ref, onBeforeUnmount, nextTick, watch } from "vue";
import M from "materialize-css/dist/js/materialize.min.js";
import { useStore } from "vuex";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { getLocalizedText } from '@/locale'

export function elementEditLogic(props, {emit}) {
    const selectRestor = ref();
    const instance = ref();
    const store = useStore();
    const selectData = ref([]);
    const current = ref();
    const loading = ref(true) 
    const cValue = ref(false)
    const MIN_LIMIT = 500;
    const { isSubmitting, handleSubmit } = useForm();
    const isDetectedData = ref()
    
    const {
      value: nValue,
      errorMessage: nError,
      handleBlur: nBlur,
    } = useField(
      "name",
      yup.string().trim().required(getLocalizedText("EnterCategoryName"))
    );

    const {
      value: lValue,
      errorMessage: lError,
      handleBlur: lBlur,
    } = useField(
      "limit",
      yup
        .number()
        .required(getLocalizedText("EnterLimit"))
        .min(MIN_LIMIT, `${getLocalizedText("LimitCannotBeLess")} ${MIN_LIMIT}.`)
    );


    onMounted(async () => {
      
      isDetectedData.value  = await store.dispatch(`${props.dispash}/list`);     
      if(isDetectedData.value.length) {
        selectData.value = isDetectedData.value.filter(c => c.isDetected === false)
        if(selectData.value.length) {
          current.value = selectData.value[0].idParrent;
          lValue.value = selectData.value[0].limit;
          nValue.value = selectData.value[0].title
        }

        nextTick(() => {
          M.updateTextFields();
          instance.value = M.FormSelect.init(selectRestor.value);
        });
      }
      loading.value = false
    });

    watch(current, (val) => {
        const newDate = selectData.value.filter(item => item.idParrent === val)
        lValue.value = newDate[0].limit;
        nValue.value = newDate[0].title
    })

    const onSubmit = handleSubmit(async (val) => {
      try { 

        const isById = isDetectedData.value.find( c => c.idParrent === current.value )
        await store.dispatch(`${props.dispash}/update`, { ...isById, title: val.name, limit: val.limit, isDetected: cValue.value })
        emit('updated')
      } catch (error) {
        /* empty */
      }
    });


    onBeforeUnmount(() => {
      if (instance.value && instance.value.destroy) {
        instance.value.destroy();
      }
    });

    return {
      selectRestor,
      selectData,
      current,
      onSubmit,
      isSubmitting,
      nValue,
      nError,
      nBlur,
      lValue,
      lError,
      lBlur,
      loading,
      getLocalizedText,
      cValue
    };
}