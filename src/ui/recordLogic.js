import { useStore } from "vuex";
import { ref, onMounted, nextTick, onBeforeUnmount } from "vue";
import M from "materialize-css/dist/js/materialize.min.js";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { getLocalizedText } from '@/locale'
import { useHasMatchRecord } from '../use/useHasMatchRecord'


export function recordLOgic() {
    const store = useStore();
    const loading = ref(true);
    const categories = ref([]);
    const instance = ref();
    const selectCategory = ref();
    const { isSubmitting, handleSubmit } = useForm();
    const current = ref();
    const cardModel = ref([])
    const selectCard = ref();
    const instanceCard = ref();
    const list = ref([])
    const MIN_LIMIT = 1;

    const {
      value: aValue,
      errorMessage: aError,
      handleBlur: aBlur,
    } = useField("amount", yup.number(getLocalizedText('OnlyNumbers'))
    .min(MIN_LIMIT, `${getLocalizedText('AmountCannotBeLower')}${MIN_LIMIT}.`)
    .required(getLocalizedText('AmountRequired')));

    const {
      value: dValue,
      errorMessage: dError,
      handleBlur: dBlur,
    } = useField("description", yup.string().trim().required());

    const { value: rValue } = useField("type");
    
    onMounted(async () => {
      let isDetectedCategory = await store.getters["categories/list"];
      if (!isDetectedCategory.length) {
        isDetectedCategory = await store.dispatch("categories/list");
      }
      if (isDetectedCategory.length) {
        categories.value = isDetectedCategory.filter(c => c.isDetected === false)
        if ( categories.value.length) {
          current.value = categories.value[0].idParrent;
        }
      }

      let isDetectedCard = await store.getters["card/list"];
      if (!isDetectedCard.length) {
       isDetectedCard = await store.dispatch("card/list");
      }

      if(isDetectedCard.length) {
        list.value = isDetectedCard.filter(c => c.isDetected === false)
        if (list.value.length) {
          cardModel.value = list.value[0].idParrent;
        }
      }
        loading.value = false;

        nextTick(() => {
        instance.value = M.FormSelect.init(selectCategory.value);
        instanceCard.value = M.FormSelect.init(selectCard.value);
      });
    });

    onBeforeUnmount(() => {
      if (instance.value && instance.value.destroy) {
        instance.value.destroy();
      }
      if (instanceCard.value && instanceCard.value.destroy) {
        instanceCard.value.destroy();
      }
    });

    const onSubmit = handleSubmit(async (val, { resetForm }) => {
      try {
        const cardById = list.value.find(c => c.idParrent === cardModel.value)

         const canCreateRecord = val.type === "income" || (val.type === "outcome" && val.amount < cardById.bill)

        if(canCreateRecord) {
          const update = val.type === "outcome" ? 
          cardById.bill - val.amount :
          cardById.bill + val.amount

          await store.dispatch('card/update', {
             ...cardById,
             bill: update
          })
          list.value = await store.getters["card/list"];

         await store.dispatch('records/addRecord', { ...val, idParrent: current.value, date: new Date().toJSON() })
        const hasMatch = await useHasMatchRecord()
          if (!hasMatch) {
            store.dispatch('records/updateServiseDateRecords');
          }

        } else {
          store.dispatch("setMessage", {
            type: "warning",
            value: `${getLocalizedText("NotMoney")} (${val.amount - cardById.limit})`,
          });
        }
        resetForm();

      } catch (error) {
        /* empty */
      }
    });

    return {
      categories,
      selectCategory,
      loading,
      aValue,
      aError,
      aBlur,
      dValue,
      dError,
      dBlur,
      rValue,
      isSubmitting,
      onSubmit,
      current,
      cardModel,
      list,
      selectCard,
      getLocalizedText
    };
}