import { ref, computed, watch } from 'vue'

const defaultCakes = [
  {
    id: 1,
    title: 'Шоколадный трюфель',
    category: 'Шоколадные',
    weight: 2,
    price: 3200,
    image: 'images/2.png',
    short: 'Насыщенный шоколадный торт с кремом и мягким бисквитом.',
    description: 'Торт подходит для дня рождения, семейного праздника или небольшого торжества.',
    composition: 'Шоколадный бисквит, какао, сливочный крем, шоколадная глазурь.',
    reviews: ['Насыщенный вкус.', 'Хороший вариант для любителей шоколада.']
  },
  {
    id: 2,
    title: 'Ягодный мусс',
    category: 'Муссовые',
    weight: 1.5,
    price: 2800,
    image: 'images/1.png',
    short: 'Лёгкий муссовый торт с ягодным вкусом и нежной текстурой.',
    description: 'Современный торт с мягкой текстурой. Подходит для праздника или подарка.',
    composition: 'Ягодный мусс, бисквитная основа, сливки, ягодная прослойка.',
    reviews: ['Нежный и не слишком сладкий.', 'Красиво смотрится на столе.']
  },
  {
    id: 3,
    title: 'Ванильная классика',
    category: 'Классические',
    weight: 2.5,
    price: 3500,
    image: 'images/5.png',
    short: 'Классический торт с ванильным кремом и спокойным оформлением.',
    description: 'Универсальный вариант для большого праздника.',
    composition: 'Ванильный бисквит, сливочный крем, сироп, кремовое покрытие.',
    reviews: ['Классика без лишнего.', 'Подошёл для семейного праздника.']
  },
  {
    id: 4,
    title: 'Свадебный минимализм',
    category: 'Праздничные',
    weight: 3,
    price: 5200,
    image: 'images/6.png',
    short: 'Праздничный торт с минималистичным декором и светлым кремом.',
    description: 'Торт для особого мероприятия. Можно адаптировать цвет и декор под заказ.',
    composition: 'Бисквит, сливочный крем, прослойка на выбор, декоративные элементы.',
    reviews: ['Выглядит дорого и аккуратно.', 'Хороший праздничный вариант.']
  }
]

const savedCakes = localStorage.getItem('cakesList')
let startCakes = defaultCakes

if (savedCakes) {
  try {
    startCakes = JSON.parse(savedCakes)
  } catch (error) {
    startCakes = defaultCakes
  }
}

const cakes = ref(startCakes)

watch(cakes, (newValue) => {
  localStorage.setItem('cakesList', JSON.stringify(newValue))
}, { deep: true })

export function useCakes() {
  const cakeList = computed(() => cakes.value)

  function getCakeById(id) {
    return cakes.value.find((cake) => cake.id === Number(id))
  }

  function addCake(newCake) {
    let newId = 1

    if (cakes.value.length > 0) {
      newId = cakes.value[cakes.value.length - 1].id + 1
    }

    cakes.value.push({
      id: newId,
      title: newCake.title,
      category: newCake.category,
      weight: Number(newCake.weight),
      price: Number(newCake.price),
      image: newCake.image,
      short: newCake.short,
      description: newCake.description,
      composition: newCake.composition,
      reviews: []
    })
  }

  function updateCake(id, changedCake) {
    const index = cakes.value.findIndex((cake) => cake.id === Number(id))

    if (index !== -1) {
      cakes.value[index].title = changedCake.title
      cakes.value[index].category = changedCake.category
      cakes.value[index].weight = Number(changedCake.weight)
      cakes.value[index].price = Number(changedCake.price)
      cakes.value[index].image = changedCake.image
      cakes.value[index].short = changedCake.short
      cakes.value[index].description = changedCake.description
      cakes.value[index].composition = changedCake.composition
    }
  }

  function deleteCake(id) {
    const index = cakes.value.findIndex((cake) => cake.id === Number(id))

    if (index !== -1) {
      cakes.value.splice(index, 1)
    }
  }

  return {
    cakeList,
    getCakeById,
    addCake,
    updateCake,
    deleteCake
  }
}
