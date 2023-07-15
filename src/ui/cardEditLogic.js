import { onMounted, ref, onBeforeUnmount, nextTick, watch } from "vue";
import M from "materialize-css/dist/js/materialize.min.js";
import { useStore } from "vuex";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { getLocalizedText } from '@/locale'



export function cardEditLogic(_, {emit}) {
    const selectCard = ref();
    const instance = ref();
    const store = useStore();
    const card = ref([]);
    const current = ref();
    const loading = ref(true) 
    const cValue = ref(false)

    const MIN_LIMIT = 100;
    const { isSubmitting, handleSubmit } = useForm();

    const {
      value: nValue,
      errorMessage: nError,
      handleBlur: nBlur,
    } = useField(
      "name",
      yup.string().trim().required(getLocalizedText('ChooseCardName'))
    );

    const {
      value: lValue,
      errorMessage: lError,
      handleBlur: lBlur,
    } = useField(
      "limit",
      yup
        .number()
        .required('Вкажіть ліміт карти')
        .min(MIN_LIMIT, `Ліміт не може бути нижчий за ${MIN_LIMIT}.`)
    );


    onMounted(async () => {
      const isDetectedData  = await store.dispatch("card/list");     
      if(isDetectedData.length) {
        card.value = isDetectedData.filter(c => c.isDetected === false)
        if (card.value.length ) {
          current.value = card.value[0].idParrent;
          lValue.value = card.value[0].limit;
          nValue.value = card.value[0].title
        }
        nextTick(() => {
          M.updateTextFields();
          instance.value = M.FormSelect.init(selectCard.value);
        });
      }
      loading.value = false
    });

    watch(current, (val) => {
      const newDate = card.value.filter(item => item.idParrent === val)
      lValue.value = newDate[0].limit;
      nValue.value = newDate[0].title
    })

    const onSubmit = handleSubmit(async (val) => {
      try { 
        const isId = card.value.find(c => c.idParrent === current.value)
        const update = { title: val.name, bill: val.limit, idParrent: current.value, isDetected: cValue.value, type: isId.type, limit:
          isId.limit }
        await store.dispatch('card/update', update)
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
      selectCard,
      card,
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