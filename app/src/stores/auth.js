import { defineStore } from 'pinia';
import axios from '../axios';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token') || '',
        user: JSON.parse(localStorage.getItem('user')) || null,
        isAuthenticated: !!localStorage.getItem('user'),
        error: null,
    }),
    actions: {
        async login(username) {
            try {
                const response = await axios.post('/auth/login', { username, password: '1111' });

                if (response.data.role === 'user') {
                    this.user = response.data.user;
                    this.token = response.data.token;
                    this.isAuthenticated = true;
                    this.error = null;

                    localStorage.setItem('user', JSON.stringify(response.data));
                    localStorage.setItem('token', response.data.token);

                    axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
                    return true;
                } else {
                    this.error = 'Access denied: Only users with the "user" role can log in.';
                    return false;
                }
            } catch (err) {
                this.error = 'Login failed. Please try again.';
                console.error(err);
                return false;
            }
        },

        logout() {
            this.user = null;
            this.token = '';
            this.isAuthenticated = false;
            this.error = null;

            localStorage.removeItem('user');
            localStorage.removeItem('token');

            delete axios.defaults.headers.common['Authorization'];
        },
    },
});
