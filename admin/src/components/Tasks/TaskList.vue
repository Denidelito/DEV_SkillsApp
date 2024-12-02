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
  <div v-for="(task, index) in tasks" :key="task.id">
    <p>
      Вопрос {{ index + 1 }}
      <button @click="deleteTask(task.id)">Delete</button>
      <button @click="startEditingTask(task)">Edit</button>
    </p>
    <hr>
    <div>
      <img width="200" :src="task.task_data.imageUrl" alt="">
      <p>{{task.task_data.text}}</p>
      <p>{{task.task_data.answer === 'true' ? 'Верный' : 'Неверный' }}</p>
    </div>
  </div>
</template>