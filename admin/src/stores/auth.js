import { defineStore } from 'pinia';
import axios from '../axios';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token') || '',
        user: null,
        errorMessage: '',
    }),

    actions: {
        async login(username, password) {
            this.errorMessage = '';

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
                if (error.response) {
                    this.errorMessage = error.response.data.message || 'Login failed!';
                } else {
                    this.errorMessage = 'Server error!';
                }
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
