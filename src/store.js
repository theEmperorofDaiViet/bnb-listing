import { reactive, readonly } from "vue";
import axios from "axios";
import useNotification from "./hooks/useNotification";

const { setNotification } = useNotification();

const state = reactive({
    listings: [],
    loading: false
});

const mutations = {
    updateListings: (payload) => {
        state.listings = payload;
    },
    loadingPending: () => {
        state.loading = true;
    },
    loadingComplete: () => {
        state.loading = false;
    }
};

const actions = {
    getListings: async () => {
        mutations.loadingPending();
        return axios.get('/api/listings').then((res) => {
            mutations.updateListings(res.data);
            mutations.loadingComplete();
        });
    },
    removeListing: async (listing) => {
        return axios.post('/api/listings/delete', listing).then((res) => {
            mutations.updateListings(res.data);
            setNotification("Listing has been deleted!");
        });
    },
    resetListings: async () => {
        return axios.post('/api/listings/reset').then((res) => {
            mutations.updateListings(res.data);
        });
    },
};

export default {
    state: readonly(state),
    mutations,
    actions,
};