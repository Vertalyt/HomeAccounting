// Import necessary functions and libraries
import { onMounted, ref, onBeforeUnmount, nextTick, watch } from "vue";
import M from "materialize-css/dist/js/materialize.min.js";
import { useStore } from "vuex";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { getLocalizedText } from '@/locale'

// Define a logic function for card editing
export function cardEditLogic(_, {emit}) {
    // Define and initialize reactive variables
    const selectCard = ref();
    const instance = ref();
    const store = useStore();
    const card = ref([]);
    const current = ref();
    const loading = ref(true) 
    const cValue = ref(false)

    // Define a constant for the minimum card limit
    const MIN_LIMIT = 100;
    const { isSubmitting, handleSubmit } = useForm();

    // Use vee-validate for handling the name field
    const {
      value: nValue,
      errorMessage: nError,
      handleBlur: nBlur,
    } = useField(
      "name",
      yup.string().trim().required(getLocalizedText('ChooseCardName'))
    );

    // Use vee-validate for handling the limit field
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

    // Run this code when the component is mounted
    onMounted(async () => {
      // Get the list of cards from the Vuex store
      const isDetectedData  = await store.dispatch("card/list");
      
      // Filter cards that are not detected (isDetected === false)
      if (isDetectedData.length) {
        card.value = isDetectedData.filter(c => c.isDetected === false)

        // Set the current card based on the first card in the filtered list
        if (card.value.length ) {
          current.value = card.value[0].idParrent;
          lValue.value = card.value[0].limit;
          nValue.value = card.value[0].title
        }

        // Use nextTick to update the MaterializeCSS components after the DOM update
        nextTick(() => {
          M.updateTextFields();
          instance.value = M.FormSelect.init(selectCard.value);
        });
      }
      loading.value = false
    });

    // Watch for changes in the current card and update the form fields accordingly
    watch(current, (val) => {
      const newDate = card.value.filter(item => item.idParrent === val)
      lValue.value = newDate[0].limit;
      nValue.value = newDate[0].title
    })

    // Define the form submission handler
    const onSubmit = handleSubmit(async (val) => {
      try { 
        // Find the card with the selected current ID
        const isId = card.value.find(c => c.idParrent === current.value)
        
        // Prepare the card update data
        const update = {
          title: val.name,
          bill: val.limit,
          idParrent: current.value,
          isDetected: cValue.value,
          type: isId.type,
          limit: isId.limit
        }

        // Dispatch a Vuex action to update the card
        await store.dispatch('card/update', update)
        
        // Emit an 'updated' event
        emit('updated')
      } catch (error) {
        /* empty */
        // Handle any errors that occur during the form submission
      }
    });

    // Run this code before the component is unmounted
    onBeforeUnmount(() => {
      // Destroy the MaterializeCSS select instance if it exists
      if (instance.value && instance.value.destroy) {
        instance.value.destroy();
      }
    });

    // Return the data and functions that will be used in the template
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
