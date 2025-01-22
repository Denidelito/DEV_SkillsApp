<script setup>
import { ref, watch } from 'vue';

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
  <div class="task" v-for="(task, index) in tasks" :key="task.id">
    <div class="task__header">
      <div>
        <strong>Вопрос {{ index + 1 }} : {{task.task_data.type === 'pick-images' ? 'Модерация изображения' : 'Выбор ответа'}}</strong>
      </div>
      <div>
        <button class="button button--small button--secondary" @click="startEditingTask(task)">Редактировать</button>
        <button class="button button--small button--danger" @click="deleteTask(task.id)">Удалить</button>
      </div>
    </div>
    <hr>
    <div v-if="task.task_data.type === 'pick-images'">
      <img width="200" :src="task.task_data.imageUrl" alt="">
      <p v-if="task.task_data.text"> <strong>Вопрос:</strong> {{task.task_data.text}}</p>
      <p><strong>Обратная связь:</strong> {{task.task_data.feedback}}</p>
      <p><strong>Проходит модерацию: </strong>{{task.task_data.answer === 'true' ? 'Да' : 'Нет' }}</p>
    </div>
    <div v-else>
      <img :if="task.task_data.imageUrl" width="200" :src="task.task_data.imageUrl" alt="">
      <p><strong>Вопрос:</strong> {{task.task_data.text}}</p>
      <p><strong>Обратная связь:</strong> {{task.task_data.feedback}}</p>
      <p><strong>Ответы:</strong></p>
      <ul>
        <li v-for="answer in task.task_data.answers">
          <p><strong>Текст:</strong> {{answer.text}}</p>
          <p><strong>Верность:</strong> {{answer.isCorrect ? 'Верный' : 'Неверный'}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .task {
    &__header {
      display: flex;
      justify-content: space-between;
    }
  }
</style>