<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useDirectionsStore } from '../stores/directions.js';
import ActionConfirm from "./forms/ActionConfirm.vue";

const directionsStore = useDirectionsStore();
const showDeleteModal = ref(false);
const showEditModal = ref(false);
const directionIdToDelete = ref(null);
const editDirection = reactive({ id: null, name: '', description: '' });

onMounted(async () => {
  try {
    await directionsStore.fetchDirections();
  } catch (error) {
    directionsStore.errorMessage = error.message;
  }
});

const handleDelete = async () => {
  if (directionIdToDelete.value !== null) {
    await directionsStore.deleteDirection(directionIdToDelete.value);
    showDeleteModal.value = false;
  }
};

const handleEdit = async () => {
  try {
    await directionsStore.updateDirection(editDirection.id, editDirection.name, editDirection.description);
    directionsStore.successMessage = 'Направление успешно обновлено.';
    showEditModal.value = false;

    setTimeout(() => {
      directionsStore.successMessage = '';
    }, 3000);
  } catch (error) {
    directionsStore.errorMessage = error.message;
  }
};

const openDeleteModal = (directionId) => {
  directionIdToDelete.value = directionId;
  showDeleteModal.value = true;
};

const openEditModal = (direction) => {
  directionsStore.clearMessages();
  editDirection.id = direction.id;
  editDirection.name = direction.name;
  editDirection.description = direction.description;
  showEditModal.value = true;
};

const closeModal = () => {
  showDeleteModal.value = false;
  showEditModal.value = false;
  directionIdToDelete.value = null;
};
</script>


<template>
  <div>
    <div v-if="directionsStore.errorMessage" class="message message-error">
      <div class="message-content">
        {{ directionsStore.errorMessage }}
      </div>
    </div>

    <div v-if="directionsStore.successMessage" class="message message-success">
      <div class="message-content">
        {{ directionsStore.successMessage }}
      </div>
    </div>

    <!-- Directions Table -->
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
          <button @click="openDeleteModal(direction.id)" class="button button--small button--danger">Удалить</button>
          <button @click="openEditModal(direction)" class="button button--small">Редактировать</button>
        </td>
      </tr>
      </tbody>
    </table>
    <p v-else-if="!directionsStore.errorMessage">Нет доступных направлений.</p>

    <!-- Delete Modal -->
    <ActionConfirm v-if="showDeleteModal"
                   title="Подтвердите удаление"
                   text="Вы уверены, что хотите удалить это направление?"
                   :action-accept="handleDelete"
                   :action-cancel="closeModal"/>

    <!-- Edit Modal -->
    <div v-if="showEditModal" class="modal-overlay">
      <div class="modal">
        <h3>Редактировать направление</h3>
        <div class="modal-content">
          <div class="input">
            <label for="direction-name" class="input">Название:</label>
            <input id="direction-name" v-model="editDirection.name" type="text" class="input" />
          </div>
          <div class="input">
            <label>Описание:</label>
            <textarea id="direction-description" v-model="editDirection.description" class="textarea"></textarea>
          </div>
        </div>
        <div class="modal-actions">
          <button @click="handleEdit" class="button button--primary">
            Сохранить
          </button>
          <button @click="closeModal" class="button button--secondary">
            Отмена
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
