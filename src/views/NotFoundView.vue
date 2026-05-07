<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="section">
    <div class="container not-found">
      <p class="eyebrow">404</p>
      <h1>Страница не найдена</h1>
      <p>Такого раздела нет. Вернитесь на главную страницу или откройте каталог.</p>
      <RouterLink class="button" :to="{ name: 'home' }">На главную</RouterLink>
    </div>
  </main>
</template>
