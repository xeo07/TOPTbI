<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <main class="section">
    <div class="container">
      <div class="page-heading">
        <p class="eyebrow">Администратор</p>
        <h1>Панель управления</h1>
        <p>Раздел доступен только пользователю с ролью администратора.</p>
      </div>

      <div class="tabs">
        <RouterLink :to="{ name: 'adminCakes' }">Список тортов</RouterLink>
        <RouterLink :to="{ name: 'adminAddCake' }">Добавить торт</RouterLink>
      </div>

      <RouterView />
    </div>
  </main>
</template>
