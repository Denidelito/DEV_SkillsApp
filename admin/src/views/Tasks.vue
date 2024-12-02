<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useTasksStore } from '../stores/tasks';

const tasksStore = useTasksStore();
const tasks = ref([]);
const route = useRoute();
const taskGroupId = ref(route.params.taskGroupId);
const newTaskData = ref('');

onMounted(() => {
  tasksStore.fetchTasksByGroup(taskGroupId.value)
      .then(() => {
        tasks.value = tasksStore.tasks;
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
});

const addTask = () => {
  if (newTaskData.value.trim()) {
    tasksStore.addTask(taskGroupId.value, newTaskData.value, 1)
        .then((response) => {
          tasks.value.push({
            id: response.taskId,
            task_data: newTaskData.value
          });
          newTaskData.value = '';
        })
        .catch((error) => {
          console.error('Error adding task:', error);
        });
  }
};
</script>

<template>
  <div>
    <h2>Tasks List for Group {{ taskGroupId }}</h2>

    <div>
      <input
          type="text"
          v-model="newTaskData"
          placeholder="Enter task data"
      />
      <button @click="addTask">Add Task</button>
    </div>

    <ul>
      <li v-for="task in tasks" :key="task.id">
        <p>Вопрос {{ task.id }}</p>
        <p>Task Data: {{ task.task_data }}</p>
      </li>
    </ul>
  </div>
</template>
