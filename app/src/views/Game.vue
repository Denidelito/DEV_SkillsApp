<script setup>
import { ref, onMounted, onUnmounted, reactive, computed } from 'vue';
import {useRoute, useRouter} from 'vue-router';
import { useTasksStore } from '../stores/tasks';
import { useUserResultsStore } from '../stores/userResultStore';
import SvgIcon from "../components/SvgIcon.vue";

const tasksStore = useTasksStore();
const userResultsStore = useUserResultsStore();
const route = useRoute();
const router = useRouter();
const taskGroupId = ref(route.params.taskGroupId);

// Состояние игры
const state = reactive({
  currentTaskIndex: 0,
  health: 3,
  timer: 15,
  score: 0,
  interval: null,
  feedback: false,
  isChecked: false
});

// Запуск таймера
const startTimer = () => {
  clearInterval(state.interval);
  state.timer = 20;
  state.interval = setInterval(() => {
    if (state.timer > 0 && !state.feedback) {
      state.timer--;
    } else {
      handleWrongAnswer();
      clearInterval(state.interval);
    }
  }, 1000);
};

// Завершение игры
const finishGame = () => {
  clearInterval(state.interval);

  // Отправка результата (если необходимо)
  sendResult();

  // Редирект на экран GameOver с передачей результата
  router.push({
    name: 'GameOver',
    query: { score: state.score, taskGroupId: taskGroupId.value }
  });
};


// Обработка неверного ответа или истечения времени
const handleWrongAnswer = () => {
  state.health--;
  state.feedback = true;
  clearInterval(state.interval);
  if (state.health <= 0) {
    finishGame();
  }
};

// Обработка правильного ответа
const handleCorrectAnswer = () => {
  state.score++;
  state.feedback = true;
  clearInterval(state.interval);
};

const checkCorrectPickImages = (correct, itemAnswer) => {
  console.log(correct, itemAnswer)

  if (correct === String(itemAnswer)) {
    handleCorrectAnswer();
  } else {
    handleWrongAnswer();
  }
};

const checkCorrectAnswer = (itemAnswer) => {
  state.isChecked = true;

  if (itemAnswer.isCorrect) {
    setTimeout(() => handleCorrectAnswer(), 1000);
  } else {
    setTimeout(() => handleWrongAnswer(), 1000);
  }
};

// Переход к следующему заданию
const nextTask = () => {
  state.isChecked = false;

  if (state.currentTaskIndex < tasksStore.tasks.length - 1) {
    state.currentTaskIndex++;
    state.feedback = false;
    startTimer();
  } else {
    finishGame();
  }
};

const sendResult = async () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.userId) {
      throw new Error('Пользователь не найден');
    }

    const userId = user.userId;
    await userResultsStore.addUserResult(userId, taskGroupId.value, state.score);
  } catch (error) {
    alert('Не удалось отправить результат. Попробуйте позже.');
  }
};

const taskData = computed(() => {
  const task = tasksStore.tasks[state.currentTaskIndex];
  return task ? task.task_data : {};
});

const randomFeedback = () => {
  const phrases = [
    "Иногда путь к успеху идёт через попытки — продолжаем!",
    "Главное — не останавливаться, ты уже на шаг ближе!",
    "Ошибки — это просто тренировочные шаги к победе!",
    "Каждый ответ — это опыт, а опыт бесценен!",
    "Не сдавайся, твои усилия точно приведут к результату!",
    "Дорогу осилит идущий — вперёд к новым вершинам!",
    "Сегодня учимся, завтра побеждаем!",
    "Здорово, что ты не боишься пробовать!",
    "Каждая попытка делает тебя сильнее!",
    "В следующий раз точно будет лучше, ты молодец!",
    "Чем больше вопросов — тем больше знаний, так держать!",
    "Сложности только добавляют азарт, не так ли?",
    "Это был смелый выбор — попробуй снова!",
    "Все чемпионы начинали с того, чтобы не сдаваться!",
    "Ты точно на правильном пути, главное — не останавливайся!",
    "Иногда шаг назад — это трамплин для большого прыжка!",
    "Отличный настрой, с таким не пропадёшь!",
    "Не все ответы бывают лёгкими, но ты точно справишься!",
    "Любопытство — твой главный союзник, продолжай исследовать!",
    "Твоё упорство — залог успеха, продолжай двигаться вперёд!"
  ];

  const randomIndex = Math.floor(Math.random() * phrases.length);
  return phrases[randomIndex];
}

onMounted(() => {
  tasksStore.fetchTasksByGroup(taskGroupId.value).catch((error) => {
    console.error('Failed to fetch tasks:', error);
  });

  startTimer();
});

