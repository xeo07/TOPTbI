<script setup>
defineProps({
  title: String,
  text: String
})

const emit = defineEmits(['close'])
</script>

<template>
  <div class="modal-bg">
    <div class="modal-window">
      <h2>{{ title }}</h2>
      <p>{{ text }}</p>
      <button @click="emit('close')">Закрыть</button>
    </div>
  </div>
</template>
