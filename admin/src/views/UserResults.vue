<script setup>
import { ref, onMounted } from 'vue';
import { useUserResultsStore } from '../stores/userResults';
import {useRoute, useRouter} from 'vue-router';

const route = useRoute();

const userId = ref(route.params.userId);
const userResults = ref([]);
const store = useUserResultsStore();

onMounted(async () => {
  await store.fetchUserResults(userId.value);
  userResults.value = store.userResults.data;
});
</script>

<template>
  <div>
    <h1>Результаты пользователя</h1>

    <table class="table" v-if="userResults.length">
      <thead>
      <tr>
        <th>Группа</th>
        <th>Очки</th>
        <th>Завершено</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="result in userResults" :key="result.id">
        <td>{{ result.task_group_name }}</td>
        <td>{{ result.score }}</td>
        <td>{{ result.completed_at }}</td>
      </tr>
      </tbody>
    </table>
    <p v-else>Нет результатов.</p>
  </div>
</template>