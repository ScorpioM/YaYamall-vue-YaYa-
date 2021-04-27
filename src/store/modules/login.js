import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const login = {
    state: {
        isLogin: false, // true为已经登录，false为没登录
        user:{},
        name:'',
        id:null,
        pictureAddr:'',
        nick:'',
        phone:''
    },
    mutations: {
        setIsLogin(state, isLogin) {
            state.isLogin = isLogin;
        },
        setIsId(state, data) {
            state.id = data;
        },
        setName(state, data) {
            state.name = data;
        },
        setpictureAddr(state, data) {
            state.pictureAddr = data;
        },
        setNick(state, data) {
            state.nick = data;
        },
        setUser(state, data) {
            state.user = data;
        },
        setPhone(state, data) {
            state.user = data;
        }
    },
    actions: {

    },
}
export default login;