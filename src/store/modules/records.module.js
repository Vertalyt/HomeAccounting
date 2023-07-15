import { getDatabase, ref, push, update, get } from "firebase/database";
import { getLocalizedText } from '@/locale'

export default {
    namespaced: true,
    state() {
        return {
            listRecords: [],
        }
    },
    getters: {
        listRecords(state) {
            return state.listRecords
        },
    },
    mutations: {
        setRecords(state, payload) {
            state.listRecords = payload
        },
        addRecords(state, payload) {
            state.listRecords.push(payload)
        }, 
        clearRecords(state){
            state.listRecords = []
        },
    },
    actions: {
       async addRecord({ dispatch, commit }, payload) {
        try {
            const db = getDatabase();
            const uid = await dispatch("auth/getUid", null, { root: true });
            const newRecordKey = push(ref(db)).key;
            const recordMonth = new Date().getMonth();
            const recordYear = new Date().getFullYear();
            await update(ref(db, `/users/${uid}/records/${recordYear}/${recordMonth}/${newRecordKey}`), payload);
            commit("addRecords", { ...payload, idRecord: newRecordKey });

            dispatch('setMessage', {
                type: 'primary',
                value: getLocalizedText("EntryAddedSuccessfully"),
              }, { root: true })
          } catch (error) {
            console.log(error);
          }
        },
        async listRecords({dispatch, commit},  { yearModel, monthModel }) {
            try {
                const db = getDatabase()
                const uid = await dispatch("auth/getUid", null, { root: true });
                const snapshot = await get(ref(db, `/users/${uid}/records/${yearModel}/${monthModel}`));
                const data = snapshot.val() || {};
                const info = Object.keys(data).map((key) => ({
                    ...data[key],
                    idRecord: key
                }))
                commit('setRecords', info)
                return info
              } catch (error) {
                console.log(error);
              }
        },
        async recordById({ dispatch }, { idRecord }) {
            try {
              const db = getDatabase();
              const uid = await dispatch("auth/getUid", null, { root: true });
              const snapshot = await get(ref(db, "users/" + uid + "/records/" + idRecord));
              return snapshot.val() || {};
      
            } catch (error) {
              console.log(error);
            }
          },
          async serviseDateRecords({dispatch}) {
            try {
                const db = getDatabase()
                const uid = await dispatch("auth/getUid", null, { root: true });
                const snapshot = await get(ref(db, `/users/${uid}/serviseDateRecords`));
                const data = snapshot.val() || {};
                return Object.keys(data).map((key) => ({
                  ...data[key]
              }))
              } catch (error) {
                console.log(error);
              }
        },
        async updateServiseDateRecords({ dispatch }) {
          try {
              const db = getDatabase();
              const uid = await dispatch("auth/getUid", null, { root: true });
              const newRecordKey = push(ref(db)).key;
              const dateDay = new Date().toJSON()

              await update(ref(db, `/users/${uid}/serviseDateRecords/${newRecordKey}`), {day: dateDay});   
  
            } catch (error) {
              console.log(error);
            }
          },
    }
}