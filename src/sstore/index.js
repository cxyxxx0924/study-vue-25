import Vue from 'vue'
import Vuex from './svuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 1
  },
  mutations: {
    add(state) {
      state.counter++
    }
  },
  actions: {
    add({commit}) {
      setTimeout(() => {
        commit('add')
      }, 1000);
    }
  },
  modules: {
  },
  getters: {
    doubleCount(state) {
      return state.counter * 2
    },
    threebelCount(state) {
      return state.counter * 3
    }
  }
})
