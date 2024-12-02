<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useTasksStore } from '../stores/tasks';
import AddTaskForm from '../components/Tasks/AddTaskForm.vue';
import TaskList from '../components/Tasks/TaskList.vue';
import EditTaskForm from '../components/Tasks/EditTaskForm.vue';

const tasksStore = useTasksStore();
const tasks = ref([]);
const route = useRoute();
const taskGroupId = ref(route.params.taskGroupId);
const editingTask = ref(null);
const showAddModal = ref(false);
const showEditModal = ref(false);

const handleError = (error) => {
  console.error('Task Operation Error:', error);
};

const fetchTasks = async () => {
  try {
    await tasksStore.fetchTasksByGroup(taskGroupId.value);
    tasks.value = tasksStore.tasks;
  } catch (error) {
    handleError(error);
  }
};

const deleteTask = async (taskId) => {
  try {
    await tasksStore.deleteTask(taskId);
    tasks.value = tasks.value.filter(task => task.id !== taskId);
  } catch (error) {
    handleError(error);
  }
};

const editTask = async (updatedTask) => {
  try {
    await tasksStore.updateTask(updatedTask.id, updatedTask);
    const index = tasks.value.findIndex(task => task.id === updatedTask.id);
    if (index !== -1) {
      tasks.value[index] = updatedTask;
    }
    editingTask.value = null;
    showEditModal.value = false;
  } catch (error) {
    handleError(error);
  }
};

const startEditingTask = (task) => {
  editingTask.value = { ...task };
  showEditModal.value = true;
};

onMounted(fetchTasks);
</script>

<template>
  <div>
    <h2>Tasks List for Group {{ taskGroupId }}</h2>

    <div v-if="tasksStore.errorMessage" class="error-message">
      {{ tasksStore.errorMessage }}
    </div>
    <div v-if="tasksStore.successMessage" class="success-message">
      {{ tasksStore.successMessage }}
    </div>

    <button @click="showAddModal = true">Add Task</button>

    <TaskList :tasks="tasks" @delete-task="deleteTask" @start-editing-task="startEditingTask" />

    <!-- Add Task Modal -->
    <div v-if="showAddModal" class="modal-overlay">
      <div class="modal">
        <AddTaskForm :taskGroupId="taskGroupId" @task-added="(task) => { tasks.push(task); showAddModal = false; }" >
          <button @click="showAddModal = false">Close</button>
        </AddTaskForm>
      </div>
    </div>

    <!-- Edit Task Modal -->
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