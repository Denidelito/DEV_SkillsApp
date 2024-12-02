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

        async addTask(taskGroupId, taskData, adminId) {
            this.clearMessages();
            try {
                const serializedData = taskData
                    ? JSON.stringify(taskData)
                    : null;

                const response = await axios.post(
                    `/api/tasks`,
                    { task_group_id: taskGroupId, task_data: serializedData, admin_id: adminId },
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

        async updateTask(taskId, updatedTaskData) {
            this.clearMessages();
            try {
                const serializedData = updatedTaskData.task_data
                    ? JSON.stringify(updatedTaskData.task_data)
                    : null;

                const response = await axios.put(
                    `/api/tasks/${taskId}`,
                    { task_data: serializedData },
                    {
                        headers: {
                            Authorization: this.getAuthToken(),
                        },
                    }
                );

                const taskIndex = this.tasks.findIndex((task) => task.id === taskId);
                if (taskIndex !== -1) {
                    this.tasks = [
                        ...this.tasks.slice(0, taskIndex),
                        { ...this.tasks[taskIndex], ...updatedTaskData },
                        ...this.tasks.slice(taskIndex + 1),
                    ];
                }

                this.successMessage = 'Task updated successfully!';
                return response.data;
            } catch (error) {
                console.error('Error updating task:', error);
                this.handleError(error);
                return null;
            }
        }
        ,
    },
});
