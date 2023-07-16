// Import necessary functions and libraries
import { useStore } from "vuex";
import { ref, onMounted, nextTick, onBeforeUnmount } from "vue";
import M from "materialize-css/dist/js/materialize.min.js";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { getLocalizedText } from '@/locale'
import { useHasMatchRecord } from '../use/useHasMatchRecord'

// Define a logic function for record page
export function recordLOgic() {
  // Get the Vuex store instance
  const store = useStore();
  
  // Define and initialize reactive variables
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

  // Define the form fields using vee-validate
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
  
  // Run this code when the component is mounted
  onMounted(async () => {
    // Get the list of categories from the Vuex store and filter out detected categories
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

    // Get the list of cards from the Vuex store and filter out detected cards
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

    // Update the MaterializeCSS select components after DOM update
    nextTick(() => {
      instance.value = M.FormSelect.init(selectCategory.value);
      instanceCard.value = M.FormSelect.init(selectCard.value);
    });
  });

  // Run this code before the component is unmounted
  onBeforeUnmount(() => {
    if (instance.value && instance.value.destroy) {
      instance.value.destroy();
    }
    if (instanceCard.value && instanceCard.value.destroy) {
      instanceCard.value.destroy();
    }
  });

  // Function to handle the form submission
  const onSubmit = handleSubmit(async (val, { resetForm }) => {
    try {
      // Get the selected card from the list of cards
      const cardById = list.value.find(c => c.idParrent === cardModel.value)

      // Check if the record can be created based on the selected type and amount
      const canCreateRecord = val.type === "income" || (val.type === "outcome" && val.amount < cardById.bill)

      if(canCreateRecord) {
        // Update the card balance based on the record type and amount
        const update = val.type === "outcome" ? 
        cardById.bill - val.amount :
        cardById.bill + val.amount

        // Dispatch an action to update the card balance in the Vuex store
        await store.dispatch('card/update', {
           ...cardById,
           bill: update
        })

        // Get the updated list of cards from the Vuex store
        list.value = await store.getters["card/list"];

        // Dispatch an action to add the record in the Vuex store
        await store.dispatch('records/addRecord', { ...val, idParrent: current.value, date: new Date().toJSON() })

        // Check if there is a match record
        const hasMatch = await useHasMatchRecord()

        // If no match record exists, update the service date records in the Vuex store
        if (!hasMatch) {
          store.dispatch('records/updateServiseDateRecords');
        }

      } else {
        // Display a warning message if the record cannot be created due to insufficient balance
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

  // Return the data and functions that will be used in the template
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
