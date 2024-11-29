<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  groups: Array,
  errorMessage: String,
  successMessage: String,
  onDeleteGroup: Function
});
</script>

<template>
  <div>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    <div v-if="successMessage" class="success-message">{{ successMessage }}</div>

    <table v-if="groups.length > 0" class="table">
      <thead>
      <tr>
        <th>ID</th>
        <th>Название</th>
        <th>Описание</th>
        <th>Действия</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="group in groups" :key="group.id">
        <td>{{ group.id }}</td>
        <td>{{ group.name }}</td>
        <td>{{ group.description }}</td>
        <td>
          <button @click="onDeleteGroup(group.id)" class="button button--small button--danger">Удалить</button>
        </td>
      </tr>
      </tbody>
    </table>

    <div v-else>
      <p>No groups found for this direction.</p>
    </div>
  </div>
</template>
