<script setup>
import { useRouter } from 'vue-router';
import {computed, ref} from "vue";
import {useHandleLogStore} from "./stores/handleLog.js";

const router = useRouter();
const handleLog = useHandleLogStore();

const errorMessage = computed(() => handleLog.errorMessage);
const successMessage = computed(() => handleLog.successMessage);

</script>

<template>
  <router-view/>
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
</template>

<style lang="scss">
#app {
  width: 100%;
}
</style>
