<template>
  <div class="sales-block">
    <p class="sales-block__line1">{{ line1 }}</p>
    <p class="sales-block__line2">{{ line2 }}</p>
  </div>
</template>

<script setup>
defineProps({
  line1: {
    type: String,
    required: true,
    default: 'УВЕЛИЧИМ'
  },
  line2: {
    type: String,
    required: true,
    default: 'ПРОДАЖИ С САЙТА'
  }
})
</script>

<style scoped>
.sales-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.sales-block__line1 {
  font-family: 'Open Sans', sans-serif;
  font-size: 40px;
  font-weight: 700;
  color: white;
  margin: 0;
  line-height: 1.2;
}

.sales-block__line2 {
  font-family: 'Open Sans', sans-serif;
  font-size: 24px;
  font-weight: 400;
  color: white;
  margin: 0;
  line-height: 1.2;
}

/* ===== Адаптив ===== */

/* Планшеты */
@media (max-width: 768px) {
  .sales-block__line1 {
    font-size: 32px;
  }

  .sales-block__line2 {
    font-size: 20px;
  }
}

/* Телефоны */
@media (max-width: 576px) {
  .sales-block__line1 {
    font-size: 20px;
  }

  .sales-block__line2 {
    font-size: 12px;
  }
}

/* Маленькие телефоны */
@media (max-width: 400px) {
  .sales-block__line1 {
    font-size: 18px;
  }

  .sales-block__line2 {
    font-size: 10px;
  }
}
</style>