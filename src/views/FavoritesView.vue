<script setup>
import { computed } from 'vue'
import CakeCard from '../components/CakeCard.vue'
import { useCakes } from '../composables/useCakes'
import { useFavorites } from '../composables/useFavorites'

const cakesStore = useCakes()
const favoritesStore = useFavorites()

const favoriteCakes = computed(() => {
  return cakesStore.cakeList.value.filter((cake) => favoritesStore.favoriteIds.value.includes(cake.id))
})
</script>

<template>
  <main class="section">
    <div class="container">
      <div class="page-heading">
        <p class="eyebrow">Избранное</p>
        <h1>Понравившиеся торты</h1>
      </div>

      <div v-if="favoriteCakes.length > 0" class="cards-grid">
        <CakeCard
          v-for="cake in favoriteCakes"
          :key="cake.id"
          :cake="cake"
        />
      </div>

      <div v-else class="empty">
        <h2>Пока ничего не добавлено</h2>
        <p>Откройте каталог и отметьте понравившиеся варианты.</p>
      </div>
    </div>
  </main>
</template>
