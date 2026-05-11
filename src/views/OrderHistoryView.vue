<script setup>
import { computed } from 'vue'
import { useOrders } from '../composables/useOrders'
import { useUsers } from '../composables/useUsers'

const ordersStore = useOrders()
const usersStore = useUsers()
const statuses = [
  'Новая заявка',
  'В работе',
  'Готовится',
  'Готов к выдаче',
  'Завершён'
]

const userOrders = computed(() => {
  if (usersStore.isAdmin.value) {
    return ordersStore.orderList.value
  }

  return ordersStore.getOrdersByUserId(usersStore.currentUser.value.id)
})
</script>

<template>
  <main class="section">
    <div class="container">
      <div class="page-heading">
        <p class="eyebrow">История</p>
        <h1>История заказов</h1>
        <p>Здесь отображаются отправленные заявки.</p>
      </div>

      <div v-if="userOrders.length > 0" class="history-list">
        <article
          v-for="order in userOrders"
          :key="order.id"
          class="history-card"
        >
          <div>
            <h3>Заказ №{{ order.id }}</h3>
            <p>{{ order.shape }} · {{ order.taste }} · {{ order.weight }} кг</p>
            <p>Начинка: {{ order.filling }} · Декор: {{ order.decor }}</p>
            <p>Дата получения: {{ order.date }}</p>
            <p>Клиент: {{ order.name }}, {{ order.phone }}</p>
            <p v-if="usersStore.isAdmin.value">Пользователь: {{ order.userLogin }}</p>
            <p v-if="order.referenceName">Референс: {{ order.referenceName }}</p>
          </div>

          <div>
            <strong>{{ order.price }} ₽</strong>
            <p v-if="!usersStore.isAdmin.value" class="order-status">
  {{ order.status }}
</p>

<select
  v-else
  class="status-select"
  :value="order.status"
  @change="ordersStore.updateOrderStatus(order.id, $event.target.value)"
>
  <option
    v-for="status in statuses"
    :key="status"
    :value="status"
  >
    {{ status }}
  </option>
</select>
            <button class="danger" @click="ordersStore.deleteOrder(order.id)">Удалить</button>
          </div>
        </article>
      </div>

      <div v-else class="empty">
        <h2>История пуста</h2>
        <p>Оформите заявку через конструктор, и она появится здесь.</p>
      </div>
    </div>
  </main>
</template>
