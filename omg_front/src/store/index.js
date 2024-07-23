import { createStore } from 'vuex'
import persistedstate from 'vuex-persistedstate';

const store = createStore({
    state() {
        return {
            user: {
                user_email: '',
                user_no: '',
                user_auth:'',
            }
        }
    },
    mutations: {
        setUser(state, data){
            state.user = data;
        }
    },
    actions: {
        updateUserEmail({ commit }, email) {
            commit('setUserEmail', email);
        }
    },
    getters: {
        userEmail: state => state.user.user_email
    },

    plugins: [
        persistedstate({
            paths: ['user']
        })
    ]
});

export default store;