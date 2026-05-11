<script setup>
import { RouterLink } from 'vue-router'
import { getPublicAssetUrl } from '../composables/usePublicAsset'

const heroImage = getPublicAssetUrl('images/4.png')
</script>

<template>
  <main>
    <section class="hero">
      <div class="container hero-inner">
        <div class="hero-content">
          <p class="eyebrow">Торты на заказ</p>
          <h1>Авторские торты на заказ для ваших праздников</h1>

<p>
  Подберите готовый вариант из каталога или соберите индивидуальный торт:
  выберите начинку, вес, оформление и сразу узнайте примерную стоимость.
</p>

          <div class="hero-actions">
            <RouterLink class="button" :to="{ name: 'catalog' }">Каталог примеров</RouterLink>
            <RouterLink class="button secondary" :to="{ name: 'constructor' }">Открыть конструктор</RouterLink>
          </div>
        </div>

        <div class="hero-card">
          <img :src="heroImage" alt="Торт">
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container advantages">
        <article>
          <h3>Аккаунт</h3>
          <p>После входа пользователь может отправлять заявки и смотреть свою историю заказов.</p>
        </article>
        <article>
          <h3>Конструктор</h3>
          <p>Выбор параметров с мгновенным пересчётом итоговой цены.</p>
        </article>
        <article>
          <h3>Админ-раздел</h3>
          <p>Администратор управляет примерами тортов и списком пользователей.</p>
        </article>
      </div>
    </section>
  </main>
</template>
