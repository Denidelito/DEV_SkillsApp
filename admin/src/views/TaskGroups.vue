<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useGroupsStore } from '../stores/taskGroups.js';
import GroupList from '../components/TaskGroupList.vue';

const groupsStore = useGroupsStore();
const route = useRoute();
const directionId = ref(route.params.directionId);
const newGroupName = ref('');
const newGroupDescription = ref('');
const isModalOpen = ref(false);

onMounted(async () => {
  await groupsStore.fetchGroupsByDirection(directionId.value);
});

const handleAddGroup = async () => {
  if (!newGroupName.value || !newGroupDescription.value) {
    groupsStore.errorMessage = 'Both name and description are required';
    return;
  }
  await groupsStore.addGroup(directionId.value, newGroupName.value, newGroupDescription.value);
  newGroupName.value = '';
  newGroupDescription.value = '';
  closeModal();
};

const handleDeleteGroup = async (groupId) => {
  await groupsStore.deleteGroup(groupId);
};

const handleUpdateGroup = async(groupId, name, description) => {
  await groupsStore.updateGroup(groupId, name, description)
}

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  newGroupName.value = '';
  newGroupDescription.value = '';
};
</script>

<template>
  <div class="group-container">
    <div>
      <button class="button" @click="openModal">Добавить набор заданий</button>
    </div>

    <div v-if="isModalOpen" class="modal-overlay">
      <div class="modal">
        <form @submit.prevent="handleAddGroup" class="form">
          <div class="input">
            <label for="group-name">Название группы:</label>
            <input id="group-name" v-model="newGroupName" type="text" required />
          </div>

          <div class="input">
            <label for="group-description">Описание группы:</label>
            <textarea id="group-description" v-model="newGroupDescription" required></textarea>
          </div>

          <button type="submit" class="button">Добавить</button>
          <button class="button button--secondary" type="button" @click="closeModal">Отмена</button>
        </form>
      </div>
    </div>

    <GroupList
        :directionId="directionId"
        :groups="groupsStore.groups"
        :onDeleteGroup="handleDeleteGroup"
        :onUpdateGroup="handleUpdateGroup"
    />
  </div>
</template>

<style lang="scss" scoped>
  .group-container {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
</style>