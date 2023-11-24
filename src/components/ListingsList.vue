<template>
    <div id="listings">
        <Notification :notification="notification" :toggleNotification="toggleNotification" />
        <div v-for="listing in listings" :key="listing.id">
            <ListingsListItem :listing="listing" />
        </div>
        <button
            class="button is-light"
            :class="{ 'is-primary': darkMode, 'is-info': !darkMode }"
            @click="resetListings" 
            :disabled="listings.length === 3">
            Reset
        </button>
    </div>
</template>

<script>
import { onMounted, inject } from 'vue';
import ListingsListItem from './ListingsListItem.vue';
import Notification from './Notification.vue';
import useNotification from '../hooks/useNotification';
import useDarkMode from '../hooks/useDarkMode';

export default {
    name: "ListingsList",
    props: ["listings", "isDark"],
    setup() {
        // access the store
        const store = inject("store");

        const { notification, setNotification, toggleNotification } = useNotification();
        const { darkMode } = useDarkMode();

        // methods
        const resetListings = () => {
            setNotification("Listings have been reset!")
            return store.actions.resetListings();
        }

        // mounted lifecycle hook
        onMounted(() => {
            setNotification("Welcome to NewlineBnB!");
        })

        // return properties for component to access
        return {
            darkMode,
            notification,
            toggleNotification,
            resetListings,
        }
    },
    components: {
        ListingsListItem,
        Notification,
    }
}
</script>