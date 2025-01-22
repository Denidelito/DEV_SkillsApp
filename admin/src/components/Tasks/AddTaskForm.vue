<script setup>
import { ref, watch } from 'vue';
import { useTasksStore } from '../../stores/tasks';

const props = defineProps({
  taskGroupId: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['task-added']);
const tasksStore = useTasksStore();

// Тип задачи
const taskType = ref('pick-images');

// Объект данных для новой задачи
const newTaskData = ref({
  type: taskType.value,
  imageUrl: '',
  text: '',
  answers: [],
  feedback: '',
});

// Синхронизация типа задачи с newTaskData.type
watch(taskType, (newType) => {
  newTaskData.value.type = newType;
});

// Функция для добавления задачи
const addTask = () => {
  if (newTaskData.value) {
    tasksStore
        .addTask(props.taskGroupId, newTaskData.value, 1)
        .then(() => {
          emit('task-added');
          newTaskData.value = {
            type: taskType.value,
            imageUrl: '',
            text: '',
            answers: [],
            feedback: '',
          };
        })
        .catch((error) => {
          console.error('Error adding task:', error);
        });
  }
};

// Добавление нового ответа
const addAnswer = () => {
  newTaskData.value.answers.push({text: '', isCorrect: false});
};

// Установка правильного ответа
const setCorrectAnswer = (index) => {
  newTaskData.value.answers.forEach((answer, i) => {
    answer.isCorrect = i === index;
  });
};
</script>

<template>
  <div>
    <!-- Селект для выбора типа задачи -->
    <div class="input">
      <label for="task-type">Выберите тип задачи:</label>
      <select id="task-type" v-model="taskType">
        <option value="pick-images">Выбор изображения</option>
        <option value="question-one">Тестовый выпрос</option>
      </select>
    </div>

    <!-- Форма для типа pick-images -->
    <div v-if="taskType === 'pick-images'">
      <div class="input">
        <label for="image-url">Ссылка на изображение</label>
        <input
            type="text"
            id="image-url"
            v-model="newTaskData.imageUrl"
            placeholder="url"
        />
      </div>
      <div class="input">
        <label for="question-text">Введите вопрос</label>
        <textarea
            id="question-text"
            v-model="newTaskData.text"
        ></textarea>
      </div>
      <!-- Общее поле обратной связи -->
      <div class="input">
        <label for="feedback">Введите обратную связь (опционально)</label>
        <textarea
            id="feedback"
            v-model="newTaskData.feedback"
        ></textarea>
      </div>
      <div class="input">
        <label>Проходит ли модерацию?</label>
        <div class="radio-group">
          <label>
            <input type="radio" :value="true" v-model="newTaskData.answer"/>
            Да
          </label>
          <label>
            <input type="radio" :value="false" v-model="newTaskData.answer"/>
            Нет
          </label>
        </div>
      </div>
    </div>

    <!-- Форма для типа question-one -->
    <div v-if="taskType === 'question-one'">
      <div class="input">
        <label for="image-url">Ссылка на изображение</label>
        <input
            type="text"
            id="image-url"
            v-model="newTaskData.imageUrl"
            placeholder="url"
        />
      </div>
      <div class="input">
        <label for="question-text">Введите вопрос</label>
        <textarea
            id="question-text"
            v-model="newTaskData.text"
        ></textarea>
      </div>
      <!-- Общее поле обратной связи -->
      <div class="input">
        <label for="feedback">Введите обратную связь (опционально)</label>
        <textarea
            id="feedback"
            v-model="newTaskData.feedback"
        ></textarea>
      </div>
      <div v-for="(answer, index) in newTaskData.answers" :key="index" class="input">
        <div class="input">
          <label>Ответ {{ index + 1 }}</label>
          <input
              type="text"
              v-model="answer.text"
          />
        </div>
        <div class="input">
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

        </div>
      </div>
      <button class="button button--small button--info" @click="addAnswer">Добавить ответ</button>
    </div>

    <div class="form-nav">
      <button class="button" @click="addTask">Добавить задание</button>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.form-nav {
  padding-top: 10px;
}
</style>