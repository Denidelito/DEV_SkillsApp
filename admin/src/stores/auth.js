import { defineStore } from 'pinia';
import axios from '../axios';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token') || '',
        user: null,
        errorMessage: '',
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

        clearErrorMessage() {
            this.errorMessage = '';
        },

        async login(username, password) {
            this.clearErrorMessage();

            try {
                const response = await axios.post('/auth/login', {
                    username,
                    password,
                });

                this.token = response.data.token;
                this.user = response.data.user;

                localStorage.setItem('token', this.token);
                return true;
            } catch (error) {
                this.handleError(error);
                return false;
            }
        },

        logout() {
            this.token = '';
            this.user = null;
            localStorage.removeItem('token');
        },

        isAuthenticated() {
            return !!this.token;
        },
    },
});
