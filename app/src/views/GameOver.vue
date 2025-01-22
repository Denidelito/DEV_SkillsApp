<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import SvgIcon from "../components/SvgIcon.vue";
import AppNav from "../components/AppNav.vue";

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
  <div class="container">
    <div class="game-over">
      <div class="game-over__result">
        <div class="game-over__result-round">
          <div class="game-over__result-title">Результат</div>
          <div class="game-over__result-score">{{ score }}</div>
        </div>
        <div class="game-over__stats">
          <div class="game-over__stats-text">Лучший результат: -</div>
          <div class="game-over__stats-text">Дней подряд: -</div>
        </div>
        <div class="game-over__nav">
          <router-link class="button" :to="`/app/directions/${directionId}/groups/${taskGroupId}`">Повторить</router-link>
        </div>
      </div>
    </div>
    <app-nav/>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
}
.game-over {
  padding: 32px 16px;
  &__result {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
    position: relative;
    &-round {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      width: 210px;
      height: 210px;
      padding: 25px;
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
    width: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    gap: 20px;
    padding: 30px 20px;
    border-radius: 10px;
    box-shadow: 5px 5px 15px 0 rgba(50, 9, 147, 0.1);
    background-color: white;
    margin-top: -80px;
    z-index: 3;

    &-text {
      font-size: 20px;
      font-family: var(--font-secondary), sans-serif;
    }
  }
  &__nav {
    width: 100%;
    box-sizing: border-box;
    & > a {
      width: 100%;
      display: block;
      box-sizing: border-box;
    }
  }
}
</style>
