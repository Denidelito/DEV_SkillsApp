<script setup>

import SvgIcon from "./SvgIcon.vue";
</script>

<template>
  <header class="header">
<!--    <router-link to="/">
      <svg-icon name="arrow-back" width="50" height="50"/>
    </router-link>-->
    <div class="void-icon"></div>
    <div class="header-title">Квесты</div>
    <svg-icon name="notifications" width="50" height="50"/>
  </header>
</template>

<style scoped lang="scss">
.void-icon {
  width: 50px;
  height: 50px;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32px 16px;

  &-title {
    font-size: 24px;
    font-family: var(--font-secondary), sans-serif;
    font-weight: 800;
  }
}
</style>