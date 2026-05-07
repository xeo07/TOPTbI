<script setup>
import { RouterLink } from 'vue-router'
import { useFavorites } from '../composables/useFavorites'

const props = defineProps({
  cake: Object
})

const emit = defineEmits(['selectCake'])
const favoriteStore = useFavorites()

function sendSelect() {
  emit('selectCake', props.cake.title)
}
</script>

<template>
  <article class="cake-card">
    <img :src="cake.image" :alt="cake.title">

    <div class="cake-card-body">
      <div class="cake-top">
        <span class="badge">{{ cake.category }}</span>
        <button class="icon-button" @click="favoriteStore.toggleFavorite(cake.id)">
          <span v-if="favoriteStore.isFavorite(cake.id)">★</span>
          <span v-else>☆</span>
        </button>
      </div>

      <h3>{{ cake.title }}</h3>
      <p>{{ cake.short }}</p>

      <div class="cake-meta">
        <span>{{ cake.weight }} кг</span>
        <strong>{{ cake.price }} ₽</strong>
      </div>

      <div class="card-actions">
        <RouterLink
          class="button"
          :to="{ name: 'cakeDescription', params: { id: cake.id } }"
          @click="sendSelect"
        >
          Подробнее
        </RouterLink>

        <RouterLink class="button secondary" :to="{ name: 'constructor' }">
          Собрать свой
        </RouterLink>
      </div>
    </div>
  </article>
</template>
