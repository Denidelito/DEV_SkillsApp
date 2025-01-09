import { defineStore } from 'pinia';
import axios from '../axios';
import { useHandleLogStore } from './handleLog';
import { useAuthStore } from './auth';

export const useFilesStore = defineStore('files', {
    state: () => ({
        files: [],
        authStore: useAuthStore(),
        handleLog: useHandleLogStore(),
    }),
    actions: {
        getAuthToken() {
            return `Bearer ${this.authStore.token}`;
        },

        // Получение всех файлов
        async fetchFiles() {
            try {
                const response = await axios.get('/api/files', {
                    headers: {
                        Authorization: this.getAuthToken(),
                    },
                });
                this.files = response.data;
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    this.authStore.logout();
                    throw new Error('Session expired. Please log in again.');
                } else {
                    this.handleLog.handleError(error);
                }
            }
        },

        // Загрузка нового файла
        async uploadFile(file) {
            try {
                const formData = new FormData();
                formData.append('file', file);

                const response = await axios.post('/api/files/upload', formData, {
                    headers: {
                        Authorization: this.getAuthToken(),
                        'Content-Type': 'multipart/form-data',
                    },
                });

                this.handleLog.setSuccessMessage('File uploaded successfully!');
                await this.fetchFiles(); // Обновляем список файлов
                return response.data;
            } catch (error) {
                this.handleLog.handleError(error);
                return null;
            }
        },

        // Удаление файла
        async deleteFile(fileId) {
            try {
                const response = await axios.delete(`/api/files/${fileId}`, {
                    headers: {
                        Authorization: this.getAuthToken(),
                    },
                });

                this.files = this.files.filter(file => file.id !== fileId);
                this.handleLog.setSuccessMessage('File deleted successfully!');
                return response.data;
            } catch (error) {
                this.handleLog.handleError(error);
                return null;
            }
        },

        // Получение файла по ID
        async getFileById(fileId) {
            try {
                const response = await axios.get(`/api/files/${fileId}`, {
                    headers: {
                        Authorization: this.getAuthToken(),
                    },
                });
                return response.data;
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    this.authStore.logout();
                    throw new Error('Session expired. Please log in again.');
                } else {
                    this.handleLog.handleError(error);
                    return null;
                }
            }
        },
    },
});
