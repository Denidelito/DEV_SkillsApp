import { defineStore } from 'pinia';
import axios from '../axios';
import { useAuthStore } from './auth';
import {useHandleLogStore} from "./handleLog.js";

export const useDirectionsStore = defineStore('directions', {
    state: () => ({
        directions: [],
        authStore: useAuthStore(),
        handleLog: useHandleLogStore()
    }),

    actions: {
        getAuthToken() {
            return `Bearer ${this.authStore.token}`;
        },

        async fetchDirections() {
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
                    this.handleLog.handleError(error);
                }
            }
        },

        async addDirection(name, description) {
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

                this.handleLog.setSuccessMessage('Direction added successfully!');
                return response.data;
            } catch (error) {
                this.handleLog.handleError(error);
                return null;
            }
        },

        async updateDirection(directionId, name, description) {
            try {
                const response = await axios.put(
                    `/api/directions/${directionId}`,
                    { name, description },
                    {
                        headers: {
                            Authorization: this.getAuthToken(),
                        },
                    }
                );

                const index = this.directions.findIndex(direction => direction.id === directionId);
                if (index !== -1) {
                    this.directions[index] = { ...this.directions[index], name, description };
                }

                this.handleLog.setSuccessMessage('Direction updated successfully!');
                return response.data;
            } catch (error) {
                this.handleLog.handleError(error);
                return null;
            }
        },

        async deleteDirection(directionId) {
            try {
                const response = await axios.delete(`/api/directions/${directionId}`, {
                    headers: {
                        Authorization: this.getAuthToken(),
                    },
                });

                this.directions = this.directions.filter(
                    direction => direction.id !== directionId
                );

                this.handleLog.setSuccessMessage('Direction deleted successfully!');
                return response.data;
            } catch (error) {
                this.handleLog.handleError(error);
                return null;
            }
        },
    },
});
