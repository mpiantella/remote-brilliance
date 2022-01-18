import Vue from 'vue'
import Vuex from 'vuex'
import {
  Auth
} from "aws-amplify";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    isUserAuth: false
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setIsUserAuthenticated(state, flag) {
      state.isUserAuth = flag;
    }
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    getIsUserAuthenticated(state) {
      return state.isUserAuth;
    }
  },
  actions: {
    triggerIsUserAuthenticated({
      commit,
      state
    }) {
      return state.isUserAuth;
    },
    fetchUser({
      commit
    }) {
      return Auth.currentAuthenticatedUser()
        .then((data) => {
          let user = null;
          if (data && data.username) {
            user = {
              username: data.username,
              cognitoid: data.attributes.sub,
              phone: data.attributes.phone_number,
              email: data.attributes.email,
              firstName: data.attributes.name,
              lastName: data.attributes.family_name
            };
          }
          commit('setUser', user);
          commit('setIsUserAuthenticated', true);

          return user;
        })
        .catch((e) => {
          commit("setUser", null);
          return null;
        });
    }
  }
});