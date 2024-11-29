<script setup>
import { onMounted, ref } from 'vue';
import { useDirectionsStore } from '../stores/directions.js';

const directionsStore = useDirectionsStore();
const showModal = ref(false);
const directionIdToDelete = ref(null);

onMounted(async () => {
  try {
    await directionsStore.fetchDirections();
  } catch (error) {
    directionsStore.errorMessage = error.message;
  }
});

const handleDelete = async () => {
  if (directionIdToDelete.value !== null) {
    try {
      await directionsStore.deleteDirection(directionIdToDelete.value);
      directionsStore.directions = directionsStore.directions.filter(
          direction => direction.id !== directionIdToDelete.value
      );
      directionsStore.successMessage = 'Направление успешно удалено.';
      showModal.value = false;

      setTimeout(() => {
        directionsStore.successMessage = '';
      }, 3000);
    } catch (error) {
      directionsStore.errorMessage = error.message;
    }
  }
};

const openModal = (directionId) => {
  directionsStore.clearMessages();
  directionIdToDelete.value = directionId;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  directionIdToDelete.value = null;
};
</script>

<template>
  <div>
    <div v-if="directionsStore.errorMessage" class="error-message">
      {{ directionsStore.errorMessage }}
    </div>
    <div v-if="directionsStore.successMessage" class="success-message">
      {{ directionsStore.successMessage }}
    </div>

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
        <td>
          <router-link :to="`/admin/directions/${direction.id}/groups`">
            {{ direction.name }}
          </router-link>
        </td>
        <td>{{ direction.description }}</td>
        <td>
          <button
              @click="openModal(direction.id)"
              class="button button--small button--danger"
          >
            Удалить
          </button>
        </td>
      </tr>
      </tbody>
    </table>

    <p v-else-if="!directionsStore.errorMessage">Нет доступных направлений.</p>

    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <h3>Подтвердите удаление</h3>
        <p>Вы уверены, что хотите удалить это направление?</p>
        <div class="modal-actions">
          <button @click="handleDelete" class="button button--danger">
            Да, удалить
          </button>
          <button @click="closeModal" class="button button--secondary">
            Отмена
          </button>
        </div>
      </div>
    </div>
  </div>
</template>