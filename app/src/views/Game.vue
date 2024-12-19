<script setup>
import {ref, onMounted, onUnmounted, reactive, computed} from 'vue';
import { useRoute } from 'vue-router';
import { useTasksStore } from '../stores/tasks';
import { useUserResultsStore } from '../stores/userResultStore';
import SvgIcon from "../components/SvgIcon.vue";

const tasksStore = useTasksStore();
const userResultsStore = useUserResultsStore();
const route = useRoute();
const taskGroupId = ref(route.params.taskGroupId);

// Состояние игры
const state = reactive({
  currentTaskIndex: 0,
  health: 3,
  timer: {
    play: false,
    value: 15
  },
  score: 0,
  interval: null,
});

onMounted(() => {
  tasksStore.fetchTasksByGroup(taskGroupId.value).catch((error) => {
    console.error('Failed to fetch tasks:', error);
  });

  startTimer();
});

onUnmounted(() => {
  clearInterval(state.interval);
});

// Запуск таймера
const startTimer = () => {
  clearInterval(state.interval);
  state.timer = 15;
  state.interval = setInterval(() =>    {
    if (state.timer > 0) {
      state.timer--;
    } else {
      handleWrongAnswer();
    }
  }, 1000);
};

const taskData = computed(() => tasksStore.tasks[state.currentTaskIndex].task_data);

// Обработка неверного ответа или истечения времени
const handleWrongAnswer = () => {
  state.health--;
  if (state.health <= 0) {
    // finishGame();
  } else {
    nextTask();
  }
};

// Обработка правильного ответа
const handleCorrectAnswer = () => {
  state.score++;
  nextTask();
};

const checkCorrectPickImages = (correct, itemAnswer) => {
  if (correct === itemAnswer) {
    handleCorrectAnswer();
  } else {
    handleWrongAnswer();
  }
}

// Переход к следующему заданию
const nextTask = () => {
  if (state.currentTaskIndex < tasksStore.tasks.length - 1) {
    state.currentTaskIndex++;
    startTimer();
  } else {
    // finishGame();
  }
};

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
  <div class="game" v-if="tasksStore.tasks.length">
    <div class="game__header">
      <div class="game__timer">
        <svg-icon name="timer" width="28" height="28"/>
        {{ state.timer }}
      </div>
      <div class="game__health">
        <svg-icon
            v-for="i in 3"
            :key="i"
            :name="i <= state.health ? 'health-fill' : 'health'"
            width="28" height="28"
        />
      </div>
    </div>
    <div class="game__item">
      <div class="game__item-card">
        <div class="game__counter">Задание <strong>{{state.currentTaskIndex + 1}}</strong> / {{tasksStore.tasks.length}}</div>
        <div class="game__question" v-if="tasksStore.tasks[state.currentTaskIndex].task_data.type === 'question-one'">
          {{ tasksStore.tasks[state.currentTaskIndex].task_data.text }}
        </div>
        <img
            v-if="tasksStore.tasks[state.currentTaskIndex].task_data.type === 'pick-images'"
            :src="tasksStore.tasks[state.currentTaskIndex].task_data.imageUrl"
            width="100%"
            alt="Task image"
            class="task-image"
        />
      </div>
      <div v-if="taskData.type === 'pick-images'" class="game__likes">
        <button class="game__like-button" @click="checkCorrectPickImages('true', taskData.answer)">
          <svg-icon name="like" width="50" height="50"/>
        </button>
        <button class="game__like-button game__like-button_dislike" @click="checkCorrectPickImages('false', taskData.answer)">
          <svg-icon name="dislike" width="50" height="50"/>
        </button>
      </div>
      <div class="game__answers" v-if="taskData.type === 'question-one'">
        <button class="game__answer" v-for="(answer, index) in taskData.answers">
          {{ answer.text }}
          <svg-icon name="correct" width="24" height="24"/>
          <svg-icon name="incorrect" width="24" height="24"/>
        </button>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Задания загружаются...</p>
  </div>
</template>

<style scoped lang="scss">
.game {
  display: flex;
  flex-direction: column;
  gap: 20px;
  &__counter {
    font-family: var(--font-secondary), sans-serif;
    font-size: 1.125rem;
    text-align: center;
    color: #6B38E3;
  }
  &__header {
    display: flex;
    justify-content: space-between;
    position: relative;
    z-index: 2;
    &:after {
      content: '';
      width: calc(100% + 32px);
      height: 310px;
      border-radius: 0 0 100px 100px;
      position: absolute;
      top: -32px;
      left: -16px;
      right: -16px;
      background-color: #6B38E3;
      z-index: -1;
    }
  }
  &__timer {
    width: 100px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 15px 7px 15px;
    border-radius: 20px;
    font-family: var(--font-primary), sans-serif;
    font-weight: 700;
    color: white;
    font-size: 1.125rem;
    background: rgb(247,92,3);
    background: linear-gradient(0deg, rgba(247,92,3,1) 0%, rgba(233,176,22,1) 100%);
  }
  &__health {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 12px 7px 12px;
    border-radius: 20px;
    background-color: #5738CF;
  }
  &__item {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    gap: 64px;
    position: relative;
    z-index: 2;

    &-card {
      display: flex;
      flex-direction: column;
      gap: 18px;
      width: 100%;
      min-height: 220px;
      padding: 25px;
      box-sizing: border-box;
      background-color: white;
      border-radius: 28px;
      box-shadow: 0 4px 4px 0 rgba(50, 9, 147, 0.1);
    }
  }
  &__likes {
    display: flex;
    justify-content: center;
    gap: 30px;
    padding: 0 30px;
  }
  &__like-button {
    width: 100%;
    height: 150px;
    background-color: #A6D92E;

    &_dislike {
      background-color: #C50354;
    }
  }
  &__question {
    text-align: center;
    font-family: var(--font-primary), sans-serif;
    font-weight: 700;
  }
  &__answers {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  &__answer {
    text-align: left;
    border: 2px solid #CFBEF6;
    background-color: white;
    color: #1E1E1E;

    &_correct {
      border-color: #A6D92E;
    }

    &_incorrect {
      border-color: #D90368;
    }
  }
}
</style>
