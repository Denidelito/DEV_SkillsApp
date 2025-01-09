<script setup>
import { ref } from 'vue';
import ActionConfirm from "./forms/ActionConfirm.vue";

const props = defineProps({
  directionId: String,
  groups: Array,
  onDeleteGroup: Function,
  onUpdateGroup: Function
});

const showModal = ref(false);
const groupIdToDelete = ref(null);
const showEditModal = ref(false);
const groupToEdit = ref({ id: null, name: '', description: '' });

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

const openEditModal = (group) => {
  groupToEdit.value = {...group};
  showEditModal.value = true;
};

const closeEditModal = () => {
  showEditModal.value = false;
  groupToEdit.value = {id: null, name: '', description: ''};
};

const handleUpdate = () => {
  if (groupToEdit.value.id && groupToEdit.value.name && groupToEdit.value.description) {
    props.onUpdateGroup(groupToEdit.value.id, groupToEdit.value.name, groupToEdit.value.description);
    closeEditModal();
  }
};
</script>

<template>
  <div>
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
        <td><router-link :to="`/admin/directions/${directionId}/groups/${group.id}`">{{ group.name }}</router-link></td>
        <td>{{ group.description }}</td>
        <td>
          <button @click="openModal(group.id)" class="button button--small button--danger">Удалить</button>
          <button @click="openEditModal(group)" class="button button--small">Редактировать</button>
        </td>
      </tr>
      </tbody>
    </table>

    <div v-else>
      <p>No groups found for this direction.</p>
    </div>

    <!-- Delete Modal -->
    <ActionConfirm v-if="showModal"
        title="Подтвердите удаление"
        text="Вы уверены, что хотите удалить эту группу?"
        :action-cancel="closeModal"
        :action-accept="handleDelete"/>

    <div v-if="showEditModal" class="modal-overlay">
      <div class="modal">
        <h3>Редактировать группу</h3>
        <form @submit.prevent="handleUpdate">
          <div class="form-group">
            <label for="groupName">Название</label>
            <input id="groupName" v-model="groupToEdit.name" type="text" required/>
          </div>
          <div class="form-group">
            <label for="groupDescription">Описание</label>
            <textarea id="groupDescription" v-model="groupToEdit.description" required></textarea>
          </div>
          <div class="modal-actions">
            <button type="submit" class="button button--primary">Сохранить</button>
            <button @click="closeEditModal" type="button" class="button button--secondary">Отмена</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
