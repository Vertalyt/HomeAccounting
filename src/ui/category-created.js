// Import necessary functions and libraries
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { onMounted } from "vue";
import M from "materialize-css/dist/js/materialize.min.js";
import { useStore } from 'vuex'
import { getLocalizedText } from '@/locale'

// Define a logic function for category creation
export function categoryCreatedLogic(_, {emit}) {
    // Define a constant for the minimum category limit
    const MIN_LIMIT = 500;
    const { isSubmitting, handleSubmit } = useForm();
    const store = useStore()

    // Use vee-validate for handling the category name field
    const {
      value: nValue,
      errorMessage: nError,
      handleBlur: nBlur,
    } = useField("nameCategory",
     yup
      .string()
      .trim()
      .required(getLocalizedText("EnterCategoryName"))
     );

    // Use vee-validate for handling the category limit field
    const {
      value: lValue,
      errorMessage: lError,
      handleBlur: lBlur,
    } = useField(
      "limitCategory",
        yup
            .number()
            .required(getLocalizedText("EnterLimit"))
            .min(MIN_LIMIT, `${getLocalizedText("LimitCannotBeLess")} ${MIN_LIMIT}.`)
    );

    // Set the initial value for the category limit field to MIN_LIMIT
    lValue.value = MIN_LIMIT;

    // Define the form submission handler
    const onSubmit = handleSubmit(async (val, { resetForm }) => {
      try {
        // Dispatch a Vuex action to create a new category with the form values
        await store.dispatch('categories/create', { title: val.nameCategory, limit: val.limitCategory, isDetected: false })
        
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
      // Update MaterializeCSS text fields after the DOM is updated
      M.updateTextFields();
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
      getLocalizedText
    };
}
