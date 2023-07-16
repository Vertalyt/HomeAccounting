import { getDatabase, get, ref, update } from "firebase/database";
import { getLocalizedText } from '@/locale'

export default {
  namespaced: true,

  state() {
    return {
      clientInfo: {},
    };
  },
  mutations: {
    setInfo(state, payload) {
      state.clientInfo = payload;
    },
    clearinfo(state) {
      state.clientInfo = {};
    },
  },
  actions: {
    async cursCurrensy() {
      const response = await fetch(
        "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json"
      );

      if (response.ok) {
        const data = await response.json();
        return data
          .filter(function (obj) {
            return ["PLN", "USD", "EUR"].includes(obj.cc);
          })
          .map((key) => {
            const newTime = key.exchangedate.split(".");
            const day = newTime[0];
            const month = newTime[1];
            const year = newTime[2];
            const formattedDate = year + "-" + month + "-" + day;
            return {
              ...key,
              exchangedate: formattedDate,
            };
          });
      } else {
        alert("Ошибка HTTP: " + response.status);
      }
    },
    async clientInfo({ dispatch, commit }) {
      try {
        const db = getDatabase();
        const uid = await dispatch("auth/getUid", null, { root: true });
        const snapshot = await get(ref(db, "users/" + uid + "/info"));
        const info = snapshot.val();
        commit("setInfo", info);
        return { info }
      } catch (error) {
        console.log(error);
      }
    },
    async updateInfo({ dispatch, commit }, payload) {
      try {
        const db = getDatabase();
        const uid = await dispatch("auth/getUid", null, { root: true });

        await update(ref(db, "users/" + uid + "/info"), payload);
        commit("setInfo", payload);

        dispatch(
          "setMessage",
          {
            value: getLocalizedText("DataUpdated"),
          },
          { root: true }
        );
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {
    clientInfo(state) {
      return state.clientInfo;
    },
  },
};
