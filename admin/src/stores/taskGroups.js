import { defineStore } from 'pinia';
import axios from '../axios';
import { useAuthStore } from './auth';

export const useGroupsStore = defineStore('groups', {
    state: () => ({
        groups: [],
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

        async fetchGroupsByDirection(directionId) {
            this.errorMessage = '';
            this.successMessage = '';
            try {
                const response = await axios.get(`/api/task_groups/direction/${directionId}`, {
                    headers: {
                        Authorization: `Bearer ${this.authStore.token}`,
                    },
                });
                this.groups = response.data;
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    this.authStore.logout();
                    throw new Error('Session expired. Please log in again.');
                } else {
                    this.handleError(error);
                }
            }
        },

        async addGroup(directionId, name, description) {
            this.errorMessage = '';
            this.successMessage = '';
            try {
                const response = await axios.post(
                    `/api/task_groups`, // Исправлено на правильный путь
                    { direction_id: directionId, name, description },
                    {
                        headers: {
                            Authorization: `Bearer ${this.authStore.token}`,
                        },
                    }
                );

                this.groups.push({
                    id: response.data.taskGroupId, // Исправлено на правильный идентификатор
                    name,
                    description,
                });

                this.successMessage = 'Group added successfully!';
                return response.data;
            } catch (error) {
                this.handleError(error);
                return null;
            }
        },

        async deleteGroup(groupId) {
            this.errorMessage = '';
            this.successMessage = '';
            try {
                const response = await axios.delete(`/api/task_groups/${groupId}`, {
                    headers: {
                        Authorization: `Bearer ${this.authStore.token}`,
                    },
                });

                this.groups = this.groups.filter((group) => group.id !== groupId);

                this.successMessage = 'Group deleted successfully!';
                return response.data;
            } catch (error) {
                this.handleError(error);
                return null;
            }
        },
    },
});
