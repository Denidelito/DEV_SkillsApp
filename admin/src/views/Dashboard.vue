<script setup>
import Header from "../components/Header.vue";
import Nav from "../components/Nav.vue";
import UsersList from "../components/UsersList.vue";

</script>

<template>
  <div>
    <Header/>
    <Nav/>
    <router-view/>
  </div>
</template>
