<template>
  <div class="case">
    <!-- Заголовок -->
    <h2 class="case__title">{{ title }}</h2>

    <!-- Текст -->
    <p class="case__text">{{ text }}</p>

    <!-- Блок с фоткой и кнопкой -->
    <div class="case__block">
      <!-- Фотка -->
      <div class="case__image-wrapper">
        <img :src="image" alt="Проект" class="case__image" />
      </div>

      <!-- Кнопка "Смотреть" -->
      <a :href="link" target="_blank" class="case__button">Смотреть</a>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true,
    default: '#'
  }
})
</script>

<style scoped>
.case {
  width: 600px;
  padding: 10px 20px;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 0%, rgba(82, 82, 82, 0.3) 50%, rgba(0, 0, 0, 0.75) 100%);
  border: 1.5px solid #631315;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* Заголовок */
.case__title {
  font-family: 'Open Sans', sans-serif;
  font-size: 24px;
  text-align: center;
  background: linear-gradient(to right, #FFFFFF 0%, #FFFFFF 35%, #C6272B 60%, #C6272B 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
}

/* Текст */
.case__text {
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  color: white;
  line-height: 1.6;
  margin: 0;
  text-align: justify;
}

/* Блок с фоткой и кнопкой */
.case__block {
  display: flex;
  align-items: center;
}

/* Фотка */
.case__image-wrapper {
  flex: 1;
  min-width: 0;
}

.case__image {
  width: 369px;
  height: 202px;
  border-radius: 20px;
  display: block;
}

/* Кнопка */
.case__button {
  flex-shrink: 0;
  width: 143px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  color: white;
  text-decoration: none;
  border-radius: 15px;
  background: linear-gradient(to right, rgba(112, 0, 3, 0.5) 0%, rgba(186, 3, 7, 0.5) 100%);
  transition: all 0.3s ease;
}

.case__button:hover {
  transform: scale(1.05);
  opacity: 0.9;
}

/* ===== Адаптив ===== */

/* Планшеты */
@media (max-width: 768px) {
  .case {
    width: 100%;
    padding: 15px;
    gap: 12px;
  }

  .case__title {
    font-size: 20px;
  }

  .case__text {
    font-size: 14px;
  }

  .case__block {
    flex-direction: column;
    align-items: stretch;
    gap: 15px;
  }

  .case__image-wrapper {
    width: 100%;
  }

  .case__image {
    width: 100%;
    height: auto;
    max-height: 220px;
    object-fit: cover;
  }

  .case__button {
    width: 100%;
    max-width: 200px;
    align-self: center;
    height: 44px;
    font-size: 15px;
  }
}

/* Телефоны */
@media (max-width: 576px) {
  .case {
    padding: 12px;
    gap: 10px;
  }

  .case__title {
    font-size: 18px;
  }

  .case__text {
    font-size: 13px;
  }

  .case__block {
    gap: 12px;
  }

  .case__image {
    max-height: 180px;
    border-radius: 15px;
  }

  .case__button {
    height: 40px;
    font-size: 14px;
    max-width: 160px;
  }
}

/* Маленькие телефоны */
@media (max-width: 400px) {
  .case {
    padding: 10px;
    gap: 8px;
  }

  .case__title {
    font-size: 16px;
  }

  .case__text {
    font-size: 12px;
  }

  .case__image {
    max-height: 150px;
    border-radius: 12px;
  }

  .case__button {
    height: 25px;
    font-size: 13px;
    max-width: 110px;
  }
}

</style>