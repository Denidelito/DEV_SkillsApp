<script setup>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useGroupsStore } from '../stores/taskGroups.js';
import SvgIcon from "../components/SvgIcon.vue";
import AppHeaderSecondary from "../components/AppHeaderSecondary.vue";
import AppNav from "../components/AppNav.vue";

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
  <div class="container">
    <app-header-secondary/>
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
    <app-nav/>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
}

.gameGroup {
  &-tabs {
    height: 100vh;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 0 16px;
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
    border-radius: 10px;
    text-decoration: none;
    border: 2px solid var(--color-primary);
    overflow: hidden;

    &__text {
      display: flex;
      align-items: center;
      width: 100%;
      padding: 20px;
      font-family: var(--font-secondary), sans-serif;
      font-size: 18px;
      font-weight: 800;
      color: var(--color-primary);
    }

    &__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
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
