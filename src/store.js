import { createStore } from "vuex";
import axios from "axios";
import useNotification from "./hooks/useNotification";

const { setNotification } = useNotification();

const state = {
    listings: [],
    loading: false
};

const mutations = {
    UPDATE_LISTINGS(state, payload) {
        state.listings = payload;
    },
    LOADING_PENDING(state) {
        state.loading = true;
    },
    LOADING_COMPLETE(state) {
        state.loading = false;
    }
};

const actions = {
    getListings({ commit }) {
        commit('LOADING_PENDING');
        return axios.get('/api/listings').then((res) => {
            commit('UPDATE_LISTINGS', res.data);
            commit('LOADING_COMPLETE');
        });
    },
    removeListing({ commit }, listing) {
        return axios.post('/api/listings/delete', listing).then((res) => {
            commit('UPDATE_LISTINGS', res.data);
            setNotification("Listing has been deleted!");
        });
    },
    resetListings({ commit }) {
        return axios.post('/api/listings/reset').then((res) => {
            commit('UPDATE_LISTINGS', res.data);
        });
    },
};

const getters = {
    listings: state => state.listings,
    loading: state => state.loading
};

export default createStore({
    state,
    mutations,
    actions,
    getters
})