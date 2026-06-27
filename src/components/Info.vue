<template>
  <div class="service-card">
    <h2 class="service-card__title">{{ title }}</h2>

    <ul class="service-card__list">
      <li v-for="item in items" :key="item">
        <a href="#" class="service-card__link">{{ item }}</a>
      </li>
    </ul>

    <Button :text="buttonText" width="143px" height="40px" :link="link" />
  </div>
</template>

<script setup>
import Button from '@/components/Button.vue'

const props = defineProps({
  title: {
    type: String,
    default: 'ЗАГОЛОВОК'
  },
  items: {
    type: Array,
    default: () => []
  },
  buttonText: {
    type: String,
    default: 'Подробнее'
  },
  link: {
    type: String,
    default: '/'
  }
})
</script>

<style scoped>
.service-card {
  width: 522px;
  height: 403.5px;
  border-radius: 20px;
  border: 1.5px solid #631315;
  background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(82, 82, 82, 0.3) 50%,
      rgba(0, 0, 0, 0.75) 100%
  );
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  text-align: center;
  padding: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.service-card__title {
  font-family: 'BOWLER', 'Inter', serif;
  font-size: 40px;
  color: white;
  font-weight: normal;
}

.service-card__list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 50px;
}

.service-card__link {
  display: inline-block;
  color: white;
  font-size: 16px;
  text-decoration: none;
  transition: color 0.3s ease;
}

.service-card__link:hover {
  color: #ff6b4a;
}

/* ===== Адаптив ===== */

/* Планшеты */
@media (max-width: 768px) {
  .service-card {
    width: 100%;
    max-width: 450px;
    height: auto;
    min-height: 350px;
    padding: 18px;
    gap: 10px;
  }

  .service-card__title {
    font-size: 32px;
  }

  .service-card__list {
    gap: 10px;
    margin-bottom: 30px;
  }

  .service-card__link {
    font-size: 15px;
  }
}

/* Телефоны */
@media (max-width: 576px) {
  .service-card {
    width: 100%;
    max-width: 100%;
    min-height: 300px;
    padding: 15px;
    gap: 8px;
  }

  .service-card__title {
    font-size: 26px;
  }

  .service-card__list {
    gap: 8px;
    margin-bottom: 20px;
  }

  .service-card__link {
    font-size: 14px;
  }
}

/* Маленькие телефоны */
@media (max-width: 400px) {
  .service-card {
    min-height: 260px;
    padding: 12px;
    gap: 6px;
  }

  .service-card__title {
    font-size: 22px;
  }

  .service-card__list {
    gap: 6px;
    margin-bottom: 15px;
  }

  .service-card__link {
    font-size: 13px;
  }
}
</style>