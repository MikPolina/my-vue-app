<template>
  <div class="round">
    <!-- Верхний блок: картинка -->
    <div class="round__image-wrapper">
      <img :src="image" alt="Иконка" class="round__image" />
    </div>

    <!-- Нижний блок: список -->
    <div class="round__text-wrapper">
      <ul class="round__list">
        <li v-for="item in items" :key="item" class="round__item">
          <span class="round__bullet"></span>
          <span class="round__item-text">{{ item }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
defineProps({
  image: {
    type: String,
    required: true
  },
  items: {
    type: Array,
    required: true,
    default: () => []
  }
})
</script>

<style scoped>
.round {
  width: 374px;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 0;
  border-radius: 20px;
  overflow: hidden;
  background: transparent;
}

/* Верхний блок — картинка */
.round__image-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  flex-shrink: 0;
}

.round__image {
  width: 135px;
  height: 133px;
  object-fit: contain;
  display: block;
  margin-bottom: 3px;
}

/* Нижний блок — текст */
.round__text-wrapper {
  padding: 10px 10px 0 10px;
  border-top: solid 2px #C6272B;
  transition: background 2s ease;
  background: transparent;
}

/* При наведении — градиентная заливка сверху вниз */
.round:hover .round__text-wrapper {
  background: linear-gradient(to bottom, rgba(99, 19, 21, 1) 0%, rgba(0, 0, 0, 1) 100%);
}

.round__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.round__item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  color: white;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  text-align: justify;
}

.round__bullet {
  flex-shrink: 0;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #ffffff;
  margin-top: 10px;
}

.round__item-text {
  flex: 1;
}

/* ===== Адаптив ===== */

/* Планшеты */
@media (max-width: 768px) {
  .round {
    width: 100%;
    max-width: 400px;
  }

  .round__image {
    width: 110px;
    height: 108px;
  }

  .round__text-wrapper {
    padding: 8px 8px 0 8px;
  }

  .round__item {
    font-size: 15px;
    gap: 8px;
  }

  .round__bullet {
    width: 5px;
    height: 5px;
    margin-top: 8px;
  }
}

/* Телефоны */
@media (max-width: 576px) {
  .round {
    width: 100%;
    max-width: 100%;
  }

  .round__image {
    width: 90px;
    height: 88px;
  }

  .round__text-wrapper {
    padding: 6px 6px 0 6px;
  }

  .round__item {
    font-size: 14px;
    gap: 8px;
  }

  .round__bullet {
    width: 4px;
    height: 4px;
    margin-top: 7px;
  }
}

/* Маленькие телефоны */
@media (max-width: 400px) {
  .round__image {
    width: 70px;
    height: 68px;
    padding-bottom: 3px;
    border-bottom: solid 2px #C6272B;
  }

  .round__item {
    font-size: 13px;
    gap: 6px;
  }

  .round__bullet {
    width: 4px;
    height: 4px;
    margin-top: 6px;
  }

  .round__text-wrapper{
    border: none;
  }

}
</style>