<script setup>
import {onMounted, ref} from "vue";
import { useDirectionsStore } from '../stores/directions.js';
const errorMessage = ref('');

const directionsStore = useDirectionsStore();

onMounted(async () => {
  try {
    await directionsStore.fetchDirections();
  } catch (error) {
    errorMessage.value = error.message;
  }
});
</script>

<template>
  <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

  <table class="table" v-if="directionsStore.directions.length">
    <thead>
    <tr>
      <th>id</th>
      <th>name</th>
      <th>description</th>
      <th>actions</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="direction in directionsStore.directions" :key="direction.id">
      <td>{{ direction.id }}</td>
      <td>{{ direction.name }}</td>
      <td>{{ direction.description }}</td>
      <td>
        <!-- Actions (e.g., Edit/Delete) can be added here -->
      </td>
    </tr>
    </tbody>
  </table>

  <p v-else-if="!errorMessage">No directions available.</p>
</template>

<style scoped lang="scss">

</style>