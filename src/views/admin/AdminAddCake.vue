<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useCakes } from '../../composables/useCakes'

const router = useRouter()
const cakesStore = useCakes()

const form = reactive({
  title: '',
  category: '',
  weight: '',
  price: '',
  image: '/images/3.png',
  short: '',
  description: '',
  composition: ''
})

const errors = reactive({
  title: '',
  category: '',
  weight: '',
  price: '',
  short: ''
})

function clearErrors() {
  errors.title = ''
  errors.category = ''
  errors.weight = ''
  errors.price = ''
  errors.short = ''
}

function validate() {
  clearErrors()
  let isValid = true

  if (form.title.trim().length < 2) {
    errors.title = 'Введите название'
    isValid = false
  }

  if (!form.category) {
    errors.category = 'Выберите категорию'
    isValid = false
  }

  if (Number(form.weight) <= 0) {
    errors.weight = 'Вес должен быть больше 0'
    isValid = false
  }

  if (Number(form.price) <= 0) {
    errors.price = 'Цена должна быть больше 0'
    isValid = false
  }

  if (form.short.trim().length < 5) {
    errors.short = 'Добавьте краткое описание'
    isValid = false
  }

  return isValid
}

function saveCake() {
  if (!validate()) {
    return
  }

  cakesStore.addCake(form)
  router.push({ name: 'adminCakes' })
}
</script>

<template>
  <section class="info-box">
    <h2>Добавление торта</h2>

    <form class="form" @submit.prevent="saveCake" novalidate>
      <label>
        Название
        <input v-model="form.title" type="text">
        <span class="error" v-if="errors.title">{{ errors.title }}</span>
      </label>

      <label>
        Категория
        <select v-model="form.category">
          <option value="">Выберите категорию</option>
          <option value="Шоколадные">Шоколадные</option>
          <option value="Муссовые">Муссовые</option>
          <option value="Классические">Классические</option>
          <option value="Праздничные">Праздничные</option>
        </select>
        <span class="error" v-if="errors.category">{{ errors.category }}</span>
      </label>

      <label>
        Вес
        <input v-model="form.weight" type="number">
        <span class="error" v-if="errors.weight">{{ errors.weight }}</span>
      </label>

      <label>
        Цена
        <input v-model="form.price" type="number">
        <span class="error" v-if="errors.price">{{ errors.price }}</span>
      </label>

      <label>
        Картинка
        <select v-model="form.image">
          <option value="/images/3.png">Индивидуальный торт</option>
          <option value="/images/2.png">Шоколадный торт</option>
          <option value="/images/1.png">Ягодный торт</option>
          <option value="/images/6.png">Праздничный торт</option>
        </select>
      </label>

      <label>
        Краткое описание
        <input v-model="form.short" type="text">
        <span class="error" v-if="errors.short">{{ errors.short }}</span>
      </label>

      <label>
        Описание
        <textarea v-model="form.description"></textarea>
      </label>

      <label>
        Состав
        <textarea v-model="form.composition"></textarea>
      </label>

      <button type="submit">Сохранить</button>
    </form>
  </section>
</template>
