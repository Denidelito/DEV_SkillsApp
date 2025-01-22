<script setup>
import { onMounted } from 'vue';
import { useDirectionsStore } from '../stores/directions';
import SvgIcon from "../components/SvgIcon.vue";
import AppNav from "../components/AppNav.vue";
import AppHeader from "../components/AppHeader.vue";

const directionsStore = useDirectionsStore();

onMounted(() => {
  directionsStore.fetchDirections().catch((error) => {
    console.error('Failed to fetch directions:', error);
  });
});
</script>

<template>
  <div class="container">
    <app-header/>
    <div class="direction-tabs">
      <router-link class="direction-link direction-link_green" to="/app/directions/6/groups">
        <span class="direction-link__icon">
            <svg-icon width="30" height="30" name="food"/>
        </span>
        <span class="direction-link__text">Ресторанный контент</span>
      </router-link>
      <router-link class="direction-link" to="/app/directions/5/groups">
        <span class="direction-link__icon">
            <svg-icon width="30" height="30" name="store"/>
        </span>
        <span class="direction-link__text">Ритейл</span>
      </router-link>
      <router-link class="direction-link direction-link_orange" to="/app/directions/7/groups">
        <span class="direction-link__icon">
            <svg-icon width="30" height="30" name="camera"/>
        </span>
        <span class="direction-link__text">Ретушь</span>
      </router-link>
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
.direction {
  &-tabs {
    height: 100vh;
    padding: 0 16px;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &-link {
    display: flex;
    align-items: center;
    overflow: hidden;
    gap: 20px;
    border-radius: 10px;
    text-decoration: none;
    border: 2px solid var(--color-primary);

    &__text {
      font-family: var(--font-secondary), sans-serif;
      font-size: 18px;
      font-weight: 800;
      color: var(--color-secondary);
    }

    &__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      padding: 10px;
      background-color: var(--color-primary);
      line-height: 0;

      &:after {
        content: '';
        position: absolute;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-color: #5738CF;
      }
      svg {
        position: relative;
        z-index: 2;
        padding: 15px;
        fill: white;
      }
    }

    &_orange {
      border: 2px solid #F75C03;

      .direction-link__icon {
        background-color: #F75C03;

        &:after {
          background-color: #ED520D;
        }
      }
    }
    &_green {
      border: 2px solid #B0E338;

      .direction-link__icon {
        background-color: #B0E338;

        &:after {
          background-color: #A6D92E;
        }
      }
    }
  }
}
</style>
