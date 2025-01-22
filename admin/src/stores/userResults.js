import { defineStore } from 'pinia';
import axios from '../axios';
import { useAuthStore } from './auth';

export const useUserResultsStore = defineStore('userResults', {
    state: () => ({
        userResults: [],
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

        async fetchAllUserResults() {
            this.clearMessages();

            try {
                const response = await axios.get('/api/userResults/all', {
                    headers: {
                        Authorization: this.getAuthToken(),
                    },
                });
                this.userResults = response.data;

            } catch (error) {
                if (error.response && error.response.status === 401) {
                    this.authStore.logout();
                    throw new Error('Session expired. Please log in again.');
                } else {
                    this.handleError(error);
                }
            }
        },

        async fetchUserResults(userId) {
            this.clearMessages();

            try {
                const response = await axios.get(`/api/userResults/user/${userId}`, {
                    headers: {
                        Authorization: this.getAuthToken(),
                    },
                });
                this.userResults = response.data;
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    this.authStore.logout();
                    throw new Error('Session expired. Please log in again.');
                } else {
                    this.handleError(error);
                }
            }
        },

        async addUserResult(userId, taskGroupId, score) {
            this.clearMessages();

            try {
                const response = await axios.post(
                    '/api/userResults/add',
                    { userId, taskGroupId, score },
                    {
                        headers: {
                            Authorization: this.getAuthToken(),
                        },
                    }
                );

                this.successMessage = 'Result added successfully!';
                await this.fetchUserResults(userId);
                return response.data;
            } catch (error) {
                this.handleError(error);
                return null;
            }
        },

        async deleteUserResult(resultId, userId) {
            this.clearMessages();

            try {
                const response = await axios.delete(`/api/userResults/${resultId}`, {
                    headers: {
                        Authorization: this.getAuthToken(),
                    },
                });

                this.successMessage = 'Result deleted successfully!';
                await this.fetchUserResults(userId);
                return response.data;
            } catch (error) {
                this.handleError(error);
                return null;
            }
        },

        async updateUserResult(resultId, newScore, userId) {
            this.clearMessages();

            try {
                const response = await axios.put(
                    `/api/userResults/${resultId}`,
                    { newScore },
                    {
                        headers: {
                            Authorization: this.getAuthToken(),
                        },
                    }
                );

                this.successMessage = 'Result updated successfully!';
                await this.fetchUserResults(userId);
                return response.data;
            } catch (error) {
                this.handleError(error);
                return null;
            }
        },
    },
});
