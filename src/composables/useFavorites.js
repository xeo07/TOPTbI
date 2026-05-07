import { ref, watch, computed } from 'vue'

const savedFavorites = localStorage.getItem('cakeFavorites')
let startFavorites = []

if (savedFavorites) {
  try {
    startFavorites = JSON.parse(savedFavorites)
  } catch (error) {
    startFavorites = []
  }
}

const favorites = ref(startFavorites)

watch(favorites, (newValue) => {
  localStorage.setItem('cakeFavorites', JSON.stringify(newValue))
}, { deep: true })

export function useFavorites() {
  const favoriteIds = computed(() => favorites.value)

  function isFavorite(id) {
    return favorites.value.includes(Number(id))
  }

  function toggleFavorite(id) {
    const numberId = Number(id)

    if (favorites.value.includes(numberId)) {
      const index = favorites.value.findIndex((item) => item === numberId)
      favorites.value.splice(index, 1)
    } else {
      favorites.value.push(numberId)
    }
  }

  return {
    favoriteIds,
    isFavorite,
    toggleFavorite
  }
}
