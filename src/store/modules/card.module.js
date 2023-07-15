import { getDatabase, ref, push, update, get } from "firebase/database";
import { getLocalizedText } from '@/locale'

export default {
  namespaced: true,
  state() {
    return {
      list: [],
    };
  },
  getters: {
    list(state) {
      return state.list;
    },
  },
  mutations: {
    setlist(state, payload) {
      state.list = payload;
    },
    addlist(state, payload) {
      state.list.push(payload);
    },
    update(state, { title, bill, idParrent, isDetected, type }) {
      state.list = state.list.map(c => {
        if(c.idParrent === idParrent ) {
          return {
           ...c,
           title,
           bill,
           isDetected,
           type
          }
        }
        return c
      }
    )},
  },
  actions: {
    async create({ dispatch, commit }, { title, bill, isDetected, limit, type }) {
      try {
        const db = getDatabase();
        const uid = await dispatch("auth/getUid", null, { root: true });
        const newCardKey = push(ref(db)).key;
        update(ref(db, "users/" + uid + "/card" + "/" + newCardKey), {
          title,
          bill,
          limit,
          isDetected,
          type
        });
        commit("addlist", { title, bill, idParrent: newCardKey, isDetected, type });
        dispatch('setMessage', {
            type: 'primary',
            value: getLocalizedText('CardAdded'),
          }, { root: true })
      } catch (error) {
        console.log(error);
      }
    },
    async list({ dispatch, commit }) {
      try {
        const db = getDatabase();
        const uid = await dispatch("auth/getUid", null, { root: true });
        const snapshot = await get(ref(db, "users/" + uid + "/card"));
        const card = snapshot.val() || {};

        const data = Object.keys(card).map((key) => ({
          ...card[key],
          idParrent: key,
        }));

        commit("setlist", data);
        
        return data
      } catch (error) {
        console.log(error);
      }
    },
    async update({ dispatch, commit }, { bill, limit, isDetected, title, type, idParrent }) {
      try {
        const db = getDatabase();
        const uid = await dispatch("auth/getUid", null, { root: true });
       await update(ref(db, "users/" + uid + "/card" + "/" + idParrent), {
        bill, limit, isDetected, title, type,
        });
        commit('update', { bill, limit, isDetected, title, type, })
        dispatch('setMessage', {
            type: 'primary',
            value: getLocalizedText('CardIsUpdated'),
          }, { root: true })
      } catch (error) {
        console.log(error);
      }
    },
    async cardById({ dispatch }, { idParrent }) {
      try {
        const db = getDatabase();
        const uid = await dispatch("auth/getUid", null, { root: true });
        const snapshot = await get(ref(db, "users/" + uid + "/card/" + idParrent));
        const card = snapshot.val() || {};
        return {
          ...card,
          idParrent
        }

      } catch (error) {
        console.log(error);
      }
    },
    async updateListBill({ dispatch, commit }, payload) {
      try {
        const db = getDatabase();
        const uid = await dispatch("auth/getUid", null, { root: true });
        const transformedObject = {};

        payload.map(item => {
          item.bill = item.limit
        });

          commit('setlist', payload)

        payload.map(item => {
        const { idParrent, ...rest } = item;
        transformedObject[idParrent] = rest;
        });

       await update(ref(db, "users/" + uid + "/card"), transformedObject);
        dispatch('setMessage', {
            type: 'primary',
            value: getLocalizedText('AccountBillWasUpdated'),
          }, { root: true })

      } catch (error) {
        console.log(error);
      }
    },
  },
};