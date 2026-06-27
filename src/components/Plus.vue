<template>
  <div class="plus" :style="{ width: width }">
    <span class="plus__sign">{{ symbol }}</span>
    <span class="plus__text">{{ text }}</span>
  </div>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    required: true,
    default: ''
  },
  symbol: {
    type: String,
    required: true,
    default: ''
  },
  width: {
    type: String,
    default: '490px'
  },
})
</script>

<style scoped>
.plus {
  display: flex;
  align-items: center;
  gap: 5px;
}

.plus__sign {
  font-family: 'Open Sans', sans-serif;
  font-size: 32px;
  font-weight: 900;
  color: white;
  line-height: 1;
}

.plus__text {
  font-family: 'Open Sans', sans-serif;
  font-size: 20px;
  font-weight: 400;
  color: white;
}

/* ===== Адаптив ===== */

/* Планшеты */
@media (max-width: 768px) {
  .plus {
    width: 100% !important;
    max-width: 380px;
    gap: 6px;
  }

  .plus__sign {
    font-size: 28px;
  }

  .plus__text {
    font-size: 18px;
  }
}

/* Телефоны */
@media (max-width: 576px) {
  .plus {
    max-width: 100%;
    gap: 5px;
  }

  .plus__sign {
    font-size: 24px;
  }

  .plus__text {
    font-size: 16px;
  }
}

/* Маленькие телефоны */
@media (max-width: 400px) {
  .plus {
    gap: 4px;
  }

  .plus__sign {
    font-size: 20px;
  }

  .plus__text {
    font-size: 14px;
  }
}
</style>