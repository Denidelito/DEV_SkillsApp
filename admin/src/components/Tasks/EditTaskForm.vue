<script setup>
import { ref, watch } from 'vue';

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
  emit('save-task', editableTask.value);
};

const cancelEdit = () => {
  emit('cancel-edit');
};

const addAnswer = () => {
  editableTask.value.task_data.answers.push({ text: '', isCorrect: false });
};

const removeAnswer = (index) => {
  // Удаление ответа
  editableTask.value.task_data.answers.splice(index, 1);
};

const setCorrectAnswer = (index) => {
  editableTask.value.task_data.answers.forEach((answer, i) => {
    answer.isCorrect = i === index;
  });
};
</script>

<template>
  <div>
<!--    <div class="input">
      <label for="task-type">Выберите тип задачи:</label>
      <select id="task-type" v-model="editableTask.type">
        <option value="pick-images">Pick Images</option>
        <option value="question-one">Question One</option>
      </select>
    </div>-->

    <div v-if="props.task.task_data.type === 'pick-images'">
      <div class="input">
        <label for="feedback">Обратная связь</label>
        <input
            id="feedback"
            type="text"
            v-model="editableTask.task_data.feedback"
            placeholder="Enter feedback"
        />
      </div>
      <div class="input">
        <label for="image-url">Ссылка на изображение</label>
        <input
            id="image-url"
            type="text"
            v-model="editableTask.task_data.imageUrl"
            placeholder="Enter image URL"
        />
      </div>
      <div class="input">
        <label>Выберите правильный ответ:</label>
        <div class="radio-group">
          <label>
            <input
                type="radio"
                value="true"
                v-model="editableTask.task_data.answer"
            />
            Да
          </label>
          <label>
            <input
                type="radio"
                value="false"
                v-model="editableTask.task_data.answer"
            />
            Нет
          </label>
        </div>
      </div>
    </div>

    <div v-if="props.task.task_data.type === 'question-one'">
      <div class="input">
        <label for="task-text">Введите описание</label>
        <textarea
            id="task-text"
            v-model="editableTask.task_data.text"
            placeholder="Enter task text"
        ></textarea>
      </div>
      <div class="input">
        <label for="feedback">Обратная связь</label>
        <input
            id="feedback"
            type="text"
            v-model="editableTask.task_data.feedback"
            placeholder="Enter feedback"
        />
      </div>
      <div v-for="(answer, index) in editableTask.task_data.answers" :key="index" class="input">
        <label>Ответ {{ index + 1 }}</label>
        <input
            type="text"
            v-model="answer.text"
            placeholder="Введите текст ответа"
        />
        <div class="radio-group">
          <label>
            <input
                type="radio"
                name="correct-answer"
                :checked="answer.isCorrect"
                @change="setCorrectAnswer(index)"
            />
            Верный
          </label>
        </div>
        <button @click="removeAnswer(index)">Удалить</button>
      </div>
      <button class="button button--small button--info" @click="addAnswer">Добавить ответ</button>
    </div>

    <button class="button" @click="saveTask">Применить</button>
    <button class="button button--danger" @click="cancelEdit">Отменить</button>
  </div>
</template>
