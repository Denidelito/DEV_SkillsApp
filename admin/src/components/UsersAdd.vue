<template>
  <div class="add-user">
    <h2>Add User</h2>

    <form @submit.prevent="addUser">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div v-if="role !== 'user'">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" :required="role !== 'user'" />
      </div>
      <div>
        <label for="role">Role:</label>
        <select id="role" v-model="role" required>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </div>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
      <button type="submit">Add User</button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
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
  }
};

const errorMessage = computed(() => userStore.errorMessage);
const successMessage = computed(() => userStore.successMessage);
</script>

<style scoped>
.add-user {
  max-width: 400px;
  margin: auto;
  padding: 2em;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 1em;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 0.5em;
}

input,
select {
  padding: 0.5em;
  margin-bottom: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 0.75em;
  background-color: #42b883;
  border: none;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #36a074;
}

.error-message {
  color: red;
  font-size: 0.9em;
  margin-bottom: 1em;
}

.success-message {
  color: green;
  font-size: 0.9em;
  margin-bottom: 1em;
}
</style>
