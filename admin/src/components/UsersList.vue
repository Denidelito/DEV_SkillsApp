<script setup>
import { onMounted, ref } from 'vue';
import { useUsersStore } from '../stores/user';

const usersStore = useUsersStore();
const errorMessage = ref('');

// Загружаем список пользователей при монтировании
onMounted(async () => {
  try {
    await usersStore.fetchUsers();
  } catch (error) {
    errorMessage.value = error.message;
  }
});
</script>

<template>
  <div class="users-list">
    <h2>Users</h2>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

    <ul v-if="usersStore.users.length">
      <li v-for="user in usersStore.users" :key="user.id">
        {{user.username}}
      </li>
    </ul>

    <p v-else-if="!errorMessage">No users available.</p>
  </div>
</template>

<style scoped>
.users-list {
  width: 100%;
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
