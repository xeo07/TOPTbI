<script setup>
import { reactive, ref } from 'vue'
import { useUsers } from '../composables/useUsers'

const usersStore = useUsers()

const form = reactive({
  login: usersStore.currentUser.value ? usersStore.currentUser.value.login : '',
  password: usersStore.currentUser.value ? usersStore.currentUser.value.password : '',
  email: usersStore.currentUser.value ? usersStore.currentUser.value.email : '',
  phone: usersStore.currentUser.value ? usersStore.currentUser.value.phone : '',
  city: usersStore.currentUser.value ? usersStore.currentUser.value.city : '',
  address: usersStore.currentUser.value ? usersStore.currentUser.value.address : ''
})

const errors = reactive({
  login: '',
  password: '',
  email: '',
  phone: ''
})

const message = ref('')

const loginReg = /^[A-Za-z0-9_]{3,}$/
const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneReg = /^$|^\+?[0-9]{11,12}$/

function validate() {
  errors.login = loginReg.test(form.login) ? '' : 'Логин должен содержать минимум 3 символа без пробелов.'
  errors.password = form.password.length >= 6 ? '' : 'Пароль должен содержать минимум 6 символов.'
  errors.email = emailReg.test(form.email) ? '' : 'Введите корректную электронную почту.'
  errors.phone = phoneReg.test(form.phone) ? '' : 'Телефон должен содержать 11–12 цифр.'

  return !errors.login && !errors.password && !errors.email && !errors.phone
}

function saveProfile() {
  message.value = ''

  if (!validate()) {
    return
  }

  const result = usersStore.updateCurrentUser(form)

  if (result) {
    message.value = 'Данные профиля сохранены.'
  }
}
</script>

<template>
  <main class="section">
    <div class="container">
      <div class="page-heading">
        <p class="eyebrow">Личный кабинет</p>
        <h1>Профиль пользователя</h1>
        <p>Здесь пользователь видит и редактирует данные, которые использовались при регистрации.</p>
      </div>

      <section v-if="usersStore.currentUser.value" class="profile-grid">
        <div class="info-box">
          <h2>Данные аккаунта</h2>
          <p><b>Логин:</b> {{ usersStore.currentUser.value.login }}</p>
          <p><b>Email:</b> {{ usersStore.currentUser.value.email }}</p>
          <p><b>Телефон:</b> {{ usersStore.currentUser.value.phone || 'не указан' }}</p>
          <p><b>Город:</b> {{ usersStore.currentUser.value.city || 'не указан' }}</p>
          <p><b>Адрес:</b> {{ usersStore.currentUser.value.address || 'не указан' }}</p>
          <p><b>Роль:</b> {{ usersStore.currentUser.value.role }}</p>
        </div>

        <form class="form" @submit.prevent="saveProfile" novalidate>
          <label>
            Логин
            <input v-model="form.login" type="text">
            <span class="error" v-if="errors.login">{{ errors.login }}</span>
          </label>

          <label>
            Пароль
            <input v-model="form.password" type="password">
            <span class="error" v-if="errors.password">{{ errors.password }}</span>
          </label>

          <label>
            Email
            <input v-model="form.email" type="text">
            <span class="error" v-if="errors.email">{{ errors.email }}</span>
          </label>

          <label>
            Телефон
            <input v-model="form.phone" type="text">
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

          <span class="success-text" v-if="message">{{ message }}</span>

          <button type="submit">Сохранить профиль</button>
        </form>
      </section>
    </div>
  </main>
</template>
