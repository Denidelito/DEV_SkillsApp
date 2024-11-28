<script setup>
import {useAuthStore} from "../../stores/auth.js";
import {useRouter} from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const logout = () => {
  authStore.logout();
  router.push('/admin/login');
};
</script>

<template>
  <div class="dashboard-header">
    <div>Панель администратора</div>
    <div>
      <button class="button" @click="logout">Logout</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>