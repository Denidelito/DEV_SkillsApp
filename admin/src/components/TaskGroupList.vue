<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps({
  groups: Array,
  errorMessage: String,
  successMessage: String,
  onDeleteGroup: Function
});

const showModal = ref(false);
const groupIdToDelete = ref(null);

const openModal = (groupId) => {
  groupIdToDelete.value = groupId;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  groupIdToDelete.value = null;
};

const handleDelete = () => {
  if (groupIdToDelete.value !== null) {
    props.onDeleteGroup(groupIdToDelete.value);
    closeModal();
  }
};
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
          <button @click="openModal(group.id)" class="button button--small button--danger">Удалить</button>
          <button @click="openModal(group.id)" class="button button--small">Редактировать</button>
        </td>
      </tr>
      </tbody>
    </table>

    <div v-else>
      <p>No groups found for this direction.</p>
    </div>

    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <h3>Подтвердите удаление</h3>
        <p>Вы уверены, что хотите удалить эту группу?</p>
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
