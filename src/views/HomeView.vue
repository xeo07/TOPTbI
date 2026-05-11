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
            <RouterLink class="button" :to="{ name: 'catalog' }">Каталог тортов</RouterLink>
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
  <h3>Свежие ингредиенты</h3>
  <p>Готовим торты под заказ с учетом пожеланий по вкусу, весу и оформлению.</p>
</article>

<article>
  <h3>Удобный конструктор</h3>
  <p>Можно быстро рассчитать стоимость индивидуального торта прямо на сайте.</p>
</article>

<article>
  <h3>Личный кабинет</h3>
  <p>Сохраняйте понравившиеся варианты и отслеживайте историю заказов.</p>
</article>
      </div>
    </section>
  </main>
</template>
