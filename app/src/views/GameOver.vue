<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import SvgIcon from "../components/SvgIcon.vue";

const route = useRoute();
const router = useRouter();
const score = ref(route.query.score || 0);
const taskGroupId = ref(route.params.taskGroupId);
const directionId = ref(route.params.directionId);

const goToLeaderboard = () => {
  alert('В разработке')
};

const goToHome = () => {
  router.push({ name: 'Home' });
};
</script>

<template>
  <div class="game-over">
    <div class="game-over__result">
      <div class="game-over__result-round">
        <div class="game-over__result-title">Результат</div>
        <div class="game-over__result-score">{{ score }}</div>
      </div>
      <div class="game-over__stats">
        <div>Лучший результат: -</div>
        <div>Дней подряд: -</div>
      </div>
    </div>
    <nav>
      <router-link class="button" :to="`/app/directions/${directionId}/groups/${taskGroupId}`">Заново</router-link>
      <button class="button" @click="goToLeaderboard">Таблица лидеров</button>
      <router-link class="button" to="/app/">На главную</router-link>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.game-over {
  &__result {
    display: flex;
    justify-content: center;
    margin: -32px -16px 0 -16px;
    padding: 60px 0 50px;
    border-radius: 0 0 100px 100px;
    background-color: var(--color-primary);
    position: relative;
    &-round {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      width: 210px;
      height: 210px;
      text-align: center;
      color: var(--color-primary);
      position: relative;
      z-index: 2;

      &:before {
        content: '';
        width: 210px;
        height: 210px;
        border-radius: 50%;
        background-color: white;
        position: absolute;
        z-index: -1;
      }
      &:after {
        content: '';
        width: 260px;
        height: 260px;
        border-radius: 50%;
        position: absolute;
        z-index: -2;
        top: -25px;
        left: -25px;
        background-color: var(--color-disable);
      }
    }
    &-title {
      font-size: 1.5rem;
    }
    &-score {
      font-family: var(--font-primary), sans-serif;
      font-weight: 700;
      font-size: 3.438rem;
    }
  }
  &__stats {
    width: calc(100% - 96px);
    display: flex;
    flex-direction: column;
    gap: 20px;
    font-size: 1.125rem;
    color: #6B38E3;
    padding: 35px 35px;
    border-radius: 28px;
    box-shadow: 0 4px 4px 0 rgba(50, 9, 147, 0.1);
    background-color: white;
    position: absolute;
    z-index: 3;
    bottom: -52px;
  }
}
nav {
  min-height: calc(100vh - 440px);
  padding: 60px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
}
</style>
