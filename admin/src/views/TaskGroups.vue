<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useGroupsStore } from '../stores/taskGroups.js';

const groupsStore = useGroupsStore();
const route = useRoute();
const directionId = ref(route.params.directionId);
const newGroupName = ref('');
const newGroupDescription = ref('');

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
};

const handleDeleteGroup = async (groupId) => {
  await groupsStore.deleteGroup(groupId);
};
</script>

<template>
  <div>
    <div v-if="groupsStore.errorMessage" class="error-message">{{ groupsStore.errorMessage }}</div>
    <div v-if="groupsStore.successMessage" class="success-message">{{ groupsStore.successMessage }}</div>

    <ul v-if="groupsStore.groups.length > 0">
      <li v-for="group in groupsStore.groups" :key="group.id">
        {{ group.name }} - {{ group.description }}
        <button @click="handleDeleteGroup(group.id)">Удалить</button>
      </li>
    </ul>
    <div v-else>
      <p>No groups found for this direction.</p>
    </div>

    <input v-model="newGroupName" placeholder="Group name" />
    <input v-model="newGroupDescription" placeholder="Group description" />
    <button @click="handleAddGroup" :disabled="!newGroupName || !newGroupDescription">Добавить группу</button>
  </div>
</template>
