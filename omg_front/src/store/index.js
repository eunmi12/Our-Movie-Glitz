import { createStore } from 'vuex'
import persistedstate from 'vuex-persistedstate';

const store = createStore({
    state() {
        return {
            user: {
                user_id: '',
                user_no: '',
                user_auth:'',
            },
            movie_r:{
                movie_no : '',
                cinema_no : '',
                date : '',
                time : '',
            }
        }
    },
    mutations: {
        setUser(state, data){
            state.user = data;
        },
        setMovie_r(state, data){
            state.movie_r = data;
        }
        
    },
    actions: {
        updateUserEmail({ commit }, user_id) {
            commit('setUserEmail', user_id);
        }
    },
    getters: {
        user_id: state => state.user.user_id
    },

    plugins: [
        persistedstate({
            paths: ['user']
        })
    ]
});

export default store;