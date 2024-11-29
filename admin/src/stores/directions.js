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
        async fetchDirections() {
            this.errorMessage = '';
            this.successMessage = '';
            try {
                const response = await axios.get('/api/directions', {
                    headers: {
                        Authorization: `Bearer ${this.authStore.token}`,
                    },
                });
                this.directions = response.data;
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    this.authStore.logout();
                    throw new Error('Session expired. Please log in again.');
                } else {
                    this.errorMessage = error.response?.data?.message || 'Failed to fetch directions!';
                }
            }
        },

        async addDirection(name, description) {
            this.errorMessage = '';
            this.successMessage = '';
            try {
                const response = await axios.post(
                    '/api/directions',
                    { name, description },
                    {
                        headers: {
                            Authorization: `Bearer ${this.authStore.token}`,
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
                if (error.response) {
                    this.errorMessage = error.response.data.message || 'Failed to add direction!';
                } else if (error.request) {
                    this.errorMessage = 'No response from server. Please try again later.';
                } else {
                    this.errorMessage = `Request error: ${error.message}`;
                }
                return null;
            }
        },

        async deleteDirection(directionId) {
            this.errorMessage = '';
            this.successMessage = '';
            try {
                const response = await axios.delete(`/api/directions/${directionId}`, {
                    headers: {
                        Authorization: `Bearer ${this.authStore.token}`,
                    },
                });

                this.directions = this.directions.filter(
                    direction => direction.id !== directionId
                );

                this.successMessage = 'Direction deleted successfully!';
                return response.data;
            } catch (error) {
                if (error.response) {
                    this.errorMessage = error.response.data.message || 'Failed to delete direction!';
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
