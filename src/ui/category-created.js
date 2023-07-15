import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { onMounted } from "vue";
import M from "materialize-css/dist/js/materialize.min.js";
import { useStore } from 'vuex'
import { getLocalizedText } from '@/locale'

export function categoryCreatedLogic(_, {emit}) {
    const MIN_LIMIT = 500;
    const { isSubmitting, handleSubmit } = useForm();
    const store = useStore()

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

    lValue.value = MIN_LIMIT;

    const onSubmit = handleSubmit(async (val, { resetForm }) => {
      try {
      await store.dispatch('categories/create', { title: val.nameCategory, limit: val.limitCategory, isDetected: false })
        resetForm()
        lValue.value = MIN_LIMIT;
        emit('created')
      } catch (error) {
        /* empty */
      }
    });

    onMounted(() => {
      M.updateTextFields();
    });

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