<script setup>
import {ref, watch} from 'vue';

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['save-task', 'cancel-edit']);

const editableTask = ref(JSON.parse(JSON.stringify(props.task)));

watch(
    () => props.task,
    (newTask) => {
      editableTask.value = JSON.parse(JSON.stringify(newTask));
    }
);

const saveTask = () => {
  if (validateTask(editableTask.value.task_data)) {
    emit('save-task', editableTask.value);
  } else {
    console.error('Validation Error: All fields are required.');
  }
};

const cancelEdit = () => {
  emit('cancel-edit');
};

const validateTask = (taskData) => {
  return (
      taskData.imageUrl &&
      taskData.text &&
      (taskData.answer === 'true' || taskData.answer === 'false')
  );
};
</script>

<template>
  <div>
    <h3>Edit Task</h3>
    <div class="input">
      <label for="image-url">Ссылка на изображение</label>
      <input
          id="image-url"
          type="text"
          v-model="editableTask.task_data.imageUrl"
          placeholder="Enter image URL"
          aria-required="true"
      />
    </div>
    <div class="input">
      <label for="task-text">Введите описание</label>
      <textarea
          id="task-text"
          v-model="editableTask.task_data.text"
          placeholder="Enter task text"
          aria-required="true"
      ></textarea>
    </div>
    <div class="input">
      <span>Выберите правильный ответ:</span>
      <label>
        <input
            type="radio"
            value="true"
            v-model="editableTask.task_data.answer"
            aria-checked="editableTask.task_data.answer === 'true'"
        />
        Yes
      </label>
      <label>
        <input
            type="radio"
            value="false"
            v-model="editableTask.task_data.answer"
            aria-checked="editableTask.task_data.answer === 'false'"
        />
        No
      </label>
    </div>
    <button @click="saveTask">Save</button>
    <button @click="cancelEdit">Cancel</button>
  </div>
</template>
