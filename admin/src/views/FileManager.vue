<template>
  <div class="file-manager">
    <h2>Управление файлами</h2>

    <!-- Загрузка нового файла -->
    <div class="file-upload">
      <label for="fileInput">Добавить файл:</label>
      <input id="fileInput" type="file" @change="handleFileUpload" />
    </div>

    <!-- Вывод списка файлов -->
    <div v-if="files.length > 0" class="file-list">
      <h3>Список файлов</h3>
      <ul>
        <li v-for="file in files" :key="file.id" class="file-item">
          <a :href="file.filePath" target="_blank">{{ file.originalName }}</a>
          <button @click="deleteFile(file.id)">Удалить</button>
        </li>
      </ul>
    </div>

    <p v-else>Файлы отсутствуют.</p>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useFilesStore } from '../stores/files';

const filesStore = useFilesStore();

// Список файлов из состояния store
const files = filesStore.files;

// Загружаем список файлов при монтировании компонента
const loadFiles = async () => {
  await filesStore.fetchFiles();
};

// Обработчик загрузки файла
const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (file) {
    await filesStore.uploadFile(file);
  }
};

// Удаление файла
const deleteFile = async (fileId) => {
  await filesStore.deleteFile(fileId);
};

// Загружаем файлы при монтировании
onMounted(() => {
  loadFiles();
});
</script>

<style scoped>
.file-manager {
  padding: 20px;
}

.file-upload {
  margin-bottom: 20px;
}

.file-list {
  margin-top: 20px;
}

.file-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.file-item a {
  margin-right: 10px;
  color: #007bff;
  text-decoration: none;
}

.file-item button {
  background-color: #ff4d4f;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.file-item button:hover {
  background-color: #ff7875;
}
</style>
