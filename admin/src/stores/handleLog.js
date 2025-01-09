import { defineStore } from 'pinia';

export const useHandleLogStore = defineStore('handleLog', {
    state: () => ({
        errorMessage: '',
        successMessage: '',
    }),
    actions: {
        handleError(error) {
            if (error.response) {
                this.errorMessage = error.response.data.message || 'Request failed!';
            } else if (error.request) {
                this.errorMessage = 'No response from server. Please try again later.';
            } else {
                this.errorMessage = `Request error: ${error.message}`;
            }

            setTimeout(() => this.clearMessages(), 3000);
        },

        setSuccessMessage(message) {
            this.successMessage = message;

            setTimeout(() => this.clearMessages(), 3000);
        },

        clearMessages() {
            this.errorMessage = '';
            this.successMessage = '';
        },
    },
});