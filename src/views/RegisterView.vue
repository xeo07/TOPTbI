<script setup>
import { reactive, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useUsers } from '../composables/useUsers'

const router = useRouter()
const route = useRoute()
const usersStore = useUsers()

const form = reactive({
  login: '',
  password: '',
  email: '',
  phone: '',
  city: '',
  address: ''
})

const errors = reactive({
  login: '',
  password: '',
  email: '',
  phone: '',
  city: '',
  address: '',
  common: ''
})

const successText = ref('')

const loginReg = /^[A-Za-z0-9_]{3,}$/
const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneReg = /^$|^\+?[0-9]{11,12}$/

function validate() {
  errors.login = loginReg.test(form.login) ? '' : 'Логин должен содержать минимум 3 символа без пробелов.'
  errors.password = form.password.length >= 6 ? '' : 'Пароль должен содержать минимум 6 символов.'
  errors.email = emailReg.test(form.email) ? '' : 'Введите корректную электронную почту.'
  errors.phone = phoneReg.test(form.phone) ? '' : 'Телефон должен содержать 11–12 цифр.'
  errors.city = ''
  errors.address = ''

  return !errors.login && !errors.password && !errors.email && !errors.phone
}

function submitRegister() {
  errors.common = ''
  successText.value = ''

  if (!validate()) {
    return
  }

  const result = usersStore.registerUser({ ...form })

  if (!result.success) {
    errors.common = result.message
    return
  }

  successText.value = result.message

  form.login = ''
  form.password = ''
  form.email = ''
  form.phone = ''
  form.city = ''
  form.address = ''

  const redirectPath = typeof route.query.redirect === 'string' ? route.query.redirect : '/profile'

  router.push({ name: 'login', query: { redirect: redirectPath } })
}
</script>

<template>
  <main class="section">
    <div class="container">
      <section class="auth-box wide">
        <p class="eyebrow">Регистрация</p>
        <h1>Создание аккаунта</h1>
        <p class="section-text">Аккаунт нужен для оформления заказа, сохранения истории и доступа к личному кабинету.</p>

        <form class="form two-form" @submit.prevent="submitRegister" novalidate>
          <label>
            Логин
            <input v-model="form.login" type="text" @input="errors.login = ''; errors.common = ''">
            <span class="error" v-if="errors.login">{{ errors.login }}</span>
          </label>

          <label>
            Пароль
            <input v-model="form.password" type="password" @input="errors.password = ''">
            <span class="error" v-if="errors.password">{{ errors.password }}</span>
          </label>

          <label>
            Email
            <input v-model="form.email" type="text" @input="errors.email = ''; errors.common = ''">
            <span class="error" v-if="errors.email">{{ errors.email }}</span>
          </label>

          <label>
            Телефон
            <input v-model="form.phone" type="text" @input="errors.phone = ''">
            <span class="error" v-if="errors.phone">{{ errors.phone }}</span>
          </label>

          <label>
            Город
            <input v-model="form.city" type="text">
          </label>

          <label>
            Адрес доставки
            <input v-model="form.address" type="text">
          </label>

          <span class="error" v-if="errors.common">{{ errors.common }}</span>
          <span class="success-text" v-if="successText">{{ successText }}</span>

          <div>
            <button type="submit">Зарегистрироваться</button>
          </div>
        </form>

        <p class="auth-note">
          Уже есть аккаунт?
          <RouterLink :to="{ name: 'login' }">Войти</RouterLink>
        </p>
      </section>
    </div>
  </main>
</template>
