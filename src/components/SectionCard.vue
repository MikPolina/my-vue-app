<template>
  <div class="section-card" :style="{ backgroundImage: `url(${image})` }">
    <div class="section-card__overlay">
      <div class="section-card__content">
        <h2 class="section-card__title">{{ title }}</h2>
        <p class="section-card__text">{{ text }}</p>
      </div>
      <router-link :to="link" class="section-card__arrow">
        <svg width="35" height="58" viewBox="0 0 35 58" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.5 3.5L29.5 29.6892L3.5 54.5" stroke="white" stroke-width="7" stroke-linecap="round"/>
        </svg>
      </router-link>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
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
    default: '/'
  }
})
</script>

<style scoped>
.section-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 581px;
  height: 281px;
  border-radius: 20px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
  margin: 0 auto;
  padding: 30px 30px;
}

.section-card__content {
  flex: 1;
}

.section-card__title {
  font-family: 'BOWLER', 'Inter', serif;
  font-size: 36px;
  color: white;
  margin-bottom: 15px;
  font-weight: normal;
}

.section-card__overlay {
  display: flex;
  align-items: center;
  justify-content: space-between;
}


.section-card__text {
  font-size: 20px;
  color: white;
  line-height: 1.5;
  margin: 0;
}

.section-card__arrow {
  flex-shrink: 0;
  margin-left: 30px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.section-card__arrow:hover {
  transform: translateX(10px);
}

.section-card__arrow svg {
  display: block;
}

/* ===== Адаптив ===== */

/* Планшеты */
@media (max-width: 768px) {
  .section-card {
    width: 100%;
    max-width: 500px;
    height: auto;
    min-height: 220px;
    padding: 25px 20px;
  }

  .section-card__overlay {
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 15px;
    width: 100%;
  }

  .section-card__content {
    width: 100%;
  }

  .section-card__title {
    font-size: 28px;
    margin-bottom: 10px;
  }

  .section-card__text {
    font-size: 17px;
  }

  .section-card__arrow {
    align-self: flex-end;
    margin-left: 0;
  }

  .section-card__arrow svg {
    width: 28px;
    height: 46px;
  }
}

/* Телефоны */
@media (max-width: 576px) {
  .section-card {
    width: 100%;
    max-width: 100%;
    min-height: 180px;
    padding: 18px 15px;
  }

  .section-card__overlay {
    gap: 12px;
  }

  .section-card__title {
    font-size: 22px;
    margin-bottom: 8px;
  }

  .section-card__text {
    font-size: 14px;
  }

  .section-card__arrow svg {
    width: 22px;
    height: 36px;
  }
}

/* Маленькие телефоны */
@media (max-width: 400px) {
  .section-card {
    min-height: 150px;
    padding: 14px 12px;
  }

  .section-card__overlay {
    gap: 10px;
  }

  .section-card__title {
    font-size: 18px;
    margin-bottom: 6px;
  }

  .section-card__text {
    font-size: 12px;
  }

  .section-card__arrow svg {
    width: 18px;
    height: 30px;
  }
}
</style>