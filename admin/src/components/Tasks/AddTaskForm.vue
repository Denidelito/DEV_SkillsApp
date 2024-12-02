<script setup>
import { ref } from 'vue';
import { useTasksStore } from '../../stores/tasks';

const props = defineProps({
  taskGroupId: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['task-added']);
const tasksStore = useTasksStore();
const newTaskData = ref({
  type: 'images',
  imageUrl: '',
  text: '',
  answer: '',
});

const addTask = () => {
  if (newTaskData.value) {
    tasksStore.addTask(props.taskGroupId, newTaskData.value, 1)
        .then((response) => {
          emit('task-added')
          newTaskData.value = { type: 'images', imageUrl: '', text: '', answer: '' };
        })
        .catch((error) => {
          console.error('Error adding task:', error);
        });
  }
};
</script>

<template>
  <div>
    <div class="input">
      <label for="">Ссылка на изображение</label>
      <input
          type="text"
          v-model="newTaskData.imageUrl"
          placeholder="Enter image URL"
      />
    </div>
    <div class="input">
      <label for="">Введите описание</label>
      <textarea
          v-model="newTaskData.text"
          placeholder="Enter task text"
      ></textarea>
    </div>
    <div class="input">
      <label>
        <input
            type="radio"
            value="true"
            v-model="newTaskData.answer"
        />
        Yes
      </label>
      <label>
        <input
            type="radio"
            value="false"
            v-model="newTaskData.answer"
        />
        No
      </label>
    </div>
    <button @click="addTask">Add Task</button>
    <slot></slot>
  </div>
</template>
