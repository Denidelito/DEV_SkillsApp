<template>
  <nav>
    <ul class="breadcrumbs">
      <li v-for="(breadcrumb, index) in filteredBreadcrumbs" :key="index">
        <router-link v-if="index < filteredBreadcrumbs.length - 1" :to="breadcrumb.path">
          {{ breadcrumb.name }}
        </router-link>
        <span v-else>{{ breadcrumb.name }}</span>
        <span v-if="index < filteredBreadcrumbs.length - 1">/</span>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const breadcrumbs = computed(() => {
  const pathArray = route.path.split('/').filter(Boolean);
  let breadcrumbList = [];
  let pathAccumulator = '';

  pathArray.forEach((segment, index) => {
    pathAccumulator += `/${segment}`;
    breadcrumbList.push({
      name: segment.replace(/([A-Z])/g, ' $1').toLowerCase(),
      path: pathAccumulator,
    });
  });

  return breadcrumbList;
});

// Убираем первую ссылку
const filteredBreadcrumbs = computed(() => breadcrumbs.value.slice(1));
</script>

<style scoped>
.breadcrumbs {
  list-style-type: none;
  display: flex;
  padding: 0;
  margin: 0;
}
.breadcrumbs li {
  display: inline;
}
.breadcrumbs li a {
  text-decoration: none;
  color: #007bff;
}
.breadcrumbs li span {
  color: #6c757d;
}
.breadcrumbs li span:hover {
  cursor: default;
}
.breadcrumbs li span:last-child {
  color: #333;
}
</style>
