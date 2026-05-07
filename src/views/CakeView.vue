<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink, RouterView } from 'vue-router'
import { useCakes } from '../composables/useCakes'
import { useFavorites } from '../composables/useFavorites'
import { getPublicAssetUrl } from '../composables/usePublicAsset'

const route = useRoute()
const cakesStore = useCakes()
const favoritesStore = useFavorites()

const cake = computed(() => cakesStore.getCakeById(route.params.id))
</script>

<template>
  <main class="section">
    <div class="container">
      <div v-if="cake" class="detail">
        <img :src="getPublicAssetUrl(cake.image)" :alt="cake.title">

        <div>
          <p class="eyebrow">{{ cake.category }}</p>
          <h1>{{ cake.title }}</h1>
          <p>{{ cake.short }}</p>

          <div class="detail-meta">
            <span>Вес: {{ cake.weight }} кг</span>
            <strong>{{ cake.price }} ₽</strong>
          </div>

          <div class="detail-actions">
            <button @click="favoritesStore.toggleFavorite(cake.id)">
              <span v-if="favoritesStore.isFavorite(cake.id)">Удалить из избранного</span>
              <span v-else>Добавить в избранное</span>
            </button>
            <RouterLink class="button secondary" :to="{ name: 'constructor' }">Собрать свой торт</RouterLink>
          </div>
        </div>
      </div>

      <div v-if="cake" class="tabs">
        <RouterLink :to="{ name: 'cakeDescription', params: { id: cake.id } }">Описание</RouterLink>
        <RouterLink :to="{ name: 'cakeComposition', params: { id: cake.id } }">Состав</RouterLink>
        <RouterLink :to="{ name: 'cakeReviews', params: { id: cake.id } }">Отзывы</RouterLink>
      </div>

      <RouterView />

      <div v-if="!cake" class="empty">
        <h1>Торт не найден</h1>
        <RouterLink class="button" :to="{ name: 'catalog' }">Вернуться в каталог</RouterLink>
      </div>
    </div>
  </main>
</template>
