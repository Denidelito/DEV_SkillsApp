<script setup>
import UsersList from "../components/UsersList.vue";
import UsersAdd from "../components/UsersAdd.vue";
</script>

<template>
  <h1>users</h1>

  <div class="row">
    <users-list/>
    <users-add/>
  </div>
</template>

<style scoped>
  .row {
    display: flex;
    gap: 30px;
  }
</style>