<script setup>
import { ref, computed } from 'vue'
import { useCakesStore } from '../stores/useCakesStore'

const cakesStore = useCakesStore()

const selectedCategory = ref('Все')
const searchQuery = ref('')
const sortType = ref('default')

const categories = ['Все', 'Шоколадные', 'Муссовые', 'Классические', 'Праздничные']

const filteredCakes = computed(() => {
  let result = cakesStore.cakeList.value

  if (selectedCategory.value !== 'Все') {
    result = result.filter((cake) => cake.category === selectedCategory.value)
  }

  if (searchQuery.value.trim()) {
    result = result.filter((cake) =>
      cake.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (sortType.value === 'priceAsc') {
    result = [...result].sort((a, b) => a.price - b.price)
  }

  if (sortType.value === 'priceDesc') {
    result = [...result].sort((a, b) => b.price - a.price)
  }

  return result
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

      <div class="catalog-controls">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Найти торт по названию"
        >
      
        <select v-model="sortType">
          <option value="default">Без сортировки</option>
          <option value="priceAsc">Сначала дешевле</option>
          <option value="priceDesc">Сначала дороже</option>
        </select>
      </div>
      
      <div class="cards-grid">
        <CakeCard
          v-for="cake in filteredCakes"
          :key="cake.id"
          :cake="cake"
        />
      </div>
    </div>
  </main>
</template>
