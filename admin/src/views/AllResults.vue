<script setup>
import { ref, onMounted, computed } from 'vue';
import { useUserResultsStore } from '../stores/userResults';
import * as XLSX from 'xlsx';

const allUserResults = ref([]);
const store = useUserResultsStore();

const filterUsername = ref('');
const filterDirection = ref('');
const filterQuest = ref('');

const sortField = ref('score');
const sortOrder = ref('desc');
const isLoading = ref(true);

onMounted(async () => {
  try {
    await store.fetchAllUserResults();
    allUserResults.value = store.userResults.data;
  } catch (error) {
    console.error("Error fetching user results:", error);
  } finally {
    isLoading.value = false;
  }
});

const filteredAndSortedResults = computed(() => {
  let results = allUserResults.value.filter((result) => {
    return (
        (!filterUsername.value || result.username?.toLowerCase().includes(filterUsername.value.toLowerCase())) &&
        (!filterDirection.value || result.direction_name?.toLowerCase().includes(filterDirection.value.toLowerCase())) &&
        (!filterQuest.value || result.task_group_name?.toLowerCase().includes(filterQuest.value.toLowerCase()))
    );
  });

  results = results.sort((a, b) => {
    const aValue = a[sortField.value];
    const bValue = b[sortField.value];

    if (sortOrder.value === 'asc') {
      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    } else {
      return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
    }
  });

  return results;
});

function exportToExcel() {
  const data = filteredAndSortedResults.value.map(result => ({
    Пользователь: result.username || result.user_id,
    Направление: result.direction_name,
    Квест: result.task_group_name,
    Очки: result.score,
    Завершено: result.completed_at,
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Результаты');
  XLSX.writeFile(workbook, 'Результаты_пользователей.xlsx');
}

function toggleSortOrder() {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
}
</script>

<template>
  <div>
    <h1>Результаты всех пользователей</h1>

    <!-- Прелоудер -->
    <div v-if="isLoading" class="preloader">
      <div class="loader"></div>
    </div>

    <div v-else>
      <div class="filters">
        <label>
          Пользователь:
          <input v-model="filterUsername" placeholder="Введите имя пользователя"/>
        </label>
        <label>
          Направление:
          <input v-model="filterDirection" placeholder="Введите направление"/>
        </label>
        <label>
          Квест:
          <input v-model="filterQuest" placeholder="Введите квест"/>
        </label>
      </div>

      <button @click="exportToExcel">Выгрузить в Excel</button>

      <table class="table" v-if="filteredAndSortedResults.length">
        <thead>
        <tr>
          <th @click="sortField = 'username'; toggleSortOrder()">Пользователь</th>
          <th @click="sortField = 'direction_name'; toggleSortOrder()">Направление</th>
          <th @click="sortField = 'task_group_name'; toggleSortOrder()">Квест</th>
          <th @click="sortField = 'score'; toggleSortOrder()">Очки</th>
          <th @click="sortField = 'completed_at'; toggleSortOrder()">Завершено</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="result in filteredAndSortedResults" :key="result.id">
          <td>{{ result.username || result.user_id }}</td>
          <td>{{ result.direction_name }}</td>
          <td>{{ result.task_group_name }}</td>
          <td>{{ result.score }}</td>
          <td>{{ result.completed_at }}</td>
        </tr>
        </tbody>
      </table>

      <p v-else>Нет результатов.</p>
    </div>
  </div>
</template>

<style scoped>
/* Прелоудер */
.preloader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loader {
  border: 8px solid rgba(255, 255, 255, 0.1);
  border-left: 8px solid #3498db;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  animation: spin 1.5s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.filters {
  margin-bottom: 1rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.filters label {
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
}

.filters input {
  margin-top: 0.5rem;
  padding: 0.5rem;
  font-size: 1rem;
  width: 200px;
}

button {
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  cursor: pointer;
  padding: 10px;
  text-align: left;
}

td {
  padding: 10px;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:hover {
  background-color: #f1f1f1;
}
</style>