onUnmounted(() => {
  clearInterval(state.interval);
});
</script>

<template>
  <div class="game" v-if="tasksStore.tasks.length">
    <div class="game__header">
      <div class="game__timer">
        <svg-icon name="timer" width="28" height="28" />
        {{ state.timer }}
      </div>
      <div class="game__health">
        <svg-icon
            v-for="i in 3"
            :key="i"
            :name="i <= state.health ? 'health-fill' : 'health'"
            width="28"
            height="28"
        />
      </div>
    </div>
    <div class="game__item">
      <div v-if="!state.feedback" class="game__item-card">
        <div class="game__counter">
          Задание <strong>{{ state.currentTaskIndex + 1 }}</strong> / {{ tasksStore.tasks.length }}
        </div>
        <div class="game__question">
          <img
              v-if="taskData.imageUrl"
              :src="taskData.imageUrl"
              width="100%"
              alt="Task image"
              class="task-image"
          />
          <div v-if="taskData.text">{{ taskData.text }}</div>
        </div>
      </div>
      <div v-else class="game__item-card">
        <div class="game__feedback">
          <picture>
            <img
                width="108"
                height="107"
                src="../assets/images/character-feedback.png"
                alt="Говорящая выдра"
            />
          </picture>
          <div class="game__feedback-text">
            {{ taskData.feedback || randomFeedback() }}
          </div>
        </div>
      </div>
      <div
          v-if="taskData.type === 'pick-images' && !state.feedback"
          class="game__likes"
      >
        <button
            class="game__like-button"
            @click="checkCorrectPickImages('true', taskData.answer)"
        >
          <svg-icon name="like" width="50" height="50" />
        </button>
        <button
            class="game__like-button game__like-button_dislike"
            @click="checkCorrectPickImages('false', taskData.answer)"
        >
          <svg-icon name="dislike" width="50" height="50" />
        </button>
      </div>
      <div
          v-if="taskData.type === 'question-one' && !state.feedback"
          class="game__answers"
      >
        <button
            class="game__answer"
            v-for="(answer, index) in taskData.answers"
            :key="index"
            @click="checkCorrectAnswer(answer)"
        >
          {{ answer.text }}
          <svg-icon v-if="answer.isCorrect && state.isChecked" name="correct" width="24" height="24" />
          <svg-icon v-if="!answer.isCorrect && state.isChecked" name="incorrect" width="24" height="24" />
        </button>
      </div>
      <div v-if="state.feedback">
        <button class="button" @click="nextTask">Продолжить</button>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Задания загружаются...</p>
  </div>
</template>

<style scoped lang="scss">
.button {
  width: 100%;
}
.task {
  &-image {
    border-radius: 10px;
    overflow: hidden;
  }
}
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
    padding: 32px 16px;
    /*&:after {
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
    }*/
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
    //background: linear-gradient(0deg, rgba(247,92,3,1) 0%, rgba(233,176,22,1) 100%);
  }
  &__health {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 12px 7px 12px;
    border-radius: 20px;
    background-color: #EEE9FF;
  }
  &__item {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    gap: 30px;
    position: relative;
    z-index: 2;
    padding: 0 16px 30px 16px;

    &-card {
      display: flex;
      flex-direction: column;
      gap: 20px;
      width: 100%;
      min-height: 220px;
      padding: 20px 15px;
      box-sizing: border-box;
      background-color: white;
      border-radius: 10px;
      box-shadow: 5px 5px 15px 0 rgba(50, 9, 147, 0.1);
    }
  }
  &__likes {
    display: flex;
    justify-content: center;
    gap: 30px;
  }
  &__like-button {
    width: 100%;
    height: 150px;
    border-radius: 10px;
    background-color: #A6D92E;

    &_dislike {
      background-color: #C50354;
    }
  }
  &__question {
    display: flex;
    flex-direction: column;
    gap: 20px;
    font-size: 18px;
    font-family: var(--font-secondary), sans-serif;
    font-weight: 600;
  }
  &__answers {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  &__answer {
    min-height: 57px;
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: space-between;
    text-align: left;
    border: 2px solid #CFBEF6;
    border-radius: 10px;
    padding: 15px 19px;
    background-color: white;
    font-family: var(--font-secondary), sans-serif;
    font-weight: 600;
    font-size: 18px;
    color: #1E1E1E;

    &_correct {
      border-color: #A6D92E;
    }

    &_incorrect {
      border-color: #D90368;
    }
  }
  &__feedback {
    display: flex;
    flex-direction: column;
    gap: 18px;
    text-align: center;

    &-text {
      text-align: left;
      font-family: var(--font-secondary), sans-serif;
      font-weight: 600;
      font-size: 18px;
    }
  }
}
</style>
