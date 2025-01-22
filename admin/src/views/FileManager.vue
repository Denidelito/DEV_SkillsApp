<script setup>
import { onMounted } from 'vue';
import { useFilesStore } from '../stores/files';

const filesStore = useFilesStore();

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

<template>
  <div class="file-manager">
    <h3>Список файлов</h3>
    <div class="file-list">
      <!-- Загрузка нового файла -->
      <div class="file-upload">
        <label for="fileInput">Добавить файл +</label>
        <input id="fileInput" type="file" @change="handleFileUpload" />
      </div>
      <div v-if="filesStore.files.length > 0" v-for="file in filesStore.files" :key="file.id" class="file-item">
        <a :href="'https://gamequests.ru/'+file.file_path" target="_blank">
          <img :src="'https://gamequests.ru/'+file.file_path" :alt="file.file_name">
        </a>
        <div class="file-item__nav">
          <button @click="deleteFile(file.id)">Удалить</button>
        </div>
      </div>
      <div class="file-item" v-else>Файлы отсутствуют.</div>
    </div>


  </div>
</template>

<style scoped lang="scss">
.file {
  &-list {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 16px;
  }

  &-upload {
    label {
      display: flex;
      align-items: center;
      justify-content: center;
      width:100%;
      height: 200px;
      border-radius: 16px;
      border: 2px solid #0056b3;
      cursor: pointer;
    }

    input {
      display: none;
    }
  }

  &-item {
    overflow: hidden;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border-radius: 16px;
    border: 2px solid #0056b3;
    line-height: 0;

    &__nav {
      position: absolute;
      top: 10px;
      right: 10px;
    }
    img {
      line-height: 0;
      height: 200px;
    }
  }
}
</style>
