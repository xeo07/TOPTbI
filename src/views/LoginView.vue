<script setup>
import { reactive, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useUsers } from '../composables/useUsers'

const router = useRouter()
const route = useRoute()
const usersStore = useUsers()

const form = reactive({
  login: '',
  password: ''
})

const errors = reactive({
  login: '',
  password: '',
  common: ''
})

const successText = ref('')

function validate() {
  errors.login = form.login.trim() ? '' : 'Введите логин.'
  errors.password = form.password.trim() ? '' : 'Введите пароль.'

  return !errors.login && !errors.password
}

function submitLogin() {
  errors.common = ''
  successText.value = ''

  if (!validate()) {
    return
  }

  const result = usersStore.loginUser(form.login, form.password)

  if (!result.success) {
    errors.common = result.message
    return
  }

  successText.value = result.message

  const redirectPath = typeof route.query.redirect === 'string' ? route.query.redirect : '/profile'
  router.push(redirectPath)
}
</script>

<template>
  <main class="section">
    <div class="container auth-layout">
      <section class="auth-box">
        <p class="eyebrow">Вход</p>
        <h1>Авторизация</h1>
        <p class="section-text">Введите логин и пароль, чтобы оформить заказ и открыть личный кабинет.</p>

        <form class="form" @submit.prevent="submitLogin" novalidate>
          <label>
            Логин
            <input v-model="form.login" type="text" @input="errors.login = ''; errors.common = ''">
            <span class="error" v-if="errors.login">{{ errors.login }}</span>
          </label>

          <label>
            Пароль
            <input v-model="form.password" type="password" @input="errors.password = ''; errors.common = ''">
            <span class="error" v-if="errors.password">{{ errors.password }}</span>
          </label>

          <span class="error" v-if="errors.common">{{ errors.common }}</span>
          <span class="success-text" v-if="successText">{{ successText }}</span>

          <button type="submit">Войти</button>
        </form>

        <p class="auth-note">
          Нет аккаунта?
          <RouterLink :to="{ name: 'register' }">Зарегистрироваться</RouterLink>
        </p>
      </section>

      <aside class="login-help">
        <h2>Тестовые данные</h2>
        <p><b>Пользователь:</b> ivan / ivan123</p>
        <p><b>Админ:</b> admin / admin123</p>
      </aside>
    </div>
  </main>
</template>
