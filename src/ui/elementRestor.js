// Import necessary functions and libraries
import { onMounted, ref, onBeforeUnmount, nextTick } from "vue";
import M from "materialize-css/dist/js/materialize.min.js";
import { useStore } from "vuex";
import { getLocalizedText } from '@/locale'
import { useForm } from "vee-validate";

// Define a logic function for element restoration
export function elementRestor(props, {emit}) {
    // Define and initialize reactive variables
    const selectRestor = ref();
    const instance = ref();
    const store = useStore();
    const selectData = ref([]);
    const current = ref();
    const loading = ref(true) 
    const cValue = ref(false)
    const isDetectedData = ref()
    const { isSubmitting, } = useForm();

    // Run this code when the component is mounted
    onMounted(async () => {
      // Get data from the Vuex store using the dispatch passed through the props
      isDetectedData.value  = await store.dispatch(`${props.dispash}/list`);     

      // Filter data that is detected (isDetected === true)
      if(isDetectedData.value.length) {
        selectData.value = isDetectedData.value.filter(c => c.isDetected === true)

        // Set the current element based on the first element in the filtered list
        if (selectData.value.length) {
          current.value = selectData.value[0].idParrent;
        }

        // Use nextTick and setTimeout to update the MaterializeCSS components after the DOM update
        nextTick(() => {
          setTimeout(() => {
            M.updateTextFields();
            instance.value = M.FormSelect.init(selectRestor.value);
          }, 0);
        });
      }
      loading.value = false
    });

    // Define the form submission handler
    const onSubmit = async () => {
      try { 
        // Find the element with the selected current ID
        const isById = isDetectedData.value.find(c => c.idParrent === current.value)

        // Prepare the element update data to set isDetected to false
        await store.dispatch(`${props.dispash}/update`, { ...isById, isDetected: false })
        
        // Emit an 'updated' event
        emit('updated')
      } catch (error) {
        /* empty */
        // Handle any errors that occur during the form submission
      }
    };

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
      loading,
      getLocalizedText,
      cValue
    };
}
