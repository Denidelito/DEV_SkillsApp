<script setup>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useGroupsStore } from '../stores/taskGroups.js';

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
    <h1>Groups</h1>
    <ul>
      <li v-for="group in groupStore.groups" :key="group.id">
        <router-link :to="`/directions/${directionId}/groups/${group.id}`">
          {{ group.name }}
        </router-link>
      </li>
    </ul>

    <router-view />
  </div>
</template>

<style scoped lang="scss">

</style>
