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
    update(state, { title, limit, idParrent }) {
      state.list = state.list.map(c => {
        if(c.idParrent === idParrent ) {
          return {
           ...c,
           title,
           limit
          }
        }
        return c
      }
    )},
  },
  actions: {
    async create({ dispatch, commit }, { title, limit, isDetected }) {
      try {
        const db = getDatabase();
        const uid = await dispatch("auth/getUid", null, { root: true });
        const newCategoryKey = push(ref(db)).key;
        update(ref(db, "users/" + uid + "/categories" + "/" + newCategoryKey), {
          title,
          limit,
          isDetected
        });
        commit("addlist", { title, limit, idParrent: newCategoryKey, isDetected });
        dispatch('setMessage', {
            type: 'primary',
            value: getLocalizedText("CategoryAddedSuccessfully"),
          }, { root: true })
      } catch (error) {
        console.log(error);
      }
    },
    async list({ dispatch, commit }) {
      try {
        const db = getDatabase();
        const uid = await dispatch("auth/getUid", null, { root: true });
        const snapshot = await get(ref(db, "users/" + uid + "/categories"));
        const categories = snapshot.val() || {};

        const data = Object.keys(categories).map((key) => ({
          ...categories[key],
          idParrent: key,
        }));
        commit("setlist", data);
        
        return data
      } catch (error) {
        console.log(error);
      }
    },
    async update({ dispatch, commit }, { title, limit, idParrent, isDetected }) {
      try {
        const db = getDatabase();
        const uid = await dispatch("auth/getUid", null, { root: true });

       await update(ref(db, "users/" + uid + "/categories" + "/" + idParrent), {
          title,
          limit,
          isDetected
        });
        commit('update', { title, limit, idParrent, isDetected })
      
        dispatch('setMessage', {
            type: 'primary',
            value: getLocalizedText("CategoryAddedSuccessfully"),
          }, { root: true })
      } catch (error) {
        console.log(error);
      }
    },
    async categoryById({ dispatch }, { idParrent }) {
      try {
        const db = getDatabase();
        const uid = await dispatch("auth/getUid", null, { root: true });
        const snapshot = await get(ref(db, "users/" + uid + "/categories/" + idParrent));
        const categories = snapshot.val() || {};
        return {
          ...categories,
          idParrent
        }

      } catch (error) {
        console.log(error);
      }
    },
  },
};