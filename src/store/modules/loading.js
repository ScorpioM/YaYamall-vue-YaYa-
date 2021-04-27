import Vue from 'vue'
import Vuex from 'vuex'
import VueXAlong from 'vuex-along'
Vue.use(Vuex)
const loading = {
    state: {
        isLoading:null
    },
    mutations: {
        setIsLoading(state, isLoading) {
            state.isLoading=isLoading
        }
    },
    actions: {
    },
}
export default loading;