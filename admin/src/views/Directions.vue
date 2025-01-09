<script setup>
import { computed, ref } from 'vue';
import { useDirectionsStore } from '../stores/directions.js';
import DirectionsList from "../components/DirectionsList.vue";

const directionsStore = useDirectionsStore();
const directionName = ref('');
const directionDescription = ref('');

const addDirection = async () => {
  const response = await directionsStore.addDirection(
      directionName.value,
      directionDescription.value
  );

  if (response) {
    directionName.value = '';
    directionDescription.value = '';

    closeModal();

    await directionsStore.fetchDirections();
  }
};

const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  directionName.value = '';
  directionDescription.value = '';
};
</script>

<template>
  <div v-if="isModalOpen" class="modal-overlay">
    <div class="modal">
      <form @submit.prevent="addDirection" class="form">
        <div class="input">
          <label for="direction-name">Название:</label>
          <input id="direction-name" v-model="directionName" type="text" required />
        </div>

        <div class="input">
          <label for="direction-description">Описание:</label>
          <textarea id="direction-description" v-model="directionDescription" required></textarea>
        </div>

        <button type="submit" class="button">Добавить</button>
        <button class="button button--secondary" type="button" @click="closeModal">Отмена</button>
      </form>
    </div>
  </div>

  <div>
    <button class="button" @click="openModal">Добавить направление</button>
  </div>
  <directions-list/>
</template>

