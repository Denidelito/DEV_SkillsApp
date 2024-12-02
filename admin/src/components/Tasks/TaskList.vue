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
      <hr>
      <div>
        <img :src="task.task_data.imageUrl" alt="">
        <p>{{task.task_data.text}}</p>
        <p>{{task.task_data.answer ? 'Верный' : 'Неверный' }}</p>
      </div>
      <button @click="deleteTask(task.id)">Delete</button>
      <button @click="startEditingTask(task)">Edit</button>
    </li>
  </ul>
</template>