<script setup>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useGroupsStore } from '../stores/taskGroups.js';
import SvgIcon from "../components/SvgIcon.vue";

const route = useRoute();
const groupStore = useGroupsStore();

const directionId = computed(() => route.params.directionId);

onMounted(() => {
  groupStore.fetchGroupsByDirection(directionId.value).catch((error) => {
    console.error('Failed to fetch groups:', error);
  });
});
</script>

<template>
  <div>
    <header>
      <router-link to="/">
        <svg-icon name="arrow-back" width="45" height="45"/>
      </router-link>
      <svg-icon name="stats" width="45" height="45"/>
    </header>
    <h3>Квесты</h3>
    <hr>
    <div class="gameGroup-tabs">
      <div class="gameGroup-tab" v-for="group in groupStore.groups" :key="group.id">
        <router-link class="gameGroup-link" :to="`/app/directions/${directionId}/groups/${group.id}`">
          <span class="gameGroup-link__text">{{ group.name }}</span>
          <span class="gameGroup-link__icon">
            <svg-icon name="play"/>
          </span>
        </router-link>
      </div>
    </div>

    <router-view />
  </div>
</template>

<style scoped lang="scss">
.gameGroup {
  &-tabs {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-top: 30px;
  }

  &-tab {
    &:nth-child(3n + 1) {
      .gameGroup-link {
        border-color: #6B38E3;
      }
      .gameGroup-link__text {
        color: #6B38E3;
      }
      .gameGroup-link__icon {
        background-color: #6B38E3;
      }
    }

    &:nth-child(3n + 2) {
      .gameGroup-link {
        border-color: #F75C03;
      }
      .gameGroup-link__text {
        color: #F75C03;
      }
      .gameGroup-link__icon {
        background-color: #F75C03;
      }
    }

    &:nth-child(3n + 3) {
      .gameGroup-link {
        border-color: #D90368;
      }
      .gameGroup-link__text {
        color: #D90368;
      }
      .gameGroup-link__icon {
        background-color: #D90368;
      }
    }
  }

  &-link {
    display: flex;
    gap: 20px;
    border-radius: 20px;
    text-decoration: none;
    border: 2px solid var(--color-primary);

    &__text {
      display: flex;
      align-items: center;
      width: 100%;
      padding: 15px;
      font-family: var(--font-primary), sans-serif;
      font-weight: 400;
      color: var(--color-primary);
    }

    &__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      border-radius: 0 15px 15px 0;
      padding: 10px;
      background-color: var(--color-primary);
      line-height: 0;

      svg {
        position: relative;
        z-index: 2;
        padding: 15px;
        fill: white;
      }
    }
  }

}
</style>
