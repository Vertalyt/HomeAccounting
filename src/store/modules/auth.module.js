import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  EmailAuthProvider,
  linkWithCredential,
  unlink,
  linkWithRedirect,
  sendPasswordResetEmail
} from "firebase/auth";
import { getDatabase, set, ref } from "firebase/database";
import { error } from "../../utills/error";
import { getLocalizedText } from "@/locale";
import { useRouter } from 'vue-router'

export default {
  namespaced: true,
  actions: {
    async register({ dispatch }, { email, password, name }) {
      try {
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, email, password);
        const uid = await dispatch("auth/getUid", null, { root: true });
        const db = getDatabase();
        const userLang = navigator.language || navigator.userLanguage;
        await set(ref(db, "users/" + uid + "/info"), {
          name,
          bill: 100,
          role: "User",
          locale: userLang,
        });
        dispatch(
          "setMessage",
          {
            type: "primary",
            value: getLocalizedText("RegistrationCompleted"),
          },
          { root: true }
        );
      } catch (e) {
        dispatch(
          "setMessage",
          {
            type: "warning",
            value: error(e.code),
          },
          { root: true }
        );
        console.log(e);
      }
    },
    async login({ dispatch }, { email, password }) {
      try {
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, email, password);
        dispatch(
          "setMessage",
          {
            type: "primary",
            value: getLocalizedText("AuthorizationSuccessful"),
          },
          { root: true }
        );
      } catch (e) {
        dispatch(
          "setMessage",
          {
            type: "warning",
            value: error(e.code),
          },
          { root: true }
        );
        throw e;
      }
    },
    getUid() {
      const auth = getAuth();
      const user = auth.currentUser;
      return user ? user.uid : null;
    },
    async logout({ commit }) {
      try {
        const auth = getAuth();
        await signOut(auth);
        commit("requests/clearinfo", null, { root: true });
      } catch (error) {
        console.log(error);
      }
    },
   async googleAuth() {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      await signInWithRedirect(auth, provider);
    },
    async googleAddAuth() {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
          await linkWithRedirect(auth.currentUser, provider)
            .then(/* ... */)
            .catch(/* ... */);


    },
    async addLoginPass({ dispatch }, payload) {
      const credential = EmailAuthProvider.credential(payload.email, payload.password);
      const auth = getAuth();
      await linkWithCredential(auth.currentUser, credential)
            .then(() => {
            console.log("Account linking success");
            dispatch("setMessage",
            {
              type: "warning",
              value: 'Account linking success',},
            { root: true }
          );
            }).catch((e) => {
              dispatch("setMessage",
                {
                  type: "warning",
                  value: error(e.code),},
                { root: true }
              );
            });
    },
   async verificationMethods() {
      const auth = getAuth();
      return auth.currentUser.providerData
    },
    redirectResult() {
      const router = useRouter()
      const auth = getAuth();
      getRedirectResult(auth)
        .then((result) => {
          if(result) {
            console.log('success');
            router.push('/')
          }
      })
      .catch((error) => {
        console.log('error', error);
        const errorCode = error.code;
        if (errorCode) {
          console.log('errorCode', errorCode);  
        }
        const errorMessage = error.message;
        if (errorMessage) {
          console.log('errorMessage', errorMessage);  
        }
        const email = error.customData.email;
        if (email) {
          console.log('email', email);  
        }
        const credential = GoogleAuthProvider.credentialFromError(error);
        if (credential) {
          console.log('credential', credential);  
        }
      });
    },
    async unMethodAuth({dispatch}, providerId) {
      const auth = getAuth();

      await unlink(auth.currentUser, providerId).then(() => {
        dispatch("setMessage",
          {
            type: "primary",
            value: 'Метод успішно відвязаний',
          },
          { root: true }
        );
      }).catch((error) => {
          console.log(error);
      });
    },
    async resetPassword({dispatch}, {email}) {
      try {
        const auth = getAuth();
        await sendPasswordResetEmail(auth, email)
           .then(function() {
             dispatch("setMessage",
             {
               type: "primary",
               value: 'Ссылка для сброса пароля успешно отправлена на почту',
             },
             { root: true }
           );
           })
           .catch(function(error) {
             const errorCode = error.code;
             const errorMessage = error.message;
             console.error('Ошибка при отправке письма:', errorCode, errorMessage)
           });
      } catch (error) {
        console.log(error);
      }

    }
  },
};
