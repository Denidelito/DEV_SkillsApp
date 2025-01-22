<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../../stores/auth';

const authStore = useAuthStore();
const username = ref('');

const handleLogin = async () => {
  const success = await authStore.login(username.value);
  if (success) {
    window.location.href = '/app';
  }
};
</script>

<template>
  <div class="form-login">
    <div>
      <picture>
        <img width="301" height="301" src="../../assets/images/character.png" alt="Картинка выдры">
      </picture>
      <h3>Добро пожаловать!</h3>
      <p class="subtitle">Авторизуйтесь для входа в приложение</p>
    </div>
    <div>
      <form class="form" @submit.prevent="handleLogin">
        <div class="input-container">
          <input placeholder="Введите логин staff" id="username" v-model="username" type="text" required />
        </div>
        <button class="button" type="submit">Войти</button>
      </form>
      <p v-if="authStore.error" style="color: red">{{ authStore.error }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .form-login {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100vh;
    box-sizing: border-box;
    text-align: center;
    padding: 30px 16px;
  }

  .subtitle {
    color: var(--color-subtitle);
  }
</style>
