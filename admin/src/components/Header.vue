<script setup>
import {useAuthStore} from "../stores/auth.js";
import {useRouter} from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const logout = () => {
  authStore.logout();
  router.push('/admin/login');
};
</script>

<template>
  <h2>Welcome to the Dashboard</h2>
  <button @click="logout">Logout</button>
</template>

<style scoped>

</style>