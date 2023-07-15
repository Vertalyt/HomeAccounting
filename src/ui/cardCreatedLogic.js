import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { onMounted, ref, onBeforeUnmount } from "vue";
import M from "materialize-css/dist/js/materialize.min.js";
import { useStore } from 'vuex'
import { getLocalizedText } from '@/locale'

export function cardCreatedLogic(_, {emit}) {
    const MIN_LIMIT = 5000;
    const { isSubmitting, handleSubmit } = useForm();
    const store = useStore()
    const selectCard = ref();
    const instance = ref();
    const current = ref();

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

    lValue.value = MIN_LIMIT;

    const onSubmit = handleSubmit(async (val, { resetForm }) => {
      try {
      await store.dispatch('card/create', { title: val.nameCard, limit: val.limitCard, bill: val.limitCard, isDetected: false, type: current.value })
        resetForm()
        lValue.value = MIN_LIMIT;
        emit('created')
      } catch (error) {
        /* empty */
      }
    });

    onMounted(() => {
            M.updateTextFields();
            instance.value = M.FormSelect.init(selectCard.value);
    });

    onBeforeUnmount(() => {
        if (instance.value && instance.value.destroy) {
          instance.value.destroy();
        }
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
      selectCard,
      current,
      getLocalizedText
    };
}