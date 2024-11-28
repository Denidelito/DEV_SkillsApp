<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth.js';

const username = ref('');
const password = ref('');
const errorMessage = ref('');

const authStore = useAuthStore();
const router = useRouter();

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
    <form @submit.prevent="login">
      <div class="input">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required/>
      </div>
      <div class="input">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required/>
      </div>
      <div v-if="errorMessage" class="message-error">{{ errorMessage }}</div>
      <button class="btn" type="submit">Login</button>
    </form>
  </div>
</template>

<style scoped lang="scss">
.login-container {
  width: 400px;
  margin: auto;
  padding: 2em;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
