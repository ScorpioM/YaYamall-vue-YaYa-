import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate"
import getters from "./getters";
import login from "./modules/login";
import loading from "./modules/loading";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    id:null
  },
  mutations: {},
  actions: {},
  modules: {
    login,
    loading
  },
  getters,
  plugins: [createPersistedState()]
});
