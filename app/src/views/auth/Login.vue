<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../../stores/auth';

const authStore = useAuthStore();
const username = ref('');

const handleLogin = async () => {
  const success = await authStore.login(username.value);
  if (success) {
    window.location.href = '/';
  }
};
</script>

<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="username">Username:</label>
        <input id="username" v-model="username" type="text" required />
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="authStore.error" style="color: red">{{ authStore.error }}</p>
  </div>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 300px;
  margin: auto;
}
</style>
