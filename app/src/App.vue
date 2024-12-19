<script setup>
import { useAuthStore } from './stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  authStore.logout();
  router.push('/auth/login');
};
</script>

<template>
<!--  <nav>
    <button v-if="authStore.isAuthenticated" @click="handleLogout">Logout</button>
  </nav>-->
  <router-view></router-view>
</template>

<style>
nav {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

button {
  background: none;
  border: 1px solid #ccc;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

button:hover {
  background-color: #f0f0f0;
}
</style>
