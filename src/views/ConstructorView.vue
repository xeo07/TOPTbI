<script setup>
import { reactive, computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import ModalWindow from '../components/ModalWindow.vue'
import { useOrders } from '../composables/useOrders'
import { useUsers } from '../composables/useUsers'

const router = useRouter()
const ordersStore = useOrders()
const usersStore = useUsers()
const today = new Date().toISOString().split('T')[0]

const form = reactive({
  name: usersStore.currentUser.value ? usersStore.currentUser.value.login : '',
  phone: usersStore.currentUser.value ? usersStore.currentUser.value.phone : '',
  email: usersStore.currentUser.value ? usersStore.currentUser.value.email : '',
  shape: 'Круглый',
  taste: 'Ванильный',
  weight: 2,
  filling: 'Клубника',
  decor: 'Минимализм',
  date: '',
  comment: '',
  referenceName: ''
})

const errors = reactive({
  name: '',
  phone: '',
  email: '',
  weight: '',
  date: ''
})

const success = ref(false)

const shapePrices = {
  'Круглый': 0,
  'Квадратный': 300,
  'Сердце': 500
}

const tastePrices = {
  'Ванильный': 0,
  'Шоколадный': 400,
  'Красный бархат': 600
}

const fillingPrices = {
  'Клубника': 350,
  'Малина': 450,
  'Карамель': 300,
  'Шоколад': 400
}

const decorPrices = {
  'Минимализм': 500,
  'Ягоды': 900,
  'Надпись': 350,
  'Премиум декор': 1500
}

const totalPrice = computed(() => {
  return 1200 +
    Number(form.weight) * 900 +
    shapePrices[form.shape] +
    tastePrices[form.taste] +
    fillingPrices[form.filling] +
    decorPrices[form.decor]
})

function clearErrors() {
  errors.name = ''
  errors.phone = ''
  errors.email = ''
  errors.weight = ''
  errors.date = ''
}

function validateForm() {
  clearErrors()
  let isValid = true

  if (form.name.trim().length < 2) {
    errors.name = 'Введите имя, минимум 2 символа'
    isValid = false
  }

  if (!/^\+?[0-9\s\-]{10,18}$/.test(form.phone)) {
    errors.phone = 'Введите корректный телефон'
    isValid = false
  }

  if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(form.email)) {
    errors.email = 'Введите корректную почту'
    isValid = false
  }

  if (Number(form.weight) < 1 || Number(form.weight) > 10) {
    errors.weight = 'Вес должен быть от 1 до 10 кг'
    isValid = false
  }

  if (!form.date) {
    errors.date = 'Укажите дату получения'
    isValid = false
  }

  return isValid
}

function readReference(event) {
  if (event.target.files.length > 0) {
    form.referenceName = event.target.files[0].name
  } else {
    form.referenceName = ''
  }
}

function sendOrder() {
  if (!validateForm()) {
    return
  }

  ordersStore.addOrder({
    userId: usersStore.currentUser.value.id,
    userLogin: usersStore.currentUser.value.login,
    name: form.name,
    phone: form.phone,
    email: form.email,
    shape: form.shape,
    taste: form.taste,
    weight: form.weight,
    filling: form.filling,
    decor: form.decor,
    date: form.date,
    comment: form.comment,
    referenceName: form.referenceName,
    price: totalPrice.value
  })

  success.value = true

  form.shape = 'Круглый'
  form.taste = 'Ванильный'
  form.weight = 2
  form.filling = 'Клубника'
  form.decor = 'Минимализм'
  form.date = ''
  form.comment = ''
  form.referenceName = ''
}

function closeModal() {
  success.value = false
  router.push({ name: 'history' })
}
</script>

<template>
  <main class="section">
    <div class="container constructor-grid">
      <div>
        <div class="page-heading">
          <p class="eyebrow">Конструктор</p>
          <h1>Соберите торт</h1>
          <p>Выберите параметры торта. Стоимость пересчитывается автоматически.</p>
        </div>

        <form class="form" @submit.prevent="sendOrder" novalidate>
          <label>
            Имя
            <input v-model="form.name" type="text">
            <span class="error" v-if="errors.name">{{ errors.name }}</span>
          </label>

          <label>
            Телефон
            <input v-model="form.phone" type="text">
            <span class="error" v-if="errors.phone">{{ errors.phone }}</span>
          </label>

          <label>
            Email
            <input v-model="form.email" type="text">
            <span class="error" v-if="errors.email">{{ errors.email }}</span>
          </label>

          <label>
            Форма
            <select v-model="form.shape">
              <option value="Круглый">Круглый</option>
              <option value="Квадратный">Квадратный</option>
              <option value="Сердце">Сердце</option>
            </select>
          </label>

          <label>
            Вкус
            <select v-model="form.taste">
              <option value="Ванильный">Ванильный</option>
              <option value="Шоколадный">Шоколадный</option>
              <option value="Красный бархат">Красный бархат</option>
            </select>
          </label>

          <label>
            Вес, кг
            <input v-model="form.weight" type="number" min="1" max="10">
            <span class="error" v-if="errors.weight">{{ errors.weight }}</span>
          </label>

          <label>
            Начинка
            <select v-model="form.filling">
              <option value="Клубника">Клубника</option>
              <option value="Малина">Малина</option>
              <option value="Карамель">Карамель</option>
              <option value="Шоколад">Шоколад</option>
            </select>
          </label>

          <label>
            Декор
            <select v-model="form.decor">
              <option value="Минимализм">Минимализм</option>
              <option value="Ягоды">Ягоды</option>
              <option value="Надпись">Надпись</option>
              <option value="Премиум декор">Премиум декор</option>
            </select>
          </label>

          <label>
            Дата получения
            <input v-model="form.date" type="date" :min="today">
            <span class="error" v-if="errors.date">{{ errors.date }}</span>
          </label>

          <label>
            Картинка-референс
            <input type="file" @change="readReference">
          </label>

          <label>
            Комментарий
            <textarea v-model="form.comment"></textarea>
          </label>

          <button type="submit">Отправить заявку</button>
        </form>
      </div>

      <aside class="preview">
        <h2>Предпросмотр заказа</h2>
        <p><b>Форма:</b> {{ form.shape }}</p>
        <p><b>Вкус:</b> {{ form.taste }}</p>
        <p><b>Вес:</b> {{ form.weight }} кг</p>
        <p><b>Начинка:</b> {{ form.filling }}</p>
        <p><b>Декор:</b> {{ form.decor }}</p>
        <p><b>Дата:</b> {{ form.date || 'не выбрана' }}</p>
        <p><b>Референс:</b> {{ form.referenceName || 'не загружен' }}</p>

        <div class="price-box">
          <span>Итоговая стоимость</span>
          <strong>{{ totalPrice }} ₽</strong>
        </div>
      </aside>
    </div>

    <ModalWindow
      v-if="success"
      title="Заявка отправлена"
      text="Заказ сохранён в истории. Мы свяжемся с вами для уточнения деталей."
      @close="closeModal"
    />
  </main>
</template>
