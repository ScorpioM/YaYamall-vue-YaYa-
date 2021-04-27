const getters = {
    isLogin: state => state.login.isLogin,
    isLoading: state => state.loading.isLoading,
    user:state=>state.login.user,
};
export default getters