import { defineStore } from 'pinia';
import axios from '../axios';
import { useAuthStore } from './auth';
import { useHandleLogStore } from "./handleLog.js";

export const useGroupsStore = defineStore('groups', {
    state: () => ({
        groups: [],
        authStore: useAuthStore(),
        handleLog: useHandleLogStore(),
    }),

    actions: {

        getAuthToken() {
            return `Bearer ${this.authStore.token}`;
        },

        async fetchGroupsByDirection(directionId) {
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

                this.handleLog.setSuccessMessage('Group added successfully!');
                return response.data;
            } catch (error) {
                this.handleLog.handleError(error);
                return null;
            }
        },

        async deleteGroup(groupId) {
            try {
                const response = await axios.delete(`/api/task_groups/${groupId}`, {
                    headers: {
                        Authorization: this.getAuthToken(),
                    },
                });

                this.groups = this.groups.filter((group) => group.id !== groupId);

                this.handleLog.setSuccessMessage('Group deleted successfully!');
                return response.data;
            } catch (error) {
                this.handleLog.handleError(error);
                return null;
            }
        },

        async updateGroup(groupId, name, description) {
            try {
                const response = await axios.put(
                    `/api/task_groups/${groupId}`,
                    { name, description },
                    {
                        headers: {
                            Authorization: this.getAuthToken(),
                        },
                    }
                );

                const groupIndex = this.groups.findIndex((group) => group.id === groupId);
                if (groupIndex !== -1) {
                    this.groups[groupIndex] = { ...this.groups[groupIndex], name, description };
                }

                this.handleLog.setSuccessMessage('Group updated successfully!');
                return response.data;
            } catch (error) {
                this.handleLog.handleError(error);
                return null;
            }
        }

    },
});
