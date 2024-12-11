<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useTasksStore } from '../stores/tasks';
import AddTaskForm from '../components/Tasks/AddTaskForm.vue';
import TaskList from '../components/Tasks/TaskList.vue';
import EditTaskForm from '../components/Tasks/EditTaskForm.vue';

const tasksStore = useTasksStore();
const route = useRoute();
const taskGroupId = ref(route.params.taskGroupId);

const editingTask = ref(null);
const showAddModal = ref(false);
const showEditModal = ref(false);

const fetchTasks = async () => {
  try {
    await tasksStore.fetchTasksByGroup(taskGroupId.value);
  } catch (error) {
    console.error('Task Fetch Error:', error);
  }
};

const deleteTask = async (taskId) => {
  try {
    await tasksStore.deleteTask(taskId);
  } catch (error) {
    console.error('Task Delete Error:', error);
  }
};

const editTask = async (updatedTask) => {
  try {
    await tasksStore.updateTask(updatedTask.id, updatedTask);
    showEditModal.value = false;
    editingTask.value = null;
  } catch (error) {
    console.error('Task Edit Error:', error);
  }
};

const startEditingTask = (task) => {
  editingTask.value = { ...task };
  showEditModal.value = true;
};

watch(() => route.params.taskGroupId, (newGroupId) => {
  taskGroupId.value = newGroupId;
  fetchTasks();
});

onMounted(fetchTasks);
</script>


<template>
  <div class="task-container">
    <!-- Сообщения об ошибках и успехе -->
    <div v-if="tasksStore.errorMessage" class="message message-error">
      <div class="message-content">
        {{ tasksStore.errorMessage }}
      </div>
    </div>

    <div v-if="tasksStore.successMessage" class="message message-success">
      <div class="message-content">
        {{ tasksStore.successMessage }}
      </div>
    </div>

    <!-- Кнопка для добавления задания -->
    <div>
      <button class="button" @click="showAddModal = true">Добавить задание</button>
    </div>

    <!-- Список задач -->
    <TaskList
        :tasks="tasksStore.tasks"
        @delete-task="deleteTask"
        @start-editing-task="startEditingTask"
    />

    <!-- Модальное окно добавления задания -->
    <div v-if="showAddModal" class="modal-overlay">
      <div class="modal">
        <AddTaskForm
            :taskGroupId="taskGroupId"
            @task-added="showAddModal = false"
        />
        <button @click="showAddModal = false">Закрыть</button>
      </div>
    </div>

    <!-- Модальное окно редактирования задания -->
    <div v-if="showEditModal" class="modal-overlay">
      <div class="modal">
        <EditTaskForm
            :task="editingTask"
            @save-task="editTask"
            @cancel-edit="() => { editingTask = null; showEditModal = false; }"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .task-container {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
</style>