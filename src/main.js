import "materialize-css/dist/js/materialize.min";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  databaseURL: import.meta.env.VITE_DATABASEURL,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGESENDERID,
  appId: import.meta.env.VITE_APPID,
};
initializeApp(firebaseConfig);


let app;
const auth = getAuth();

auth.onAuthStateChanged( () => {
  if (!app) {
    app = createApp(App);
    app.use(router);
    app.use(store);
    app.mount("#app");
  }
});
