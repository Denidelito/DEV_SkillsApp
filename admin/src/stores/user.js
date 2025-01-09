import { defineStore } from 'pinia';
import axios from '../axios';
import {useHandleLogStore} from "./handleLog.js";
import { useAuthStore } from './auth';

export const useUsersStore = defineStore('users', {
    state: () => ({
        users: [],
        authStore: useAuthStore(),
        handleLog: useHandleLogStore()
    }),
    actions: {
        getAuthToken() {
            return `Bearer ${this.authStore.token}`;
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
                    this.handleLog.handleError(error);
                }
            }
        },

        async addUser(username, password, role) {
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

                this.handleLog.setSuccessMessage('User added successfully!');
                await this.fetchUsers();
                return response.data;
            } catch (error) {
                this.handleLog.handleError(error);
                return null;
            }
        },

        async deleteUser(userId) {
            try {
                const response = await axios.delete(`/api/users/${userId}`, {
                    headers: {
                        Authorization: this.getAuthToken(),
                    },
                });

                this.users = this.users.filter(user => user.id !== userId);
                this.handleLog.setSuccessMessage('User deleted successfully!');
                return response.data;
            } catch (error) {
                this.handleLog.handleError(error);
                return null;
            }
        },
    },
});
