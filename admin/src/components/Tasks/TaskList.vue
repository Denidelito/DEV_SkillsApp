<script setup>
const props = defineProps({
  tasks: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['delete-task', 'start-editing-task']);

const deleteTask = (taskId) => {
  emit('delete-task', taskId);
};

const startEditingTask = (task) => {
  emit('start-editing-task', task);
};
</script>

<template>
  <ul>
    <li v-for="task in tasks" :key="task.id">
      <p>Вопрос {{ task.id }}</p>
      <p>Task Data: {{ task.task_data }}</p>
      <button @click="deleteTask(task.id)">Delete</button>
      <button @click="startEditingTask(task)">Edit</button>
    </li>
  </ul>
</template>