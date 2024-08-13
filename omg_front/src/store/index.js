import { createStore } from 'vuex'
import persistedstate from 'vuex-persistedstate';

const store = createStore({
    state() {
        return {
            user: {
                user_id: '',
                user_no: '',
                user_auth: '',
                user_del: '',
                user_age: '',
            },
            movie_r: {
                movie_no: '',
                cinema_no: '',
                date: '',
                time: '',
            },
            re_like: true, //리뷰 좋아요 저장용 
        }
    },
    mutations: {
        setUser(state, data) {
            state.user = data;
        },
        setMovie_r(state, data) {
            state.movie_r = data;
        },
        clearUser(state) {
            state.user = {
                user_id: '',
                user_no: '',
                user_auth: '',
                user_del: ''
            };
        },
        setUserEmail(state, user_id) {
            state.user.user_id = user_id;
        },
        setReLike(state, value){
            state.re_like = value;
        }
    },
    actions: {
        updateUserEmail({ commit }, user_id) {
            commit('setUserEmail', user_id);
        },
        logout({ commit }) {
            commit('clearUser');
        },
        updateReLike({commit}, value){
            commit('setReLike', value);
        }
    },
    getters: {
        user_no: state => state.user.user_no,
        user_id: state => state.user.user_id,
        re_like: state => state.re_like,
    },
    plugins: [
        persistedstate({
            paths: ['user','re_like']
        })
    ]
});

export default store;