<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useAuthStore } from '../stores/auth';

const users = ref([]); // Список пользователей
const errorMessage = ref(''); // Сообщение об ошибке

const authStore = useAuthStore(); // Получаем доступ к авторизационному store

const fetchUsers = async () => {
  errorMessage.value = '';

  try {
    // Отправляем GET запрос с токеном в заголовке
    const response = await axios.get('http://localhost:3000/api/users', {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    });
    users.value = response.data; // Сохраняем список пользователей
  } catch (error) {
    // Обрабатываем ошибки
    if (error.response) {
      errorMessage.value = error.response.data.message || 'Failed to fetch users!';
    } else {
      errorMessage.value = 'Network or server error!';
    }
  }
};

// Запрос пользователей при монтировании компонента
onMounted(() => {
  fetchUsers();
});
</script>

<template>
  <div class="users-list">
    <h2>Users</h2>

    <!-- Если есть ошибка, отображаем сообщение -->
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

    <!-- Отображаем список пользователей -->
    <ul v-if="users.length">
      <li v-for="user in users" :key="user.id">
        <strong>{{ user.name }}</strong> ({{ user.email }})
      </li>
    </ul>

    <!-- Если пользователей нет и ошибок нет -->
    <p v-else-if="!errorMessage">No users available.</p>
  </div>
</template>

<style scoped>
.users-list {
  max-width: 600px;
  margin: auto;
  padding: 1.5em;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 0.5em;
}

.error-message {
  color: red;
  font-size: 0.9em;
  margin-bottom: 1em;
}
</style>
