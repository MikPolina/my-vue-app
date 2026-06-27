<template>
  <div class="gradient-block">
    <p class="gradient-block__text">{{ text }}</p>
  </div>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    required: true,
    default: 'ЗВОНКИ И ЗАЯВКИ ОТ КЛИЕНТОВ'
  }
})
</script>

<style scoped>
.gradient-block {
  width: 316px;
  height: 85px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 10px 20px;
  border: 1px solid white;
  border-radius: 20px;
  background: linear-gradient(
      to right,
      rgba(99, 19, 21, 1) 0%,
      rgba(115, 33, 35, 0.5) 50%,
      rgba(0, 0, 0, 0) 100%
  );
  box-sizing: border-box;
}

.gradient-block__text {
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: white;
  margin: 0;
  line-height: 1.4;
}

/* ===== Адаптив ===== */

/* Планшеты */
@media (max-width: 768px) {
  .gradient-block {
    width: 100%;
    max-width: 316px;
    height: auto;
    min-height: 75px;
    padding: 12px 18px;
  }

  .gradient-block__text {
    font-size: 15px;
  }
}

/* Телефоны */
@media (max-width: 576px) {
  .gradient-block {
    width: 100%;
    max-width: 100%;
    height: auto;
    min-height: 65px;
    padding: 10px 15px;
  }

  .gradient-block__text {
    font-size: 14px;
  }
}

/* Маленькие телефоны */
@media (max-width: 400px) {
  .gradient-block {
    width: 140px;
    height: 55px;
    padding: 3px 3px;
  }

  .gradient-block__text {
    font-size: 9px;
  }
}
</style>