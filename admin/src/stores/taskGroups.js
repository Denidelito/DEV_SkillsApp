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

        clearMessages() {
            this.errorMessage = '';
            this.successMessage = '';
        },

        getAuthToken() {
            return `Bearer ${this.authStore.token}`;
        },

        async fetchGroupsByDirection(directionId) {
            this.clearMessages();
            try {
                const response = await axios.get(`/api/task_groups/direction/${directionId}`, {
                    headers: {
                        Authorization: this.getAuthToken(),
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
            this.clearMessages();
            try {
                const response = await axios.post(
                    `/api/task_groups`,
                    { direction_id: directionId, name, description },
                    {
                        headers: {
                            Authorization: this.getAuthToken(),
                        },
                    }
                );

                this.groups.push({
                    id: response.data.taskGroupId,
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
            this.clearMessages();
            try {
                const response = await axios.delete(`/api/task_groups/${groupId}`, {
                    headers: {
                        Authorization: this.getAuthToken(),
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

        async updateTask(taskId, updatedTaskData) {
            this.clearMessages();
            try {
                const response = await axios.put(
                    `/api/tasks/${taskId}`,
                    { task_data: updatedTaskData.task_data },
                    {
                        headers: {
                            Authorization: this.getAuthToken(),
                        },
                    }
                );

                const taskIndex = this.tasks.findIndex((task) => task.id === taskId);
                if (taskIndex !== -1) {
                    this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...response.data };
                }

                this.successMessage = 'Task updated successfully!';
                return response.data;
            } catch (error) {
                this.handleError(error);
                return null;
            }
        }

    },
});
