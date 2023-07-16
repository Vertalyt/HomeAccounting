// Import necessary functions and libraries
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { onMounted, ref, onBeforeUnmount } from "vue";
import M from "materialize-css/dist/js/materialize.min.js";
import { useStore } from 'vuex'
import { getLocalizedText } from '@/locale'

// Define a logic function for card creation
export function cardCreatedLogic(_, {emit}) {

    // Define a constant for the minimum card limit
    const MIN_LIMIT = 5000;

    // Get form submission status and handle form submission
    const { isSubmitting, handleSubmit } = useForm();

    // Access the Vuex store
    const store = useStore()

    // Define and initialize reactive variables
    const selectCard = ref();
    const instance = ref();
    const current = ref();

    // Use vee-validate for handling the name field
    const {
      value: nValue,
      errorMessage: nError,
      handleBlur: nBlur,
    } = useField("nameCard",
     yup
      .string()
      .trim()
      .required(getLocalizedText("EnterCategoryName"))
     );

    // Use vee-validate for handling the limit field
    const {
      value: lValue,
      errorMessage: lError,
      handleBlur: lBlur,
    } = useField(
      "limitCard",
        yup
            .number()
            .required(getLocalizedText("EnterLimit"))
            .min(MIN_LIMIT, `${getLocalizedText("LimitCannotBeLess")} ${MIN_LIMIT}.`)
    );

    // Set the initial value for the limit field to MIN_LIMIT
    lValue.value = MIN_LIMIT;

    // Define the form submission handler
    const onSubmit = handleSubmit(async (val, { resetForm }) => {
      try {
        // Dispatch a Vuex action to create a new card with the form values
        await store.dispatch('card/create', { title: val.nameCard, limit: val.limitCard, bill: val.limitCard, isDetected: false, type: current.value })
        
        // Reset the form and set the limit field back to MIN_LIMIT
        resetForm()
        lValue.value = MIN_LIMIT;

        // Emit a 'created' event
        emit('created')
      } catch (error) {
        /* empty */
        // Handle any errors that occur during the form submission
      }
    });

    // Run this code when the component is mounted
    onMounted(() => {
            // Initialize MaterializeCSS components and update text fields
            M.updateTextFields();
            instance.value = M.FormSelect.init(selectCard.value);
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
      isSubmitting,
      nValue,
      nError,
      nBlur,
      lValue,
      lError,
      lBlur,
      onSubmit,
      selectCard,
      current,
      getLocalizedText
    };
}