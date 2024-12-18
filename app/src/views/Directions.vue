<script setup>
import { onMounted } from 'vue';
import { useDirectionsStore } from '../stores/directions';

const directionsStore = useDirectionsStore();

onMounted(() => {
  directionsStore.fetchDirections().catch((error) => {
    console.error('Failed to fetch directions:', error);
  });
});
</script>

<template>
  <div>
    <h1>Directions</h1>
    <ul>
      <li v-for="direction in directionsStore.directions" :key="direction.id">
        <router-link :to="`/directions/${direction.id}/groups`">
          {{ direction.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style>

</style>
