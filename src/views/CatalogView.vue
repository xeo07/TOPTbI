<script setup>
import { ref, computed } from 'vue'
import CakeCard from '../components/CakeCard.vue'
import { useCakes } from '../composables/useCakes'

const cakesStore = useCakes()
const selectedCategory = ref('Все')

const categories = ['Все', 'Шоколадные', 'Муссовые', 'Классические', 'Праздничные']

const filteredCakes = computed(() => {
  if (selectedCategory.value === 'Все') {
    return cakesStore.cakeList.value
  }

  return cakesStore.cakeList.value.filter((cake) => cake.category === selectedCategory.value)
})
</script>

<template>
  <main class="section">
    <div class="container">
      <div class="page-heading">
        <p class="eyebrow">Каталог</p>
        <h1>Примеры тортов</h1>
        <p>Выберите готовый вариант или используйте его как основу для индивидуального заказа.</p>
      </div>

      <div class="filters">
        <button
          v-for="category in categories"
          :key="category"
          :class="{ active: selectedCategory === category }"
          @click="selectedCategory = category"
        >
          {{ category }}
        </button>
      </div>

      <div class="cards-grid">
        <CakeCard
          v-for="cake in filteredCakes"
          :key="cake.id"
          :cake="cake"
          @selectCake="showSelected"
        />
      </div>
    </div>

    <ModalWindow
      v-if="selectedMessage"
      title="Карточка открыта"
      :text="selectedMessage"
      @close="closeModal"
    />
  </main>
</template>
