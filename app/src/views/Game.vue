<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useTasksStore } from '../stores/tasks';
import { useUserResultsStore } from '../stores/userResultStore';

const tasksStore = useTasksStore();
const userResultsStore = useUserResultsStore();
const route = useRoute();
const taskGroupId = ref(route.params.taskGroupId);

onMounted(() => {
  tasksStore.fetchTasksByGroup(taskGroupId.value).catch((error) => {
    console.error('Failed to fetch tasks:', error);
  });
});


const sendResult = async () => {
  try {
    const userId = JSON.parse(localStorage.getItem('user')).userId;
    const score = 100;
    await userResultsStore.addUserResult(userId, taskGroupId.value, score);
    alert('Результат отправлен успешно!');
  } catch (error) {
    console.error('Failed to send result:', error);
  }
};
</script>

<template>
  <div>
    <div>{{ tasksStore.tasks }}</div>
    <button @click="sendResult">Отправить результат</button>
  </div>
</template>

<style scoped lang="scss">
</style>
