<script setup>
import SvgIcon from "./SvgIcon.vue";

let logMedal = () => alert('Ачивки находятся в разработке.')
let logLeaderBord = () => alert('Лидерборд скоро станет доступен.')
</script>

<template>
<nav class="app-nav">
  <router-link to="/">
    <svg-icon name="home" width="50" height="50"/>
  </router-link>
  <div @click="logMedal">
    <svg-icon name="medal" width="50" height="50"/>
  </div>
  <div @click="logLeaderBord">
    <svg-icon name="stats" width="50" height="50"/>
  </div>
</nav>
</template>

<style scoped lang="scss">
.app-nav {
  display: flex;
  justify-content: space-between;
  background-color: #EEE9FF;
  border-radius: 10px 10px 0 0;
  padding: 20px 30px;
  margin-bottom: 0;
}
a {
  line-height: 0!important;
}
</style>