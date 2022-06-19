import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: [],
    userOnModal: null,
  },
  mutations: {
    SET_USER_ON_MODAL (state, user) {
      state.userOnModal = user
    },
    SET_USERS (state, users) {
      state.users = users
    },
  },
  actions: {
    setUserOnModal(store, user) {
      store.commit('SET_USER_ON_MODAL', user)
    },
    setUsers(store, users) {
      store.commit('SET_USERS', users)
    },
  }
})