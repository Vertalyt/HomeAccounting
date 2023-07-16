
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { useStore } from "vuex";
import { useRouter } from 'vue-router'
import { getLocalizedText } from '@/locale'

export function loginPasswordForm(props, emit) {
    const router = useRouter()
    const store = useStore();
    const MIN_LENGHT_PASS = 6;
    const { isSubmitting, handleSubmit } = useForm();
    const {
      value: eValue,
      errorMessage: eError,
      handleBlur: eBlur,
    } = useField(
      "email",
      yup
        .string()
        .trim()
        .required(getLocalizedText("EnterEmail"))
        .email(getLocalizedText("MustBeValidEmail"))
    );
    const {
      value: pValue,
      errorMessage: pError,
      handleBlur: pBlur,
    } = useField(
      "password",
      yup
        .string()
        .trim()
        .required(getLocalizedText("EnterPassword"))
        .min(
          MIN_LENGHT_PASS,
          `${getLocalizedText("PasswordCannotBeSmaller")} ${MIN_LENGHT_PASS} ${getLocalizedText("Symbols")}.`
        )
    );

    const onSubmit = handleSubmit(async (val, { resetForm }) => {
      try {
        await store.dispatch(props.dispatchOnSubmitLogin, { email: val.email, password: val.password});
        emit('updated')
        if(props.loginCheck) {
          router.push('/')
        }

        resetForm();
      } catch (error) {
        /* empty */
      }
    });


    return {
      eValue,
      eError,
      eBlur,
      pValue,
      pError,
      pBlur,
      isSubmitting,
      onSubmit,
      getLocalizedText,
    };
}