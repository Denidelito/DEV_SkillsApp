<script setup>
import {computed, ref} from "vue";
import {useHandleLogStore} from "../stores/handleLog.js";

const handleLog = useHandleLogStore();

const errorMessage = computed(() => handleLog.errorMessage);
const successMessage = computed(() => handleLog.successMessage);

</script>

<template>
  <div class="message-container">
    <div v-if="errorMessage" class="message message-error">
      <div class="message-content">
        {{ errorMessage }}
      </div>
    </div>

    <div v-if="successMessage" class="message message-success">
      <div class="message-content">
        {{ successMessage }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.message {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 1em 2em;
  max-width: 300px;
  border-radius: 8px;
  font-size: 1em;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 9999;
  pointer-events: none;
  transition: opacity 0.3s ease, transform 0.3s ease;

  &-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &-error {
    background-color: rgba(255, 0, 0, 0.9);
    color: white;
  }

  &-success {
    background-color: rgba(0, 123, 255, 0.9);
    color: white;
  }

  &-content {
    font-size: 0.9em;
  }

  &.visible {
    opacity: 1;
    pointer-events: all;
    transform: translateY(0);
  }
}

</style>