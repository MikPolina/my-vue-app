<template>
  <div class="person">
    <!-- Фото слева -->
    <div class="person__image-wrapper">
      <img :src="image" alt="Фото" class="person__image" />
    </div>

    <!-- Правый блок -->
    <div class="person__right">
      <!-- Имя и телефон -->
      <div class="person__contact">
        <h3 class="person__name">{{ name }}</h3>
        <a :href="`tel:${phone.replace(/\s/g, '')}`" class="person__phone">{{ phone }}</a>
      </div>

      <!-- Email и Telegram -->
      <div class="person__social">
        <a :href="`mailto:${email}`" class="person__email">
          <span class="person__at">@</span>{{ email }}
        </a>
        <a :href="telegramLink" target="_blank" class="person__telegram">
          <svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.4576 0.18176L0.624451 6.70657C-0.0529367 7.01041 -0.282053 7.61892 0.460697 7.94915L4.77915 9.3286L15.2205 2.84227C15.7906 2.43506 16.3743 2.54365 15.8721 2.99158L6.90432 11.1532L6.62261 14.6072C6.88354 15.1405 7.36129 15.143 7.66602 14.878L10.1471 12.5182L14.3963 15.7165C15.3832 16.3038 15.9202 15.9248 16.1325 14.8484L18.9197 1.58293C19.209 0.257909 18.7155 -0.325894 17.4576 0.18176Z" fill="white"/>
          </svg>
          <span class="person__telegram-text">Телеграм</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  image: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  telegramLink: {
    type: String,
    default: null
  }
})
</script>

<style scoped>
.person {
  width: 567px;
  height: 211px;
  padding: 2px 20px 2px 2px;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 0%, rgba(82, 82, 82, 0.3) 50%, rgba(0, 0, 0, 0.75) 100%);
  border: 1.5px solid #631315;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-sizing: border-box;
}

/* Фото */
.person__image-wrapper {
  flex-shrink: 0;
  width: 170px;
  height: 100%;
  min-height: 170px;
  border-radius: 20px 0px 0px 20px;
  overflow: hidden;
}

.person__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Правый блок */
.person__right {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  min-height: 170px;
}

/* Имя и телефон */
.person__contact {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0;
}

.person__name {
  font-family: 'Bowler', 'Bowlby One', serif;
  font-size: 24px;
  font-weight: 400;
  background: linear-gradient(to right, #FFFFFF 0%, #FFFFFF 35%, #C6272B 60%, #C6272B 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  line-height: 1.3;
}

.person__phone {
  font-family: 'Open Sans', sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: white;
  text-decoration: none;
  transition: color 0.3s ease;
}

.person__phone:hover {
  color: #C64027;
}

/* Соцсети */
.person__social {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.person__email {
  font-family: 'Open Sans', sans-serif;
  font-size: 20px;
  font-weight: 400;
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 2px;
  transition: color 0.3s ease;
}

.person__email:hover {
  color: #C64027;
}

.person__at {
  color: white;
}

.person__telegram {
  font-family: 'Open Sans', sans-serif;
  font-size: 20px;
  font-weight: 400;
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: color 0.3s ease;
}

.person__telegram:hover {
  color: #C64027;
}

.person__telegram:hover svg path {
  fill: #C64027;
}

.person__telegram svg {
  flex-shrink: 0;
  transition: fill 0.3s ease;
}

.person__telegram-text {
  white-space: nowrap;
}

/* ===== Адаптив ===== */

/* Планшеты */
@media (max-width: 768px) {
  .person {
    width: 100%;
    max-width: 500px;
    height: auto;
    min-height: 200px;
    padding: 15px;
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }

  .person__image-wrapper {
    width: 140px;
    height: 140px;
    min-height: 140px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .person__image {
    border-radius: 50%;
  }

  .person__right {
    min-height: auto;
    gap: 12px;
    align-items: center;
  }

  .person__contact {
    align-items: center;
  }

  .person__name {
    font-size: 22px;
    text-align: center;
  }

  .person__phone {
    font-size: 20px;
  }

  .person__social {
    gap: 15px;
  }

  .person__email {
    font-size: 16px;
  }

  .person__telegram {
    font-size: 16px;
  }
}

/* Телефоны */
@media (max-width: 576px) {
  .person {
    width: 100%;
    max-width: 100%;
    padding: 12px;
    gap: 12px;
  }

  .person__image-wrapper {
    width: 110px;
    height: 110px;
    min-height: 110px;
  }

  .person__right {
    gap: 10px;
  }

  .person__name {
    font-size: 18px;
  }

  .person__phone {
    font-size: 18px;
  }

  .person__social {
    gap: 12px;
    flex-direction: column;
    align-items: center;
  }

  .person__email {
    font-size: 15px;
  }

  .person__telegram {
    font-size: 15px;
  }
}

/* Маленькие телефоны */
@media (max-width: 400px) {
  .person {
    padding: 10px;
    gap: 10px;
  }

  .person__image-wrapper {
    width: 90px;
    height: 90px;
    min-height: 90px;
  }

  .person__name {
    font-size: 16px;
  }

  .person__phone {
    font-size: 16px;
  }

  .person__email {
    font-size: 13px;
  }

  .person__telegram {
    font-size: 13px;
  }

  .person__social {
    gap: 8px;
  }
}
</style>