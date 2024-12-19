<script setup>
import { onMounted } from 'vue';
import { useDirectionsStore } from '../stores/directions';
import SvgIcon from "../components/SvgIcon.vue";

const directionsStore = useDirectionsStore();

onMounted(() => {
  directionsStore.fetchDirections().catch((error) => {
    console.error('Failed to fetch directions:', error);
  });
});
</script>

<template>
  <div>
    <header>
      <div>

      </div>
      <div>
        <svg-icon name="stats" width="45" height="45"/>
      </div>
    </header>
    <h3>Направления</h3>
    <hr>
    <div class="direction-tabs">
<!--      <div class="direction-tab" v-for="direction in directionsStore.directions" :key="direction.id">
        <router-link class="direction-link" :to="`/directions/${direction.id}/groups`">
          <span class="direction-link__icon">
            <svg-icon width="30" height="30" name="food"/>
          </span>
          <span class="direction-link__text">{{ direction.name }}</span>
        </router-link>
      </div>-->
      <router-link class="direction-link direction-link_green" to="/directions/6/groups">
        <span class="direction-link__icon">
            <svg-icon width="30" height="30" name="food"/>
        </span>
        <span class="direction-link__text">Ресторанный контент</span>
      </router-link>
      <router-link class="direction-link" to="/directions/5/groups">
        <span class="direction-link__icon">
            <svg-icon width="30" height="30" name="store"/>
        </span>
        <span class="direction-link__text">Ритейл</span>
      </router-link>
      <router-link class="direction-link direction-link_orange" to="/directions/7/groups">
        <span class="direction-link__icon">
            <svg-icon width="30" height="30" name="camera"/>
        </span>
        <span class="direction-link__text">Ретушь</span>
      </router-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
.direction {
  &-tabs {
    padding-top: 30px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &-link {
    display: flex;
    align-items: center;
    gap: 20px;
    border-radius: 20px;
    text-decoration: none;
    border: 2px solid var(--color-primary);

    &__text {
      font-family: var(--font-primary), sans-serif;
      font-weight: 700;
      color: #1E1E1E;
    }

    &__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      border-radius: 15px 0 0 15px;
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
