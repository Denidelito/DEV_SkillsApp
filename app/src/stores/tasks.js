import { defineStore } from 'pinia';
import axios from '../axios';
import { useAuthStore } from './auth';

export const useTasksStore = defineStore('tasks', {
    state: () => ({
        tasks: [],
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

        async fetchTasksByGroup(groupId) {
            this.clearMessages();
            try {
                const response = await axios.get(`/api/tasks/group/${groupId}`, {
                    headers: {
                        Authorization: this.getAuthToken(),
                    },
                });

                response.data = response.data.map((item) => {
                    try {
                        return {
                            ...item,
                            task_data: JSON.parse(item.task_data),
                        };
                    } catch (parseError) {
                        console.error('Failed to parse task_data:', item.task_data, parseError);
                        return item;
                    }
                });

                this.tasks = response.data;
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    this.authStore.logout();
                    throw new Error('Session expired. Please log in again.');
                } else {
                    console.error('Error fetching tasks:', error);
                    this.handleError(error);
                }
            }
        },
    },
});
