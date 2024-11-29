import { defineStore } from 'pinia';
import axios from '../axios';
import { useAuthStore } from './auth';

export const useUsersStore = defineStore('users', {
    state: () => ({
        users: [],
        authStore: useAuthStore(),
        errorMessage: '',
        successMessage: '',
    }),
    actions: {
        handleError(error) {
            if (error.response) {
                this.errorMessage = error.response.data.message || 'Request failed!';
            } else if (error.request) {
                this.errorMessage = 'No response from server. Please try again later.';
            } else {
                this.errorMessage = `Request error: ${error.message}`;
            }
        },

        clearMessages() {
            this.errorMessage = '';
            this.successMessage = '';
        },

        getAuthToken() {
            return `Bearer ${this.authStore.token}`;
        },

        async addUser(username, password, role) {
            this.clearMessages();

            try {
                const response = await axios.post(
                    '/api/users',
                    { username, password, role },
                    {
                        headers: {
                            Authorization: this.getAuthToken(),
                        },
                    }
                );

                this.successMessage = 'User added successfully!';
                return response.data;
            } catch (error) {
                this.handleError(error);
                return null;
            }
        },

        async fetchUsers() {
            try {
                const response = await axios.get('/api/users', {
                    headers: {
                        Authorization: this.getAuthToken(),
                    },
                });
                this.users = response.data;
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    this.authStore.logout();
                    throw new Error('Session expired. Please log in again.');
                } else {
                    this.handleError(error);
                }
            }
        },

        async deleteUser(userId) {
            this.clearMessages();

            try {
                const response = await axios.delete(`/api/users/${userId}`, {
                    headers: {
                        Authorization: this.getAuthToken(),
                    },
                });

                this.users = this.users.filter(user => user.id !== userId);
                this.successMessage = 'User deleted successfully!';
                return response.data;
            } catch (error) {
                this.handleError(error);
                return null;
            }
        },
    },
});
