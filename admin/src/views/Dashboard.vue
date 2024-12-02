<script setup>
import DashboardHeader from "../components/Dashboard/DashboardHeader.vue";
import DashboardNav from "../components/Dashboard/DashboardNav.vue";
import Breadcrumbs from "../components/Breadcrumbs.vue";

</script>

<template>
  <div class="dashboard">
    <dashboard-header/>
    <div class="dashboard-body">
      <dashboard-nav/>
      <div class="dashboard-container">
        <Breadcrumbs/>
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
      height: calc(100% - 60px);
    }

    &-container {
      display: flex;
      flex-direction: column;
      gap: 30px;
      width: calc(100% - 300px);
      box-sizing: border-box;
      padding: 20px;
      overflow-y: scroll;
    }

  }
</style>
