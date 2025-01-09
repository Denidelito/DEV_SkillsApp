<script setup>
import { onMounted, ref } from 'vue';
import { useUsersStore } from '../stores/user';
import ActionConfirm from "./forms/ActionConfirm.vue";

const usersStore = useUsersStore();
const showModal = ref(false);
const userIdToDelete = ref(null);

onMounted(async () => {
  try {
    await usersStore.fetchUsers();
  } catch (error) {
    errorMessage.value = error.message;
  }
});

const handleDelete = async () => {
  if (userIdToDelete.value !== null) {
    await usersStore.deleteUser(userIdToDelete.value);
    usersStore.users = usersStore.users.filter(user => user.id !== userIdToDelete.value);
    closeModal();
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
</script>

<template>
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
      <td><router-link :to="`/admin/users/${user.id}/results`">{{ user.username }}</router-link></td>
      <td>{{ user.role }}</td>
      <td>
        <button @click="openModal(user.id)" class="button button--small button--danger">Удалить</button>
      </td>
    </tr>
    </tbody>
  </table>

  <ActionConfirm v-if="showModal"
      title="Подтвердите удаление"
      text="Вы уверены, что хотите удалить этого пользователя?"
      :action-accept="handleDelete"
      :action-cancel="closeModal"/>
</template>
