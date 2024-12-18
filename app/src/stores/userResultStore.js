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
                this.errorMessage = error.response.data.message || 'Something went wrong!';
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
                    console.error('Error fetching user results:', error);
                    this.handleError(error);
                }
            }
        },

        async addUserResult(userId, taskGroupId, score) {
            this.clearMessages();
            try {
                const response = await axios.post(
                    '/api/userResults/add',
                    { userId, taskGroupId, score }, {
                    headers: {
                        Authorization: this.getAuthToken(),
                    },
                });
                this.successMessage = 'User result added successfully!';
                this.userResults.push(response.data.result);
            } catch (error) {
                console.error('Error adding user result:', error);
                this.handleError(error);
            }
        },

        async fetchUserResultsByUserId(userId) {
            this.clearMessages();
            try {
                const response = await axios.get(`/api/userResults/user/${userId}`, {
                    headers: {
                        Authorization: this.getAuthToken(),
                    },
                });
                this.userResults = response.data;
            } catch (error) {
                console.error('Error fetching user results by user ID:', error);
                this.handleError(error);
            }
        },

        async deleteUserResultById(id) {
            this.clearMessages();
            try {
                await axios.delete(`/api/userResults/${id}`, {
                    headers: {
                        Authorization: this.getAuthToken(),
                    },
                });
                this.successMessage = 'User result deleted successfully!';
                this.userResults = this.userResults.filter(result => result.id !== id);
            } catch (error) {
                console.error('Error deleting user result:', error);
                this.handleError(error);
            }
        },

        async updateUserResultById(id, newScore) {
            this.clearMessages();
            try {
                const response = await axios.put(`/api/userResults/${id}`, { newScore }, {
                    headers: {
                        Authorization: this.getAuthToken(),
                    },
                });
                this.successMessage = 'User result updated successfully!';
                const index = this.userResults.findIndex(result => result.id === id);
                if (index !== -1) {
                    this.userResults[index] = { ...this.userResults[index], score: newScore };
                }
            } catch (error) {
                console.error('Error updating user result:', error);
                this.handleError(error);
            }
        },
    },
});
