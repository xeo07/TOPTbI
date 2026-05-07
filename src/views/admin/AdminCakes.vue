<script setup>
import { RouterLink } from 'vue-router'
import { useCakes } from '../../composables/useCakes'

const cakesStore = useCakes()
</script>

<template>
  <section class="admin-list">
    <article v-for="cake in cakesStore.cakeList.value" :key="cake.id" class="admin-row">
      <img :src="cake.image" :alt="cake.title">

      <div>
        <h3>{{ cake.title }}</h3>
        <p>{{ cake.category }} · {{ cake.weight }} кг · {{ cake.price }} ₽</p>
      </div>

      <div class="admin-actions">
        <RouterLink class="button" :to="{ name: 'adminEditCake', params: { id: cake.id } }">
          Редактировать
        </RouterLink>
        <button class="danger" @click="cakesStore.deleteCake(cake.id)">Удалить</button>
      </div>
    </article>
  </section>
</template>
