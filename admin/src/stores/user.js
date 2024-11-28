import { defineStore } from 'pinia';
import axios from '../axios';
import { useAuthStore } from './auth';

export const useUsersStore = defineStore('users', {
    state: () => ({
        users: [],
        authStore: useAuthStore(),
        errorMessage: '',
        successMessage: ''
    }),
    actions: {
        async addUser(username, password, role) {
            this.errorMessage = '';
            this.successMessage = '';

            try {
                const response = await axios.post(
                    '/api/users',
                    { username, password, role },
                    {
                        headers: {
                            Authorization: `Bearer ${this.authStore.token}`,
                        },
                    }
                );

                this.successMessage = 'User added successfully!';
                return response.data;
            } catch (error) {
                if (error.response) {
                    this.errorMessage = error.response.data.message || 'Failed to add user!';
                } else if (error.request) {
                    this.errorMessage = 'No response from server. Please try again later.';
                } else {
                    this.errorMessage = `Request error: ${error.message}`;
                }
                return null;
            }
        },

        async fetchUsers() {
            try {
                const response = await axios.get('/api/users', {
                    headers: {
                        Authorization: `Bearer ${this.authStore.token}`,
                    },
                });
                this.users = response.data;
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    this.authStore.logout();
                    throw new Error('Session expired. Please log in again.');
                } else {
                    throw new Error(error.response?.data?.message || 'Failed to fetch users!');
                }
            }
        },

        async deleteUser(userId) {
            this.errorMessage = '';
            this.successMessage = '';

            try {
                const response = await axios.delete(`/api/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${this.authStore.token}`,
                    },
                });

                this.users = this.users.filter(user => user.id !== userId);
                this.successMessage = 'User deleted successfully!';
                return response.data;
            } catch (error) {
                if (error.response) {
                    this.errorMessage = error.response.data.message || 'Failed to delete user!';
                } else if (error.request) {
                    this.errorMessage = 'No response from server. Please try again later.';
                } else {
                    this.errorMessage = `Request error: ${error.message}`;
                }
                return null;
            }
        },
    },
});
