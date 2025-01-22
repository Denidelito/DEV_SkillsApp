<script setup>
import {computed, onMounted} from "vue";
import { useAuthStore } from "../stores/auth.js";
import SvgIcon from "./SvgIcon.vue";

const userStore = useAuthStore();

let userData = computed(() => userStore.user);
let logProfile = () => alert('Профиль пользователя находится в разработке.')
let logNotifications = () => alert('Уведомления находятся в разработке.')
</script>

<template>
  <header class="app-header">
    <div class="profile" @click="logProfile">
      <div class="profile__avatar">
        <svg-icon name="profile" width="50" height="50"/>
      </div>
      <div>
        <div class="profile__text-subtitle">Привет</div>
        <div class="profile__text-username">{{userData.username}}</div>
      </div>
    </div>
    <div @click="logNotifications">
      <svg-icon name="notifications" width="50" height="50"/>
    </div>
  </header>
</template>

<style scoped lang="scss">
  .app-header {
    display: flex;
    align-items: center;
    padding: 32px 16px;
  }
  .profile {
    display: flex;
    align-items: center;
    color: var(--color-secondary);
    gap: 20px;

    &__text {
      &-username {
        font-size: 24px;
        font-family: var(--font-secondary), sans-serif;
        font-weight: 600;
      }
      &-subtitle {
        font-size: 16px;
        font-family: var(--font-secondary), sans-serif;
      }
    }
    &__avatar {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background-color: #CFBEF6;
    }
  }
</style>