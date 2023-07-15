import { createStore } from 'vuex'
import requests from './modules/requests.module'
import auth from './modules/auth.module'
import categories from './modules/categories.module'
import records from './modules/records.module'
import card from './modules/card.module'

export default createStore({
    state () {
        return {
            message: null,
            screenWidth: window.innerWidth,
        }
    },
    mutations: {
        setMessage(state, payload) {
            return state.message = payload
        },
        clearMessage(state) {
            state.message = null
        },
        updateScreenWidth(state, payload) {
            state.screenWidth = payload
        },
    },
    actions: {
        setMessage({ commit }, payload) {
            commit('setMessage', payload)
            setTimeout(() => {
                commit('clearMessage')
            }, 2500);
        },
        updateScreenWidth( {commit}, payload ) {
            commit('updateScreenWidth', payload)
        }
    },
    getters: {
        message(state) {
            return state.message
        },
        screenWidth(state) {
            return state.screenWidth
        },
    },
    modules: {
        requests,
        auth,
        categories,
        records,
        card
    }
})