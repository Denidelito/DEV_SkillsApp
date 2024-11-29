import { defineStore } from 'pinia';
import axios from '../axios';
import { useAuthStore } from './auth';

export const useDirectionsStore = defineStore('directions', {
    state: () => ({
        directions: [],
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

        async fetchDirections() {
            this.clearMessages();
            try {
                const response = await axios.get('/api/directions', {
                    headers: {
                        Authorization: this.getAuthToken(),
                    },
                });
                this.directions = response.data;
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    this.authStore.logout();
                    throw new Error('Session expired. Please log in again.');
                } else {
                    this.handleError(error);
                }
            }
        },

        async addDirection(name, description) {
            this.clearMessages();
            try {
                const response = await axios.post(
                    '/api/directions',
                    { name, description },
                    {
                        headers: {
                            Authorization: this.getAuthToken(),
                        },
                    }
                );

                this.directions.push({
                    id: response.data.directionId,
                    name,
                    description,
                });

                this.successMessage = 'Direction added successfully!';
                return response.data;
            } catch (error) {
                this.handleError(error);
                return null;
            }
        },

        async deleteDirection(directionId) {
            this.clearMessages();
            try {
                const response = await axios.delete(`/api/directions/${directionId}`, {
                    headers: {
                        Authorization: this.getAuthToken(),
                    },
                });

                this.directions = this.directions.filter(
                    direction => direction.id !== directionId
                );

                this.successMessage = 'Direction deleted successfully!';
                return response.data;
            } catch (error) {
                this.handleError(error);
                return null;
            }
        },
    },
});
