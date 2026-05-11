<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <footer class="site-footer">
    <div class="container footer-grid">
      <div>
        <h3>ПРОЕКТ: ТÓРТЫ</h3>
        <p>
  Авторские торты на заказ для дней рождения, свадеб и семейных праздников.
  Выберите готовый вариант или соберите индивидуальный торт.
</p>
      </div>

      <div>
        <h4>Разделы</h4>
        <RouterLink :to="{ name: 'catalog' }">Каталог</RouterLink><br>
        <RouterLink :to="{ name: 'constructor' }">Конструктор</RouterLink><br>
        <RouterLink :to="{ name: 'profile' }">Личный кабинет</RouterLink>
      </div>

      <div>
        <h4>Контакты</h4>
        <p>+7 (900) 000-00-00</p>
        <p>cakes@example.ru</p>
      </div>
    </div>
  </footer>
</template>
