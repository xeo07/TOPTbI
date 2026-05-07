<script setup>
import { useUsers } from '../composables/useUsers'

const usersStore = useUsers()
</script>

<template>
  <main class="section">
    <div class="container">
      <div class="page-heading">
        <p class="eyebrow">Администратор</p>
        <h1>Пользователи</h1>
        <p>Раздел доступен только администратору.</p>
      </div>

      <section class="admin-list">
        <article
          v-for="user in usersStore.users.value"
          :key="user.id"
          class="admin-row user-row"
        >
          <div>
            <h3>{{ user.login }}</h3>
            <p>{{ user.email }}</p>
            <p>{{ user.phone || 'телефон не указан' }}</p>
          </div>

          <div>
            <p><b>Город:</b> {{ user.city || 'не указан' }}</p>
            <p><b>Адрес:</b> {{ user.address || 'не указан' }}</p>
            <p><b>Роль:</b> {{ user.role }}</p>
          </div>

          <button
            class="danger"
            v-if="user.role !== 'admin'"
            @click="usersStore.deleteUser(user.id)"
          >
            Удалить
          </button>

          <span v-else class="admin-label">Администратор</span>
        </article>
      </section>
    </div>
  </main>
</template>
