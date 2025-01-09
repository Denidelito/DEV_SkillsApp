import { defineStore } from 'pinia';
import axios from '../axios';
import { useAuthStore } from './auth';
import { useHandleLogStore } from "./handleLog.js";

export const useTasksStore = defineStore('tasks', {
    state: () => ({
        tasks: [],
        authStore: useAuthStore(),
        handleLog: useHandleLogStore()
    }),

    actions: {
        getAuthToken() {
            return `Bearer ${this.authStore.token}`;
        },

        async fetchTasksByGroup(groupId) {
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
                        return item;
                    }
                });

                this.tasks = response.data;
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    this.authStore.logout();
                    throw new Error('Session expired. Please log in again.');
                } else {
                    this.handleLog.handleError(error);
                }
            }
        },

        async addTask(taskGroupId, taskData, adminId) {
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

                this.handleLog.setSuccessMessage('Task added successfully!');
                return response.data;
            } catch (error) {
                this.handleLog.handleError(error);
                return null;
            }
        },

        async deleteTask(taskId) {
            try {
                await axios.delete(`/api/tasks/${taskId}`, {
                    headers: {
                        Authorization: this.getAuthToken(),
                    },
                });

                this.tasks = this.tasks.filter((task) => task.id !== taskId);

                this.handleLog.setSuccessMessage('Task deleted successfully!');
            } catch (error) {
                this.handleLog.handleError(error);
            }
        },

        async updateTask(taskId, updatedTaskData) {
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

                this.handleLog.setSuccessMessage('Task updated successfully!');
                return response.data;
            } catch (error) {
                this.handleLog.handleError(error);
                return null;
            }
        }
        ,
    },
});
