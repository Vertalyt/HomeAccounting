
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { useStore } from "vuex";
import { useRouter } from 'vue-router'
import { getLocalizedText } from '@/locale'
import { onMounted } from "vue";
import { getAuth } from "firebase/auth";


export function registerFormLogic() {
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
      value: nValue,
      errorMessage: nError,
      handleBlur: nBlur,
    } = useField("name", yup.string().trim().required(getLocalizedText("EnterName")));
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
        await store.dispatch("auth/register", val);
        resetForm();
        router.push('/login')
      } catch (error) {
        /* empty */
      }
    });

    onMounted( () => {
      const auth = getAuth();
      const authUser = auth.currentUser
      if (authUser) {
              store.dispatch('auth/redirectResult')
      }
    } )

    const GoogleAuth = async() => {
      try {
        store.dispatch('auth/googleAuth')
      } catch (error) {
        /* empty */
      }
    }





    return {
      eValue,
      eError,
      eBlur,
      nValue,
      nError,
      nBlur,
      pValue,
      pError,
      pBlur,
      isSubmitting,
      onSubmit,
      getLocalizedText,
      GoogleAuth
    };
}