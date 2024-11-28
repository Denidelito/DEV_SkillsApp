<script setup>
import { ref, computed } from "vue";
import UsersList from "../components/UsersList.vue";
import { useUsersStore } from '../stores/user';

const username = ref('');
const password = ref('');
const role = ref('user');
const userStore = useUsersStore();

const addUser = async () => {
  const response = await userStore.addUser(
      username.value,
      role.value === 'user' ? null : password.value,
      role.value
  );

  if (response) {
    username.value = '';
    password.value = '';
    role.value = 'user';

    closeModal();

    await userStore.fetchUsers();
  }
};

const errorMessage = computed(() => userStore.errorMessage);
const successMessage = computed(() => userStore.successMessage);

const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  username.value = '';
  password.value = '';
  role.value = 'user';
  userStore.errorMessage = null;
  userStore.successMessage = null;
};
</script>

<template>
  <button class="button" @click="openModal">Добавить пользователя</button>

  <div v-if="isModalOpen" class="modal-overlay">
    <div class="modal">
      <form @submit.prevent="addUser">
        <div class="input">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" required />
        </div>
        <div class="input" v-if="role !== 'user'">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" :required="role !== 'user'" />
        </div>
        <div class="input">
          <label for="role">Role:</label>
          <select id="role" v-model="role" required>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
        <div v-if="errorMessage" class="message-error">{{ errorMessage }}</div>
        <div v-if="successMessage" class="message-success">{{ successMessage }}</div>
        <button class="button" type="submit">Добавить</button>
        <button class="button button--secondary" type="button" @click="closeModal">Отмена</button>
      </form>
    </div>
  </div>

  <users-list/>
</template>

<style scoped>

</style>