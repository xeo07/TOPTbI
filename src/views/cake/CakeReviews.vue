<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCakes } from '../../composables/useCakes'

const route = useRoute()
const cakesStore = useCakes()
const cake = computed(() => cakesStore.getCakeById(route.params.id))
</script>

<template>
  <section v-if="cake" class="info-box">
    <h2>Отзывы</h2>
    <div v-if="cake.reviews.length > 0">
      <p v-for="review in cake.reviews" :key="review" class="review">{{ review }}</p>
    </div>
    <p v-else>Отзывов пока нет.</p>
  </section>
</template>
