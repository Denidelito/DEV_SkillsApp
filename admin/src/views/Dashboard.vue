<script setup>
import DashboardHeader from "../components/Dashboard/DashboardHeader.vue";
import DashboardNav from "../components/Dashboard/DashboardNav.vue";

</script>

<template>
  <div class="dashboard">
    <dashboard-header/>
    <div class="dashboard-body">
      <dashboard-nav/>
      <div class="dashboard-container">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .dashboard {
    width: 100%;
    height: 100vh;
    background-color: white;

    &-body {
      display: flex;
      height: calc(100% - 47px);
    }

    &-container {
      width: 100%;
      padding: 20px;
    }

  }
</style>
