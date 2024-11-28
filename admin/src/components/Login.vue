<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const username = ref('');
const password = ref('');
const errorMessage = ref('');

const authStore = useAuthStore();
const router = useRouter();

// Функция для авторизации
const login = async () => {
  if (!username.value || !password.value) {
    errorMessage.value = 'Username and password are required!';
    return;
  }

  const success = await authStore.login(username.value, password.value);
  if (success) {
    router.push('/admin/');
  } else {
    errorMessage.value = authStore.errorMessage;
  }
};
</script>

<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required/>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required/>
      </div>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<style scoped>
.login-container {
  max-width: 400px;
  margin: auto;
  padding: 2em;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 1em;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 0.5em;
}

input {
  padding: 0.5em;
  margin-bottom: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 0.75em;
  background-color: #42b883;
  border: none;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #36a074;
}

.error-message {
  color: red;
  font-size: 0.9em;
  margin-bottom: 1em;
}
</style>
