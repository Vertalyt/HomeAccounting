import { onMounted, ref, onBeforeUnmount, nextTick } from "vue";
import M from "materialize-css/dist/js/materialize.min.js";
import { useStore } from "vuex";
import { getLocalizedText } from '@/locale'
import { useForm } from "vee-validate";

export function elementRestor(props, {emit}) {
    const selectRestor = ref();
    const instance = ref();
    const store = useStore();
    const selectData = ref([]);
    const current = ref();
    const loading = ref(true) 
    const cValue = ref(false)
    const isDetectedData = ref()
    const { isSubmitting, } = useForm();

    onMounted(async () => {
      isDetectedData.value  = await store.dispatch(`${props.dispash}/list`);     


      if(isDetectedData.value.length) {
        selectData.value = isDetectedData.value.filter(c => c.isDetected === true)
        if (selectData.value.length) {
          current.value = selectData.value[0].idParrent;
        }
        nextTick(() => {
          setTimeout(() => {
            M.updateTextFields();
            instance.value = M.FormSelect.init(selectRestor.value);
          }, 0);
        });
      }
      loading.value = false
    });

    const onSubmit =(async () => {
      try { 
       const isById = isDetectedData.value.find( c => c.idParrent === current.value )
        await store.dispatch(`${props.dispash}/update`, { ...isById, isDetected: false })
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
      loading,
      getLocalizedText,
      cValue
    };
}