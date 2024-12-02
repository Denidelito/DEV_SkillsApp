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
                this.tasks = response.data;
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    this.authStore.logout();
                    throw new Error('Session expired. Please log in again.');
                } else {
                    this.handleError(error);
                }
            }
        },

        async addTask(taskGroupId, taskData, adminId) {
            this.clearMessages();
            try {
                const response = await axios.post(
                    `/api/tasks`,
                    { task_group_id: taskGroupId, task_data: taskData, admin_id: adminId },
                    {
                        headers: {
                            Authorization: this.getAuthToken(),
                        },
                    }
                );

                this.tasks.push({
                    id: response.data.taskId,
                    task_group_id: taskGroupId,
                    task_data: taskData,
                    admin_id: adminId,
                });

                this.successMessage = 'Task added successfully!';
                return response.data;
            } catch (error) {
                this.handleError(error);
                return null;
            }
        },

        async updateTask(taskId, taskData) {
            this.clearMessages();
            try {
                const response = await axios.put(
                    `/api/tasks/${taskId}`,
                    { task_data: taskData },
                    {
                        headers: {
                            Authorization: this.getAuthToken(),
                        },
                    }
                );

                const taskIndex = this.tasks.findIndex((task) => task.id === taskId);
                if (taskIndex !== -1) {
                    this.tasks[taskIndex] = { ...this.tasks[taskIndex], task_data: taskData };
                }

                this.successMessage = 'Task updated successfully!';
                return response.data;
            } catch (error) {
                this.handleError(error);
                return null;
            }
        },

        async deleteTask(taskId) {
            this.clearMessages();
            try {
                await axios.delete(`/api/tasks/${taskId}`, {
                    headers: {
                        Authorization: this.getAuthToken(),
                    },
                });

                this.tasks = this.tasks.filter((task) => task.id !== taskId);

                this.successMessage = 'Task deleted successfully!';
            } catch (error) {
                this.handleError(error);
            }
        },
    },
});