<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <div class="dashboard-nav">
    <router-link
        to="/admin/users"
        :class="{ 'router-link-active': route.path.startsWith('/admin/users') }"
    >
      Пользователи
    </router-link>
    <router-link
        to="/admin/directions"
        :class="{ 'router-link-active': route.path.startsWith('/admin/directions') }"
    >
      Направления
    </router-link>
  </div>
</template>

<style scoped lang="scss">
.dashboard-nav {
  width: 300px;
  padding: 20px 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  a {
    display: block;
    padding: 10px 20px;
    text-decoration: none;
    background-color: #007bff;
    color: white;
    font-size: 16px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0056b3;
    }

    &.router-link-active {
      background-color: #0056b3;
      font-weight: bold;
    }

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
