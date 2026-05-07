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
    <h2>Состав</h2>
    <p>{{ cake.composition }}</p>
  </section>
</template>
