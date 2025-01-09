<script setup>
import { useRouter } from 'vue-router';
import Alerts from "./components/Alerts.vue";

const router = useRouter();

</script>

<template>
  <router-view/>
  <Alerts/>
</template>

<style lang="scss">
#app {
  width: 100%;
}
</style>
