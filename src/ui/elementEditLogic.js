// Import necessary functions and libraries
import { onMounted, ref, onBeforeUnmount, nextTick, watch } from "vue";
import M from "materialize-css/dist/js/materialize.min.js";
import { useStore } from "vuex";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { getLocalizedText } from '@/locale'

// Define a logic function for element editing
export function elementEditLogic(props, {emit}) {
    // Define and initialize reactive variables
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

    // Use vee-validate for handling the name field
    const {
      value: nValue,
      errorMessage: nError,
      handleBlur: nBlur,
    } = useField(
      "name",
      yup.string().trim().required(getLocalizedText("EnterCategoryName"))
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
        .required(getLocalizedText("EnterLimit"))
        .min(MIN_LIMIT, `${getLocalizedText("LimitCannotBeLess")} ${MIN_LIMIT}.`)
    );

    // Run this code when the component is mounted
    onMounted(async () => {
      
      // Get data from the Vuex store using the dispatch passed through the props
      isDetectedData.value  = await store.dispatch(`${props.dispash}/list`);
      
      // Filter data that is not detected (isDetected === false)
      if (isDetectedData.value.length) {
        selectData.value = isDetectedData.value.filter(c => c.isDetected === false)
        
        // Set the current element based on the first element in the filtered list
        if (selectData.value.length) {
          current.value = selectData.value[0].idParrent;
          lValue.value = selectData.value[0].limit;
          nValue.value = selectData.value[0].title
        }

        // Use nextTick to update the MaterializeCSS components after the DOM update
        nextTick(() => {
          M.updateTextFields();
          instance.value = M.FormSelect.init(selectRestor.value);
        });
      }
      loading.value = false
    });

    // Watch for changes in the current element and update the form fields accordingly
    watch(current, (val) => {
        const newDate = selectData.value.filter(item => item.idParrent === val)
        lValue.value = newDate[0].limit;
        nValue.value = newDate[0].title
    })

    // Define the form submission handler
    const onSubmit = handleSubmit(async (val) => {
      try { 
        // Find the element with the selected current ID
        const isById = isDetectedData.value.find(c => c.idParrent === current.value)

        // Prepare the element update data
        await store.dispatch(`${props.dispash}/update`, { ...isById, title: val.name, limit: val.limit, isDetected: cValue.value })
        
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
