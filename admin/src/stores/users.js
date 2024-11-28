import { defineStore } from 'pinia';
import axios from '../axios';
import { useAuthStore } from './auth';

export const useUsersStore = defineStore('users', {
    state: () => ({
        users: [],
    }),
    actions: {
        async fetchUsers() {
            const authStore = useAuthStore();

            try {
                const response = await axios.get('/api/users', {
                    headers: {
                        Authorization: `Bearer ${authStore.token}`,
                    },
                });
                this.users = response.data;
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    authStore.logout();
                    throw new Error('Session expired. Please log in again.');
                } else {
                    throw new Error(error.response?.data?.message || 'Failed to fetch users!');
                }
            }
        },
    },
});
