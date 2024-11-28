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
  <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

  <table class="table" v-if="usersStore.users.length">
    <thead>
    <tr>
      <th>id</th>
      <th>username</th>
      <th>role</th>
      <th>actions</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="user in usersStore.users" :key="user.id">
      <td>{{user.id}}</td>
      <td>{{user.username}}</td>
      <td>{{user.role}}</td>
      <td>Удалить</td>
    </tr>
    </tbody>
  </table>

  <p v-else-if="!errorMessage">No users available.</p>
</template>

<style scoped>

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
