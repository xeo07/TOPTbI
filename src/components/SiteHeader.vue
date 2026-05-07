<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { useUsers } from '../composables/useUsers'

const router = useRouter()
const usersStore = useUsers()

function logout() {
  usersStore.logoutUser()
  router.push({ name: 'home' })
}
</script>

<template>
  <header class="site-header">
    <div class="container header-inner">
      <RouterLink :to="{ name: 'home' }" class="brand">
        <span class="brand-mark">Т</span>
        <span>Проект: ТОРТЫ</span>
      </RouterLink>

      <nav class="nav">
        <RouterLink :to="{ name: 'home' }">Главная</RouterLink>
        <RouterLink :to="{ name: 'catalog' }">Каталог</RouterLink>
        <RouterLink :to="{ name: 'constructor' }">Конструктор</RouterLink>
        <RouterLink v-if="usersStore.isAuth.value" :to="{ name: 'history' }">История</RouterLink>
        <RouterLink :to="{ name: 'favorites' }">Избранное</RouterLink>
        <RouterLink v-if="usersStore.isAdmin.value" :to="{ name: 'adminCakes' }">Админ</RouterLink>
        <RouterLink v-if="usersStore.isAdmin.value" :to="{ name: 'users' }">Пользователи</RouterLink>
      </nav>

      <div class="auth-actions">
        <div v-if="usersStore.isAuth.value" class="user-mini">
          <RouterLink :to="{ name: 'profile' }">
            {{ usersStore.currentUser.value.login }}
          </RouterLink>
          <button class="small-button secondary" @click="logout">Выйти</button>
        </div>

        <div v-else class="auth-links">
          <RouterLink class="small-button secondary" :to="{ name: 'login' }">Войти</RouterLink>
          <RouterLink class="small-button" :to="{ name: 'register' }">Регистрация</RouterLink>
        </div>
      </div>
    </div>
  </header>
</template>
