<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
  },
  actionAccept: {
    type: Function,
    require: true
  },
  actionCancel: {
    type: Function,
    required: true
  }
})
</script>

<template>
  <div class="modal-overlay">
    <div class="modal">
      <h3>{{title}}</h3>
      <p v-if="text">{{text}}</p>
      <div class="modal-actions">
        <button @click="actionAccept" class="button button--danger">Принять</button>
        <button @click="actionCancel" class="button button--secondary">Отмена</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>