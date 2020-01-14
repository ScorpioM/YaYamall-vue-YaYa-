const login = {
    state: {
        isLogin: false // true为已经登录，false为没登录
    },
    mutations: {
        setIsLogin(state, isLogin) {
            state.isLogin = isLogin;
        }
    },
    actions: {

    },
}
export default login;