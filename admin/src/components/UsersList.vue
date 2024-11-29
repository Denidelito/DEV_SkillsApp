<script setup>
import { onMounted, ref } from 'vue';
import { useUsersStore } from '../stores/user';

const usersStore = useUsersStore();
const showModal = ref(false);
const userIdToDelete = ref(null);
const errorMessage = ref('');
const successMessage = ref('');

onMounted(async () => {
  try {
    await usersStore.fetchUsers();
  } catch (error) {
    errorMessage.value = error.message;
  }
});

const handleDelete = async () => {
  if (userIdToDelete.value !== null) {
    try {
      await usersStore.deleteUser(userIdToDelete.value);
      successMessage.value = 'User deleted successfully!';
      usersStore.users = usersStore.users.filter(user => user.id !== userIdToDelete.value);
      closeModal();
    } catch (error) {
      errorMessage.value = error.message;
    }
  }
};

const openModal = (userId) => {
  userIdToDelete.value = userId;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  userIdToDelete.value = null;
};

const clearMessages = () => {
  errorMessage.value = '';
  successMessage.value = '';
};
</script>

<template>
  <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  <div v-if="successMessage" class="success-message">{{ successMessage }}</div>

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
      <td>{{ user.id }}</td>
      <td>{{ user.username }}</td>
      <td>{{ user.role }}</td>
      <td>
        <button @click="openModal(user.id)" class="button button--small button--danger">Удалить</button>
      </td>
    </tr>
    </tbody>
  </table>

  <p v-else-if="!errorMessage">No users available.</p>

  <div v-if="showModal" class="modal-overlay">
    <div class="modal">
      <h3>Подтвердите удаление</h3>
      <p>Вы уверены, что хотите удалить этого пользователя?</p>
      <div class="modal-actions">
        <button @click="handleDelete" class="button button--danger">Да, удалить</button>
        <button @click="closeModal" class="button button--secondary">Отмена</button>
      </div>
    </div>
  </div>
</template>

