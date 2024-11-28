<script setup>
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';
import UsersList from "./UsersList.vue";

const authStore = useAuthStore();
const router = useRouter();

// Функция для выхода из системы
const logout = () => {
  authStore.logout();
  router.push('/admin/login');
};
</script>

<template>
  <div>
    <h2>Welcome to the Dashboard</h2>
    <button @click="logout">Logout</button>
    <users-list/>
  </div>
</template>
