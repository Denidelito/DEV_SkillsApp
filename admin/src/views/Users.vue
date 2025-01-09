<script setup>
import {ref, computed} from "vue";
import UsersList from "../components/UsersList.vue";
import {useUsersStore} from '../stores/user';

const username = ref('');
const password = ref('');
const role = ref('user');
const userStore = useUsersStore();

const isModalOpen = ref(false);

const passwordFieldRequired = computed(() => role.value !== 'user');


const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  resetForm();
};

const resetForm = () => {
  username.value = '';
  password.value = '';
  role.value = 'user';
};

const addUser = async () => {
  const response = await userStore.addUser(
      username.value,
      passwordFieldRequired.value ? password.value : null,
      role.value
  );

  if (response) {
    resetForm();
    closeModal();
    await userStore.fetchUsers();
  }
};
</script>

<template>
  <div>
    <button class="button" @click="openModal">Добавить пользователя</button>
  </div>

  <div v-if="isModalOpen" class="modal-overlay">
    <div class="modal">
      <form @submit.prevent="addUser">
        <div class="input">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" required/>
        </div>
        <div class="input" v-if="passwordFieldRequired">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" :required="passwordFieldRequired"/>
        </div>
        <div class="input">
          <label for="role">Role:</label>
          <select id="role" v-model="role" required>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
        <button class="button" type="submit">Добавить</button>
        <button class="button button--secondary" type="button" @click="closeModal">Отмена</button>
      </form>
    </div>
  </div>

  <users-list/>
</template>

<style>

</style>